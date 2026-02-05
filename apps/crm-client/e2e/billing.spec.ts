import { test, expect } from '@playwright/test';

test.describe('Titanium Billing Critical Path', () => {
  test('should generate an invoice for Maria Garcia pending session', async ({ page }) => {
    console.error('[DEBUG] STEP 1: Starting Test Body');

    // 1. Login
    console.error('[DEBUG] STEP 2: Navigating to /auth/login');
    await page.goto('/auth/login');

    console.error('[DEBUG] STEP 3: Clicking Demo Button');
    const demoBtn = page.getByRole('button', { name: /Acceso Demo/i });
    await expect(demoBtn).toBeVisible({ timeout: 5000 });
    await demoBtn.click();

    console.error('[DEBUG] STEP 4: Waiting for Dashboard');
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

    // 2. Navigate to Billing
    console.error('[DEBUG] STEP 5: Navigating to Billing');
    await page.goto('/billing');
    await expect(page.getByRole('heading', { name: /Facturación/i })).toBeVisible();

    // 3. Open Wizard
    console.error('[DEBUG] STEP 6: Opening Wizard');
    await page.getByRole('button', { name: /Nueva Factura/i }).click();

    // 4. Wizard Step 1: Mode Selection
    console.error('[DEBUG] STEP 7: Selecting Mode');
    await expect(page.getByText('¿A quién vas a facturar?')).toBeVisible();
    await page.click('text=Paciente Individual');

    // 5. Wizard Step 2: Patient Selection
    console.error('[DEBUG] STEP 8: Searching Maria');
    const searchInput = page.getByPlaceholder('Buscar...');
    await searchInput.fill('Maria');

    const patientBtn = page.getByRole('button', { name: /Maria García/i });
    await expect(patientBtn).toBeVisible();
    await patientBtn.click();

    // 6. Wizard Step 3: Session Selection
    console.error('[DEBUG] STEP 9: Selecting Session');
    await expect(page.getByText('Sesión Individual')).toBeVisible();

    await page.locator('input[type="checkbox"]').first().check();
    await page.getByRole('button', { name: /Siguiente/i }).click();

    // 7. Wizard Step 4: Summary & Generate
    console.error('[DEBUG] STEP 10: Generating');
    const createBtn = page.getByRole('button', { name: /Crear Factura Original/i });
    await expect(createBtn).toBeEnabled();
    await createBtn.click();

    // 8. Verification
    console.error('[DEBUG] STEP 11: Verifying');
    await expect(page.getByText('Maria García').first()).toBeVisible();
    console.error('[DEBUG] STEP 12: SUCCESS');
  });
});
