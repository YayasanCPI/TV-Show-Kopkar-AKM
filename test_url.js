const https = require('https');
https.get('https://i.ibb.co.com/WvTwLMn5/image-1.png', (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Location:', res.headers.location);
});
