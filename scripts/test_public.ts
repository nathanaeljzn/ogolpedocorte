import { Dropbox } from 'dropbox';

async function run() {
  const token = process.env.DROPBOX_ACCESS_TOKEN;
  if (!token) {
    console.error('Sem DROPBOX_ACCESS_TOKEN');
    return;
  }
  const dbx = new Dropbox({ accessToken: token, fetch });
  try {
    const res = await dbx.filesListFolder({ path: '/public' });
    const entries = res.result.entries.filter(e => e['.tag'] === 'file');
    
    for (const file of entries) {
       let link = '';
       try {
         // Try checking existing links
         const sharedLinks = await dbx.sharingListSharedLinks({ path: file.path_lower! });
         if (sharedLinks.result.links.length > 0) {
            link = sharedLinks.result.links[0].url;
         } else {
            // Create new
            const newLink = await dbx.sharingCreateSharedLinkWithSettings({ path: file.path_lower! });
            link = newLink.result.url;
         }
       } catch(e) {
          console.error("Error on", file.name, e);
       }
       
       if (link) {
          const directLink = link.replace('?dl=0', '?raw=1').replace('www.dropbox.com', 'dl.dropboxusercontent.com');
          console.log(`"${file.name}": "${directLink}",`);
       }
    }
    
  } catch (err: any) {
    console.error('Error:', err?.error || err);
  }
}
run();
