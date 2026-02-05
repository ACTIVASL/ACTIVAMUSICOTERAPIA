const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// SOURCE: The high-res logo
const SOURCE = 'apps/crm-client/public/activa-logo-new.png';

// TARGETS: Where to save the assets
const TARGET_DIRS = [
    'apps/crm-client/public',
    'apps/landing-web/public'
];

const ICONS = [
    { name: 'favicon.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 }, // Apple Standard
    { name: 'apple-icon-v11.png', size: 180 },   // Legacy ref
    { name: 'pwa-192x192.png', size: 192 },
    { name: 'pwa-v11-192.png', size: 192 },
    { name: 'pwa-512x512.png', size: 512 },
    { name: 'pwa-v11-512.png', size: 512 },
];

async function generate() {
    if (!fs.existsSync(SOURCE)) {
        console.error('❌ Source file not found:', SOURCE);
        process.exit(1);
    }

    console.log('💎 Titanium Asset Generator Started');
    console.log('Source:', SOURCE);

    for (const dir of TARGET_DIRS) {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        console.log(`\n📂 Processing target: ${dir}`);

        for (const icon of ICONS) {
            const outputPath = path.join(dir, icon.name);

            try {
                await sharp(SOURCE)
                    .resize(icon.size, icon.size, {
                        fit: 'contain',
                        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent
                    })
                    .toFile(outputPath);

                console.log(`   ✅ Generated ${icon.name} (${icon.size}x${icon.size})`);
            } catch (err) {
                console.error(`   ❌ Failed ${icon.name}:`, err);
            }
        }
    }
    console.log('\n✨ Asset Generation Complete.');
}

generate();
