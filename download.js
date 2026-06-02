const fs = require('fs');
const https = require('https');

if (!fs.existsSync('src/assets')){
    fs.mkdirSync('src/assets');
}

https.get('https://i.ibb.co.com/WvTwLMn5/image-1.png', (res) => {
  if (res.statusCode === 301 || res.statusCode === 302) {
    https.get(res.headers.location, (res2) => {
      res2.pipe(fs.createWriteStream('src/assets/logo.png'));
    });
  } else {
    res.pipe(fs.createWriteStream('src/assets/logo.png'));
  }
}).on('error', (e) => {
  console.error(e);
});
