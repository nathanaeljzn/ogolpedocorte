import { Dropbox } from 'dropbox';

async function run() {
  const token = process.env.DROPBOX_ACCESS_TOKEN;
  if (!token) {
    console.error('Sem DROPBOX_ACCESS_TOKEN');
    return;
  }
  const dbx = new Dropbox({ accessToken: token, fetch });
  try {
    const sharedLink = 'https://www.dropbox.com/scl/fo/jbji8sakhj6f0lsjz20fc/ACrTz_N-oPRC4qiciRFqZcU?rlkey=f0vrpwnr9vgkzl7kfbzd0jb8f&e=3&dl=0';
    const folder = '/VOLUME 1/ALBUM V1. fotogramas tratados pra site.  paginas 01 a 50';
    console.log('Testing list for folder:', folder);

    const res = await dbx.filesListFolder({ path: folder, shared_link: { url: sharedLink } });
    console.log('Folder entries:', res.result.entries.length);
    res.result.entries.slice(0, 5).forEach(e => console.log(e.name, e['.tag']));
  } catch (err: any) {
    console.error('Error:', err?.error || err);
  }
}
run();
