/**
 * DRAFT API CONTRACT: For design review, NOT a published implementation.
 * Consuming app owns transport, data reconciliation, permissions, execution.
 */

export type DataPhase =
  | 'idle' | 'loading' | 'ready' | 'empty' | 'refreshing' | 'error';
export type Connectivity =
  | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';
export type Freshness = 'current' | 'stale' | 'unknown';
export type ExecutionPhase =
  | 'queued' | 'running' | 'paused' | 'succeeded' | 'failed' | 'cancelled';
export type ApprovalPhase =
  | 'pending' | 'approved' | 'rejected' | 'expired' | 'revoked';
export type ValidationPhase =
  | 'unvalidated' | 'validating' | 'valid' | 'warning' | 'invalid';
export type EditPhase = 'clean' | 'dirty' | 'saving' | 'conflict';
export type StreamPresentationPhase =
  | 'streaming' | 'interrupted' | 'finished' | 'failed';

export interface ViewObservation<T> {
  dataPhase: DataPhase;
  data?: T;
  connection?: Connectivity;
  freshness?: Freshness;
  lastVerifiedAt?: string; // ISO8601; app-supplied, not inferred
  error?: { code: string; message: string; retryable?: boolean };
}

export interface OperationView {
  id: string;
  phase: ExecutionPhase;
  connection?: Connectivity;
  freshness?: Freshness;
  progress?: { completed: number; total: number; unit?: string };
  // only present when provided by authoritative host
  lastVerifiedAt?: string;
  cancellationRequested?: boolean;
}

export interface ApprovalView {
  requestId: string;
  revision: string;
  phase: ApprovalPhase;
  title: string;
  summary: string;
  risk?: 'low' | 'medium' | 'high';
  actorLabel?: string;
  resourceLabel?: string;
  expiresAt?: string;
  changePreview?: { before: string; after: string; format: 'text' | 'json' | 'diff' };
}

export interface ApprovalDecisionIntent {
  requestId: string;
  expectedRevision: string;
  decision: 'approve' | 'reject';
  comment?: string;
}

export type ApprovalDecisionTransportPhase =
  | 'idle' | 'submitting' | 'awaitingConfirmation' | 'confirmed' | 'conflict' | 'error';

export interface DesignProposal {
  designId: string;
  baseRevision: string;
  jsonPatch: readonly {
    op: 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test';
    path: string;
    from?: string;
    value?: unknown;
  }[];
  validation:
    | { phase: 'pending' }
    | { phase: 'valid'; diagnostics: readonly string[] }
    | { phase: 'invalid'; diagnostics: readonly string[] };
  // Host authorizes and applies after a user's explicit approval.
}

/**
 * Presentation props are an illustration. No React dependency is required
 * by the pure schema/state package.
 */
export interface ApprovalPanelPresentationProps {
  value: ApprovalView;
  decisionTransportPhase?: ApprovalDecisionTransportPhase;
  onDecisionIntent: (intent: ApprovalDecisionIntent) => void;
}
