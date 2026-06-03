import { Readable } from 'stream';

async function testDrive() {
    const id = "17WjzqtR78nMUCivb8sTqFGTZ4n0R8V_E";
    let url = `https://drive.google.com/uc?export=download&id=${id}`;
    let response = await fetch(url);
    
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      const text = await response.text();
      const confirmMatch = text.match(/confirm=([a-zA-Z0-9_-]+)/);
      if (confirmMatch) {
        let confirmUrl = `${url}&confirm=${confirmMatch[1]}`;
        
        // node fetch get-set-cookie might be tricky, try raw set-cookie
        let cookies = [];
        response.headers.forEach((val, key) => {
          if (key.toLowerCase() === 'set-cookie') {
            cookies.push(val);
          }
        });
        
        // try to fetch with confirm
        response = await fetch(confirmUrl, {
            headers: cookies.length > 0 ? { 'Cookie': cookies.join('; ') } : {}
        });
      }
    }
    
    console.log("FINAL STATUS:", response.status);
    console.log("FINAL CONTENT TYPE:", response.headers.get('content-type'));
    const cd = response.headers.get('content-disposition');
    console.log("CONTENT DISPOSITION:", cd);
}
testDrive();
