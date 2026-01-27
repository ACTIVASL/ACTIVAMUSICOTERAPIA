const { chromium } = require('@playwright/test');

(async () => {
    console.log('--- 🟢 SYSTEM: MONITORING STARTED ---');
    console.log('--- INSTRUCTION: Log in manually. I am watching the console. ---');

    // Force Environment
    if (!process.env.HOME) process.env.HOME = 'C:\\Users\\Usuario';

    // Launch VISIBLE browser
    const browser = await chromium.launch({
        headless: false, // USER CAN SEE AND INTERACT
        args: ['--start-maximized', '--no-sandbox']
    });

    const context = await browser.newContext({ viewport: null });
    const page = await context.newPage();

    // --- 👁️ THE ALL-SEEING EYE (Analysis Hooks) ---

    // 1. Console Logs
    page.on('console', msg => {
        const type = msg.type();
        const text = msg.text();
        if (type === 'error') console.log(`[🔴 CONSOLE ERROR] ${text}`);
        else if (type === 'warning') console.log(`[🟡 WARN] ${text}`);
        else console.log(`[ℹ️ LOG] ${text}`);
    });

    // 2. Page Errors (Exceptions)
    page.on('pageerror', err => {
        console.log(`[💥 CRASH] Uncaught Exception: ${err.message}`);
    });

    // 3. Network Failures
    page.on('requestfailed', req => {
        console.log(`[❌ NETWORK FAIL] ${req.method()} ${req.url()} - ${req.failure().errorText}`);
    });

    // 4. Mutation Success/Fail detection (By URL patterns or specific logs)
    page.on('response', async res => {
        if (res.status() >= 400) {
            console.log(`[🔥 HTTP ERROR] ${res.status()} on ${res.url()}`);
        }
        // Specific checks for our app
        if (res.url().includes('firestore')) {
            // Firestore specific sniffing if needed
        }
    });

    // Navigate
    try {
        await page.goto('http://localhost:5173');
        console.log('[✅ NAV] Loaded localhost:5173');
    } catch (e) {
        console.log(`[❌ NAV FAIL] Could not load page: ${e.message}`);
    }

    // KEEP ALIVE
    // We just hang here indefinitely until user closes browser
    await page.waitForEvent('close', { timeout: 0 });

    console.log('--- 🔴 SYSTEM: BROWSER CLOSED BY USER ---');
    await browser.close();
})();
