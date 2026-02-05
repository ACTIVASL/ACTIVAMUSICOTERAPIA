import { test, expect } from '@playwright/test';

test.describe('Smoke Test - Critical Path', () => {
  test('should load app, login via demo mode, and render dashboard', async ({ page }) => {
    console.log('Visiting root...');
    // 1. Visit Root
    await page.goto('/');

    console.log('Waiting for "Acceso Demo" button...');
    // 2. Click "Acceso Demo / Auditoría"
    // Using text selector which is often more robust for specific button labels
    const demoBtn = page.getByText('Acceso Demo / Auditoría');
    await expect(demoBtn).toBeVisible({ timeout: 30000 });

    console.log('Clicking Demo button...');
    await demoBtn.click();

    console.log('Waiting for URL redirection to /dashboard...');
    // 3. Verify Dashboard Load
    // Wait for URL transition
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 30000 });

    console.log('Verifying Dashboard elements...');
    // 4. Verify Critical Elements
    // Header
    await expect(page.getByText('Panel de Control')).toBeVisible({ timeout: 15000 });

    // Logic check: if text appears, we are good.
    console.log('Smoke Test Passed.');
  });
});
