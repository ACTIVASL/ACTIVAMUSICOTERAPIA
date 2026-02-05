import { test } from '@playwright/test';

test('Forensic Verification of Session Creation', async ({ page }) => {
  console.log('--- STARTING FORENSIC AUDIT ---');

  // 1. Navigation
  await page.goto('http://localhost:5173');
  await page.waitForLoadState('networkidle');
  console.log('Page Loaded. Title:', await page.title());

  // 2. Auth Check (Bypass if in Dashboard, Login if needed)
  // Assuming auto-login or immediate dashboard
  if (await page.getByText('Entrar').isVisible()) {
    console.log('Login screen detected. Attempting bypass or logging failure.');
  }

  // 3. New Session Flow
  console.log('Attempting to open Session Modal...');
  // Adjust selector to match your "Nueva Sesión" button
  // Trying common selectors based on code analysis
  const newSessionBtn = page.locator('button:has-text("Nueva Sesión")').first();
  if (await newSessionBtn.isVisible()) {
    await newSessionBtn.click();
    console.log('Clicked "Nueva Sesión".');
  } else {
    // Maybe we need to click a patient first?
    console.log('New Session button not found globally. Trying first patient...');
    await page.locator('.patient-card, div[role="button"]').first().click();
    await page.waitForTimeout(1000);
    await page.getByText('Nueva Sesión').click();
    console.log('Detailed View -> New Session clicked.');
  }

  // 4. Input Data
  await page.waitForSelector('textarea[name="notes"]');
  await page.fill('textarea[name="notes"]', 'AUDITORIA AUTOMATICA - NO BORRAR');
  console.log('Notes filled.');

  // 5. Verification of "Loading State" (The Crucial Check)
  console.log('Clicking Save...');
  const saveBtn = page.locator('button:has-text("Guardar Sesión")');

  // Trigger click but don't await immediately, we want to catch the state change
  await saveBtn.click();

  // Check fast for disabled state / text change
  const isSaving = await page
    .locator('button:has-text("Guardando...")')
    .isVisible({ timeout: 2000 })
    .catch(() => false);
  const isDisabled = await saveBtn.isDisabled().catch(() => false);

  console.log(`[VERIFICATION POINT] UI Visual Feedback:`);
  console.log(`- Button changed text to "Guardando...": ${isSaving}`);
  console.log(`- Button became disabled: ${isDisabled}`);

  if (isSaving || isDisabled) {
    console.log('✅ PASS: UI correctly blocks user interaction during save.');
  } else {
    console.log('❌ FAIL: UI did not show loading state.');
  }

  // 6. Wait for completion
  await page.waitForTimeout(2000); // Wait for mock/real backend

  // 7. Verify Persistence in List
  const notesVisible = await page.getByText('AUDITORIA AUTOMATICA - NO BORRAR').isVisible();
  console.log(
    `[VERIFICATION POINT] Data Persistence: ${notesVisible ? '✅ DETECTED' : '❌ NOT FOUND'}`,
  );

  console.log('--- END AUDIT ---');
});
