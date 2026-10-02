const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');
code = code.replace(/\\\`\\\$\\{/g, '`\\${');
code = code.replace(/%\\\`/g, '%`');
code = code.replace(/SOL\\\`/g, 'SOL`');
fs.writeFileSync('app/page.tsx', code);
