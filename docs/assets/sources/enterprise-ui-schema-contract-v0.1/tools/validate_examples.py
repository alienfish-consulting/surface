#!/usr/bin/env python3
"""Offline design-contract demonstrator, NOT production authorization or JSON Patch library."""
import copy, json, re
from pathlib import Path
from jsonschema import Draft202012Validator, ValidationError

ROOT = Path(__file__).resolve().parents[1]

def read(path):
    return json.loads((ROOT / path).read_text())

def assert_valid(schema, data, label):
    errors = list(Draft202012Validator(schema).iter_errors(data))
    if errors:
        raise ValueError(label + ': ' + '; '.join(e.message for e in errors[:3]))

def validate_document(document, registry):
    assert_valid(read('schemas/design-document.schema.json'), document, 'document shape')
    assert_valid(read('schemas/component-registry.schema.json'), registry, 'registry shape')
    if document['registryVersion'] != registry['registryVersion']:
        raise ValueError('incompatible registry version')
    if len({c['type'] for c in registry['components']}) != len(registry['components']):
        raise ValueError('duplicate registry type')
    components = {c['type']:c for c in registry['components']}
    seen=set()
    source_set=set(document['dataSources']); action_set=set(document['actionIds'])
    def visit(node, parent=None):
        component=components.get(node['type'])
        if component is None:
            raise ValueError('unknown component '+node['type'])
        if node['id'] in seen:
            raise ValueError('duplicate node ID '+node['id'])
        seen.add(node['id'])
        if parent and node['type'] not in parent['allowedChildren']:
            raise ValueError('invalid child for '+parent['type'])
        schema_ref=component['propsSchema']
        if not (ROOT/'schemas/components' in (ROOT/schema_ref).parents):
            raise ValueError('unsafe schema reference')
        assert_valid(read(schema_ref), node['props'], node['id']+' props')
        if node.get('children') and not component['allowedChildren']:
            raise ValueError('leaf component cannot accept children')
        for slot, binding in node.get('bindings',{}).items():
            if slot not in component['bindings']:
                raise ValueError('unsupported binding '+slot)
            if binding['sourceId'] not in source_set:
                raise ValueError('undeclared data source '+binding['sourceId'])
        for event, intent in node.get('intents',{}).items():
            if event not in component['events']:
                raise ValueError('unsupported event '+event)
            if intent['actionId'] not in action_set:
                raise ValueError('undeclared action '+intent['actionId'])
        for child in node.get('children',[]):
            visit(child,component)
    visit(document['root'])
    return len(seen)

def pointer_tokens(pointer):
    if pointer=='': return []
    if not pointer.startswith('/') or re.search(r'~(?![01])',pointer):
        raise ValueError('invalid JSON pointer')
    return [part.replace('~1','/').replace('~0','~') for part in pointer[1:].split('/')]

def location(doc, pointer):
    tokens=pointer_tokens(pointer)
    if not tokens:
        raise ValueError('root mutation forbidden')
    cur=doc
    for tok in tokens[:-1]:
        if isinstance(cur,list):
            if not tok.isdecimal() or (len(tok)>1 and tok[0]=='0'):
                raise ValueError('invalid list index')
            cur=cur[int(tok)]
        else: cur=cur[tok]
    return cur,tokens[-1]

def get_val(doc,pointer):
    cur=doc
    for tok in pointer_tokens(pointer):
        cur=cur[int(tok)] if isinstance(cur,list) else cur[tok]
    return cur

def demonstrate_patch(original, proposal, registry):
    assert_valid(read('schemas/patch-proposal.schema.json'),proposal,'proposal shape')
    if (original['id'] != proposal['documentId'] or
        original['schemaVersion'] != proposal['schemaVersion'] or
        original['registryVersion'] != proposal['registryVersion']):
        raise ValueError('proposal points at incorrect document/schema/registry')
    if original['revision'] != proposal['baseRevision']:
        raise ValueError('stale base revision')
    operations=proposal['operations']
    if operations[0] != {'op':'test','path':'/revision','value':proposal['baseRevision']}:
        raise ValueError('missing first revision test')
    new=copy.deepcopy(original)
    for op in operations:
        kind=op['op']; path=op['path']
        if kind in ('copy','move'):
            raise ValueError('operation not enabled in v0.1 demonstrator')
        if kind != 'test':
            # Scoped demonstration policy: only component properties can be changed.
            # Future editor nodes/slot mutations need separate authorization & diff checks.
            if not re.fullmatch(r'/root(?:/children/[0-9]+)*/props(?:/(?:[^~/]|~[01])*)+',path):
                raise ValueError('protected or unsupported mutation path')
        if kind == 'test':
            if get_val(new,path) != op['value']:
                raise ValueError('guard test failed')
            continue
        parent,key=location(new,path)
        if isinstance(parent,list):
            if not key.isdecimal() or (len(key)>1 and key[0]=='0'):
                raise ValueError('invalid array index')
            n=int(key)
            if kind=='add':parent.insert(n,op['value'])
            elif kind=='replace':parent[n]=op['value']
            elif kind=='remove':parent.pop(n)
        else:
            if kind=='add':parent[key]=op['value']
            elif kind=='replace':
                if key not in parent:raise KeyError(key)
                parent[key]=op['value']
            elif kind=='remove':del parent[key]
    validate_document(new,registry)
    # dry run leaves revision unchanged; host owns the later increment on approved persistence.
    return new

