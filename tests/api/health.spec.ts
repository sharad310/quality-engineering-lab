import { test, expect } from '@playwright/test';

test('health endpoint confirms API and SQLite are available', async ({ request }) => {
  const response = await request.get('/api/health');
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ status: 'ok', database: 'connected' });
});
