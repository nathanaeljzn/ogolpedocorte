import { Dropbox } from 'dropbox';

async function run() {
  const token = process.env.DROPBOX_ACCESS_TOKEN;
  const dbx = new Dropbox({ accessToken: token, fetch });
  const sl = { url: 'https://www.dropbox.com/scl/fo/jbji8sakhj6f0lsjz20fc/ACrTz_N-oPRC4qiciRFqZcU?rlkey=f0vrpwnr9vgkzl7kfbzd0jb8f&e=3&dl=0' };

  async function ls(folder: string) {
     console.log('LS', folder);
     const res = await dbx.filesListFolder({ path: folder, shared_link: sl });
     res.result.entries.slice(0,5).forEach(f => console.log(f.name, f['.tag']));
  }

  await ls('/VOLUME 1/ALBUM V1. fotogramas tratados pra site.  paginas 01 a 50');
}
run();
