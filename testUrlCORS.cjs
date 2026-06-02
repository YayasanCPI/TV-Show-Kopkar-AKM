fetch('https://i.ibb.co.com/WvTwLMn5/image-1.png').then(r => {
  console.log('Status: ' + r.status);
  console.log('Content-Type: ' + r.headers.get('content-type'));
  console.log('Access-Control-Allow-Origin: ' + r.headers.get('access-control-allow-origin'));
}).catch(e => console.error(e));
