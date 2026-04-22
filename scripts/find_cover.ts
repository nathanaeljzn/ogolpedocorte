import { Dropbox } from 'dropbox';

async function run() {
  const token = process.env.DROPBOX_ACCESS_TOKEN;
  const dbx = new Dropbox({ accessToken: token, fetch });
  const sharedLink = 'https://www.dropbox.com/scl/fo/jbji8sakhj6f0lsjz20fc/ACrTz_N-oPRC4qiciRFqZcU?rlkey=f0vrpwnr9vgkzl7kfbzd0jb8f&e=3&dl=0';
  
  try {
     const res = await dbx.filesListFolder({ 
        path: '/VOLUME 1/ALBUM V1. fotogramas tratados pra site.  paginas 01 a 50', 
        shared_link: { url: sharedLink } 
     });
     
     const cover = res.result.entries.find(e => e.name.toUpperCase().includes('CAPA'));
     if (cover) {
         console.log("Found cover:", cover.name);
         const sharedLinks = await dbx.sharingListSharedLinks({ path: (cover as any).id });
         let link = '';
         if (sharedLinks.result.links.length > 0) {
           link = sharedLinks.result.links[0].url;
         } else {
           const newLink = await dbx.sharingCreateSharedLinkWithSettings({ path: (cover as any).id });
           link = newLink.result.url;
         }
         console.log("Direct Link:", link.replace('?dl=0', '?raw=1').replace('www.dropbox.com', 'dl.dropboxusercontent.com'));
     } else {
         console.log("No cover found in this folder");
     }
  } catch(e) {
      console.log('Error', e);
  }
}
run();