def negative_cases(doc,proposal,registry):
    failures=[]
    def expect_rejected(name, mutate, kind='doc'):
        candidate=copy.deepcopy(doc if kind=='doc' else proposal)
        mutate(candidate)
        try:
            (validate_document(candidate,registry) if kind=='doc' else demonstrate_patch(doc,candidate,registry))
        except (ValueError,KeyError,IndexError,TypeError,ValidationError) as e:
            failures.append((name,'REJECTED',str(e)[:180]))
            return
        raise AssertionError('ACCEPTED invalid specimen: '+name)
    grid=lambda x:x['root']['children'][0]['children'][1]
    expect_rejected('unknown component',lambda x:grid(x).update(type='ui.Unknown'))
    expect_rejected('duplicate stable IDs',lambda x:grid(x).update(id='customer-total'))
    expect_rejected('unsupported CSS injection prop',lambda x:grid(x)['props'].update(style={'background':'red'}))
    expect_rejected('invalid child containment',lambda x:x['root']['children'][0]['children'][0].update(children=[{'id':'bad','type':'ui.Panel','props':{'title':'Bad'}}]))
    expect_rejected('undeclared action',lambda x:grid(x)['intents']['onRowActivate'].update(actionId='admin.deleteAll'))
    expect_rejected('undeclared data source',lambda x:grid(x)['bindings']['rows'].update(sourceId='secretCustomers'))
    expect_rejected('unrecognized binding path syntax',lambda x:grid(x)['bindings']['rows'].update(pointer='not/a/pointer'))
    expect_rejected('unsupported registry version',lambda x:x.update(registryVersion='2.0.0'))
    expect_rejected('stale revision',lambda x:x.update(baseRevision=6),'proposal')
    expect_rejected('unauthorized global capability mutation',lambda x:x['operations'].append({'op':'replace','path':'/actionIds/0','value':'admin.deleteAll'}),'proposal')
    expect_rejected('unsupported JSON Patch move',lambda x:x['operations'].append({'op':'move','from':'/root/children/0','path':'/root/children/1'}),'proposal')
    expect_rejected('failed component identity guard',lambda x:x['operations'][1].update(value='another-grid'),'proposal')
    return failures

def main():
    ds=read('schemas/design-document.schema.json')
    ps=read('schemas/patch-proposal.schema.json')
    rs=read('schemas/component-registry.schema.json')
    for s in [ds,ps,rs]+[read(c['propsSchema']) for c in read('examples/component-registry.json')['components']]:
        Draft202012Validator.check_schema(s)
    reg=read('examples/component-registry.json')
    doc=read('examples/customer-operations.design.json')
    proposal=read('examples/agent-change.proposal.json')
    count=validate_document(doc,reg)
    preview=demonstrate_patch(doc,proposal,reg)
    assert get_val(doc,'/root/children/0/children/1/props/selectable') is True
    assert get_val(preview,'/root/children/0/children/1/props/selectable') is False
    assert doc['revision']==preview['revision']==proposal['baseRevision']==7
    negative=negative_cases(doc,proposal,reg)
    report=['# Validation Results — Offline Specimen','',
     'Run `python tools/validate_examples.py` from any directory with Python package `jsonschema` available.','',
     '- All 8 schema files pass Draft 2020-12 meta-schema validation.',
     '- Registry and dashboard document: **PASS**.',
     f'- Registered UI instances traversed: **{count}**.',
     '- JSON Patch proposal syntactically validated: **PASS**.',
     '- Optimistic revision and node-ID guard tests: **PASS**.',
     '- Safe dry-run change `selectable: true → false`: **PASS**; source unchanged.',
     f'- Negative validation specimens rejected: **{len(negative)}/{len(negative)}**.','',
     '| Negative specimen | Result | Reason (abridged) |','|---|---|---|']
    for name,result,error in negative:
        report.append(f"| {name} | {result} | `{error.replace('|','/')}` |")
    report += ['','## Scope and limits','',
     'This is **not** a production validator or a full JSON Patch implementation. It has no host permissions, real application binding resolution, schema migration, runtime TypeScript components, Electron IPC, arbitrary registry loading, keyboard verification, DOM rendering, or security enforcement. It deliberately allows only nested component `props` mutations in the patch demonstrator.','',
     'Release-grade code must establish resource limits, JSON Schema output/reporting, type-aware bindings, comprehensive RFC 6902 behavior or explicitly restricted operation subset, stable identity semantics for node insertion, audit and authorization, migration policy, schema provenance, and accessible previews.','']
    (ROOT/'VALIDATION-RESULTS.md').write_text('\n'.join(report))
    print('PASS:',count,'registered nodes;',len(negative),'negative specimens rejected; safe proposal preview validated')
if __name__=='__main__':main()
