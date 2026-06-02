const fs = require('fs');
const path = require('path');

function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInFiles(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            content = content.replace(/backdrop-[a-zA-Z0-9_-]+/g, '');
            content = content.replace(/blur-[a-zA-Z0-9_-]+/g, '');
            content = content.replace(/backdrop-/g, '');
            
            content = content.replace(/ +/g, ' ');

            fs.writeFileSync(fullPath, content);
        }
    }
}
replaceInFiles('src');
console.log('Cleaned up more blurs');
