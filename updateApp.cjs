const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace(
  'const fetchData = async () => {',
  `// Hard refresh every 2 hours to completely reset TV Box memory and ensure new data
    const hardReloadInterval = setInterval(() => {
      window.location.reload();
    }, 2 * 60 * 60 * 1000);

    const fetchData = async () => {`
);

fs.writeFileSync('src/App.tsx', c);
console.log('done app reload');
