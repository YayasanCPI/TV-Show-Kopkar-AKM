fetch('https://i.ibb.co.com/WvTwLMn5/image-1.png').then(r => console.log('Status: ' + r.status + ', Content-Type: ' + r.headers.get('content-type'))).catch(e => console.error(e));
