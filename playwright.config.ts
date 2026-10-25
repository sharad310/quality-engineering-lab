import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { trace: 'retain-on-failure' },
  webServer: [
    {
      command: 'npm run dev:backend',
      url: 'http://127.0.0.1:3001/api/health',
      env: { PORT: '3001', DATABASE_PATH: ':memory:' },
      reuseExistingServer: false,
    },
    {
      command: 'npm run dev:frontend',
      url: 'http://127.0.0.1:5173',
      reuseExistingServer: false,
    },
  ],
  projects: [
    { name: 'api', testDir: './tests/api', use: { baseURL: 'http://127.0.0.1:3001' } },
    { name: 'ui', testDir: './tests/ui', use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:5173' } },
  ],
});
