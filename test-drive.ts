import fs from 'fs';

async function testDrive(id: string) {
  let url = `https://drive.google.com/uc?export=download&id=${id}`;
  let response = await fetch(url);
  
  const contentType = response.headers.get('content-type') || '';
  console.log('Content-Type:', contentType);
  
  if (contentType.includes('text/html')) {
    const text = await response.text();
    // find confirm code
    console.log("HTML length:", text.length);
    const confirmMatch = text.match(/confirm=([a-zA-Z0-9_-]+)/);
    console.log("Confirm Match:", confirmMatch ? confirmMatch[1] : null);
    
    fs.writeFileSync('drive_dump.html', text);
  } else {
    console.log('Not HTML, ready to download');
  }
}

// 1B_x_D-a_Y-8J_lFjM6K0sXvP0MvP7JpL -> Ubuntu ISO or some large file? 
// Or I can use a known large file ID. I don't have one right now, so let me just write robust bypass code based on common knowledge.
testDrive('TEST_FILE_ID'); // We will just update server.ts
