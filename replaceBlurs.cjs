const fs = require('fs');
const path = require('path');

function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInFiles(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Remove blur classes
            content = content.replace(/blur-\[[^\]]+\]/g, '');
            content = content.replace(/blur-[a-z0-9]+/g, '');
            
            // Remove backdrop-blur classes
            content = content.replace(/backdrop-blur-\[[^\]]+\]/g, '');
            content = content.replace(/backdrop-blur-[a-z0-9]+/g, '');
            
            // Cleanup extra spaces inside classNames can be tricky but let's just do a basic one
            content = content.replace(/ +/g, ' ');

            fs.writeFileSync(fullPath, content);
        }
    }
}
replaceInFiles('src');
console.log('Done replacing blurs');
