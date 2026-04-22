import { Dropbox } from 'dropbox';

async function run() {
  const token = process.env.DROPBOX_ACCESS_TOKEN;
  const dbx = new Dropbox({ accessToken: token, fetch });
  const sharedLink = 'https://www.dropbox.com/scl/fo/jbji8sakhj6f0lsjz20fc/ACrTz_N-oPRC4qiciRFqZcU?rlkey=f0vrpwnr9vgkzl7kfbzd0jb8f&e=3&dl=0';
  
  const res = await dbx.filesListFolder({ 
     path: '/VOLUME 1/ALBUM V1. fotogramas tratados pra site.  paginas 01 a 50', 
     shared_link: { url: sharedLink } 
  });

  const entry = res.result.entries[0] as any;
  console.log("Name:", entry.name);
  console.log("Path Lower:", entry.path_lower);
  console.log("Path Display:", entry.path_display);
  console.log("ID:", entry.id);
  console.log("Using my fallback path logic:", entry.path_lower || entry.path_display || `/${entry.name}`);
}
run();
