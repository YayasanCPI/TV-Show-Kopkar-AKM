const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');
content = content.replace("videoUrl?: string;", "videoUrl?: string;\n  isFullScreen?: boolean;");
fs.writeFileSync('src/types.ts', content);
