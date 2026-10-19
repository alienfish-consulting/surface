import {defineConfig,devices} from '@playwright/test';

export default defineConfig({
  testDir:'./tests/e2e/storybook',
  fullyParallel:false,
  retries:0,
  workers:1,
  reporter:[['list'],['html',{open:'never',outputFolder:'playwright-report/storybook'}]],
  use:{
    baseURL:'http://127.0.0.1:6006',
    trace:'retain-on-failure',
    screenshot:'only-on-failure',
  },
  projects:[
    {name:'chromium',use:{...devices['Desktop Chrome'],viewport:{width:1280,height:720}}},
    {name:'firefox',use:{...devices['Desktop Firefox'],viewport:{width:1280,height:720}}},
    {name:'webkit',use:{...devices['Desktop Safari'],viewport:{width:1280,height:720}}},
  ],
  webServer:{
    command:'corepack pnpm storybook',
    url:'http://127.0.0.1:6006',
    reuseExistingServer:true,
    timeout:120_000,
  },
});
