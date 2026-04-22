async function testFlow() {
  const volPath = "/VOLUME 1/ALBUM V1. fotogramas tratados pra site.  paginas 01 a 50";
  const url = `http://localhost:3000/api/dropbox?folder=${encodeURIComponent(volPath)}`;
  console.log("Fetching url:", url);
  try {
     const res = await fetch(url);
     const data = await res.json();
     console.log('Result pages:', data.folders?.length, 'folders.');
     if(data.folders) {
        console.log("Data folders sample:", data.folders.slice(0, 3));
     } else {
        console.log("Entire response:", data);
     }
  } catch(e) {
     console.error('Fetch error:', e);
  }
}
testFlow();
