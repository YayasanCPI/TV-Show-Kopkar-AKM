const https = require('https');
https.get('https://script.google.com/macros/s/AKfycbwLh5aJs0QsayYfm9TlAnbi1U2S5Zj1alY8euKhTp3N5kYq59Q62Wq5iHR6-peOIURggw/exec?action=getSlides', (res) => {
  if (res.statusCode === 301 || res.statusCode === 302) {
    https.get(res.headers.location, (res2) => res2.pipe(process.stdout));
  } else { res.pipe(process.stdout); }
});
