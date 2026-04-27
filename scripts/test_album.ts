import { Dropbox } from 'dropbox';

async function run() {
  const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch });
  const sl = { url: 'https://www.dropbox.com/scl/fo/jbji8sakhj6f0lsjz20fc/ACrTz_N-oPRC4qiciRFqZcU?rlkey=f0vrpwnr9vgkzl7kfbzd0jb8f&e=3&dl=0' };

  async function getCover(volumePath: string) {
     let coverId: string | null = null;
     const res = await dbx.filesListFolder({ path: volumePath, shared_link: sl });
     for (const entry of res.result.entries) {
        if (entry['.tag'] === 'folder') {
           console.log("Checking folder:", entry.name);
           const inner = await dbx.filesListFolder({ path: entry.path_lower || `${volumePath}/${entry.name}`, shared_link: sl });
           for (const f of inner.result.entries) {
              if (f['.tag'] === 'file' && f.name.match(/\.(jpg|png|jpeg)$/i)) {
                 if (f.name.toLowerCase() === 'capa.jpg' || f.name.toLowerCase() === 'v2.jpg') {
                    coverId = f.id;
                    console.log(">> Exact match on", f.name);
                 } else if (!coverId && (f.name.toLowerCase().includes('capa') || f.name.toLowerCase().includes('v2'))) {
                    coverId = f.id;
                    console.log(">> Fallback match on", f.name);
                 }
              }
           }
        }
        if (coverId) {
             console.log("BROKE out of folder loop!", coverId);
             break;
        }
     }
  }

  await getCover('/VOLUME 3');
}
run();
