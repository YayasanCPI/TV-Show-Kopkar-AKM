async function testDriveDownload() {
    const id = "17WjzqtR78nMUCivb8sTqFGTZ4n0R8V_E";
    let url = `https://drive.usercontent.google.com/download?id=${id}&export=download`;
    let response = await fetch(url);
    const text = await response.text();
    
    const uuidMatch = text.match(/name="uuid" value="([^"]+)"/);
    if (!uuidMatch) {
       console.log("No UUID found!"); return;
    }
    const uuid = uuidMatch[1];
    console.log("Found UUID:", uuid);
    
    let confirmUrl = `${url}&confirm=t&uuid=${uuid}`;
    
    // fetch confirm url
    let confirmResponse = await fetch(confirmUrl, { redirect: 'manual' });
    console.log("Confirm Status:", confirmResponse.status);
    console.log("Location:", confirmResponse.headers.get('location'));
}
testDriveDownload();
