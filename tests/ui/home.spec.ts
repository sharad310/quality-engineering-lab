import { test, expect } from '@playwright/test';

test('home page loads and the frontend can reach the API', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Quality Engineering Lab');
  await expect(page.getByRole('heading', { name: 'Quality Engineering Lab', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'The shop is taking shape' })).toBeVisible();
  const response = await page.request.get('/api/health');
  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toEqual({ status: 'ok', database: 'connected' });
});
