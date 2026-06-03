async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/absensi');
    const text = await res.text();
    console.log("STATUS:", res.status);
    console.log("BODY:", text.substring(0, 100));
  } catch(e) {
    console.error("ERROR:", e);
  }
}
test();
