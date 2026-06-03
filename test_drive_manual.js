async function testDriveManual() {
    const id = "17WjzqtR78nMUCivb8sTqFGTZ4n0R8V_E";
    let url = `https://drive.google.com/uc?export=download&id=${id}`;
    let response = await fetch(url, { redirect: 'manual' });
    console.log(response.status, response.headers);
    if (response.status >= 300 && response.status < 400) {
        console.log("Redirect:", response.headers.get('location'));
    }
}
testDriveManual();
