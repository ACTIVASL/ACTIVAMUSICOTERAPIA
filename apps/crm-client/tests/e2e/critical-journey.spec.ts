import { test, expect } from '@playwright/test';

test.describe('Titanium Critical Journey', () => {
  test('Complete Clinical Loop: Login -> Create Patient -> Quick Appointment', async ({ page }) => {
    test.setTimeout(90000);

    try {
      // 1. Initial Access
      console.log('Step 1: Navigating to Root...');

      // TITANIUM DEBUG: Listen for App Errors
      page.on('console', (msg) => {
        if (msg.type() === 'error') console.log(`PAGE ERROR LOG: ${msg.text()}`);
      });
      page.on('pageerror', (err) => {
        console.log(`PAGE EXCEPTION: ${err.message}`);
      });

      await page.goto('/', { waitUntil: 'commit' }); // Wait for connection only

      // TITANIUM ROBUSTNESS: Force Nuke Splash Screen
      console.log('Step 1b: Nuking Splash Screen...');
      await page.waitForTimeout(1000); // Give it a sec to render React logic
      await page.evaluate(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) splash.remove();
      });

      // Check if we are already logged in (Persistence)
      const url = page.url();
      console.log(`Current URL: ${url}`);
      if (url.includes('dashboard')) {
        console.log('⚠️ Already on Dashboard. Skipping Login.');
      } else {
        console.log('Step 2: Entering Demo Mode (Premium)...');
        // Use a very specific selector and wait longer
        const demoButton = page
          .locator('button')
          .filter({ hasText: /Acceso Demo/i })
          .first();
        await expect(demoButton).toBeVisible({ timeout: 30000 }); // Give it 30s for heavy animations
        await demoButton.click({ force: true });
      }

      // 3. Verify Dashboard
      console.log('Step 3: Waiting for Dashboard...');
      await expect(page).toHaveURL(/.*dashboard/, { timeout: 20000 });
      await expect(page.getByText('Próximas Sesiones')).toBeVisible();

      // 4. Patients Directory
      console.log('Step 4: Going to Patients...');
      await page.goto('/patients');

      // 5. Create Patient
      console.log('Step 5: Clicking New Patient...');
      await page.getByRole('button', { name: /Nueva Admisión/i }).click(); // Correct Text from PatientsDirectory

      const nameData = `Omega Subject ${Date.now()}`;
      console.log(`Creating: ${nameData}`);

      // Modal is Open
      await expect(page.getByText('Nueva Admisión')).toBeVisible();

      await page.locator('input[name="name"]').fill(nameData);
      await page.locator('input[name="age"]').fill('35');

      // Required Selects
      // Diagnosis is required. Select the second option.
      await page.locator('select[name="diagnosisSelect"]').selectOption({ index: 1 });

      // Save
      // Save
      console.log('Step 5b: Saving...');

      // TITANIUM ROBUSTNESS: Wait for animations (Extreme Mode)
      console.log('Waiting for modal animation...');
      await page.waitForTimeout(3000);

      // Debug: Check if form is valid
      const isVisible = await page
        .getByRole('button', { name: /Guardar/i })
        .first()
        .isVisible();
      console.log(`Save button visible? ${isVisible}`);

      // Strategy A: Click visible button
      const visibleSave = page
        .locator('button')
        .filter({ hasText: /Guardar/i })
        .filter({ hasNotText: /Cancelar/i });
      const count = await visibleSave.count();
      let clicked = false;
      for (let i = 0; i < count; i++) {
        const btn = visibleSave.nth(i);
        if (await btn.isVisible()) {
          console.log(`Clicking button ${i}`);
          await btn.hover(); // Hover first
          await page.waitForTimeout(500);
          await btn.click({ force: true });
          clicked = true;
          break;
        }
      }

      // Strategy B: Press Enter in the form
      if (!clicked) {
        console.log('⚠️ Strategy A Failed. Trying Strategy B (Enter Key)...');
        await page.locator('input[name="name"]').focus();
        await page.keyboard.press('Enter');
        // Check if closed
        try {
          await expect(page.getByText('Nueva Admisión')).toBeHidden({ timeout: 5000 });
          clicked = true;
        } catch {
          console.log('Strategy B failed.');
        }
      }

      if (!clicked) {
        // Debug dump
        console.log('Saving failed. html dump:');
        // console.log(await page.content());
        throw new Error('No visible Save button found and Enter key failed');
      }

      // 6. Verify Creation
      console.log('Step 6: Verifying List...');
      // Wait for modal to close (use 'hidden' state)
      await expect(page.getByText('Nueva Admisión')).toBeHidden({ timeout: 10000 });

      // Reload page to be safe or wait for list update
      await expect(page.getByText(nameData)).toBeVisible({ timeout: 15000 });

      // 7. Quick Appointment
      console.log('Step 7: Scheduling Quick Appointment...');
      const quickApptBtn = page.getByRole('button', { name: /Nueva Cita|Cita Rápida/i }).first();
      // If not ensuring topbar visibility, force navigation to dashboard where it definitely exists
      if (!(await quickApptBtn.isVisible())) {
        await page.goto('/dashboard');
      }
      await quickApptBtn.click();

      // Simple wait for combobox
      const combobox = page.locator('input[type="text"][placeholder*="Buscar"]').first();
      if (await combobox.isVisible()) {
        await combobox.fill(nameData);
        await page.keyboard.press('Enter');
      } else {
        // Fallback if native select
        const nativeSelect = page.locator('select').first();
        if (await nativeSelect.isVisible()) await nativeSelect.selectOption({ label: nameData });
      }

      await page.getByRole('button', { name: /Confirmar Cita/i }).click();

      // 8. Result
      console.log('Step 8: Success Check...');
      await expect(page.getByText('Cita rápida creada')).toBeVisible();

      console.log('✅ OMEGA JOURNEY SUCCESS');
    } catch (error) {
      console.error('🔥 TEST FAILED');
      // Dump content for debug
      console.log('PAGE DUMP:', (await page.content()).slice(0, 1000));
      throw error;
    }
  });
});
