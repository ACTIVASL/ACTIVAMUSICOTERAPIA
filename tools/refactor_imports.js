const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

const targetDir = 'apps/crm-client/src';
const files = walk(targetDir);
let changedCount = 0;

console.log(`Scanning ${files.length} files in ${targetDir}...`);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. UI System Replacements
    // Handles:
    // from '@/components/ui/Button'
    // from '../../components/ui/Button'
    // from './components/ui/Button'
    content = content.replace(/from\s+['"][@\.].*\/components\/ui\/(\w+)['"]/g, "from '@monorepo/ui-system'");
    // Handles root folder import if any
    content = content.replace(/from\s+['"][@\.].*\/components\/ui['"]/g, "from '@monorepo/ui-system'");

    // 2. Auth Engine Replacements
    // Handles:
    // from '@/auth/LoginView'
    // from '../../auth/LoginView'
    content = content.replace(/from\s+['"][@\.].*\/auth\/(\w+)['"]/g, "from '@monorepo/engine-auth'");
    // Handles root auth import
    content = content.replace(/from\s+['"][@\.].*\/auth['"]/g, "from '@monorepo/engine-auth'");
    // Special case for context/AuthContext often imported directly
    // If AuthContext was moved to engine-auth/src/context/AuthContext.tsx, checking export.
    // It's likely exported from index.ts too if I did it right.

    // 3. Billing Engine Replacements
    content = content.replace(/from\s+['"][@\.].*\/modules\/billing\/(\w+)['"]/g, "from '@monorepo/engine-billing'");
    content = content.replace(/from\s+['"][@\.].*\/modules\/billing['"]/g, "from '@monorepo/engine-billing'");

    // 4. Cleanup potentially duplicate lines if multiple imports mapped to same package
    // (Optional, but good for hygiene. For now, multiple lines work).

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
        console.log(`Fixed imports in: ${file}`);
    }
});

console.log(`\nOperation Complete. Updated ${changedCount} files.`);
