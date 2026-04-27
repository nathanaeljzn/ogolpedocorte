import { NextResponse } from 'next/server';
import { getDropboxClient } from '@/lib/dropbox';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const volumePath = searchParams.get('volumePath');
    
    if (!volumePath) return NextResponse.json({ success: false });
    
    const dbx = getDropboxClient();
    const sl = { url: process.env.DROPBOX_ROOT_SHARED_LINK_URL || 'https://www.dropbox.com/scl/fo/jbji8sakhj6f0lsjz20fc/ACrTz_N-oPRC4qiciRFqZcU?rlkey=f0vrpwnr9vgkzl7kfbzd0jb8f&e=3&dl=0' };

    let coverId = null;

    // Scan specifically based on known volume paths
    const volName = volumePath.split('/').pop()?.toUpperCase() || '';
    
    // We do a shallow search into known album subfolders just to find a cover.
    const res = await dbx.filesListFolder({ path: volumePath, shared_link: sl });
    for (const entry of res.result.entries) {
       if (entry['.tag'] === 'folder') {
          // Check this inner folder
          try {
             const inner = await dbx.filesListFolder({ path: entry.path_lower || `${volumePath}/${entry.name}`, shared_link: sl });
             for (const f of inner.result.entries) {
                if (f['.tag'] === 'file' && f.name.match(/\.(jpg|png|jpeg)$/i)) {
                   if (f.name.toLowerCase() === 'capa.jpg' || f.name.toLowerCase() === 'v2.jpg') {
                      coverId = f.id;
                   } else if (!coverId && (f.name.toLowerCase().includes('capa') || f.name.toLowerCase().includes('v2'))) {
                      coverId = f.id;
                   }
                }
             }
          } catch(e) {}
       }
       if (coverId) break;
    }

    if (coverId) {
        let link = '';
        try {
            const sharedLinks = await dbx.sharingListSharedLinks({ path: coverId });
            if (sharedLinks.result.links.length > 0) {
              link = sharedLinks.result.links[0].url;
            } else {
              const newLink = await dbx.sharingCreateSharedLinkWithSettings({ path: coverId });
              link = newLink.result.url;
            }
            link = link.replace('dl=0', 'raw=1').replace('www.dropbox.com', 'dl.dropboxusercontent.com');
            return NextResponse.json({ success: true, coverUrl: link });
        } catch(e) { }
    }

    return NextResponse.json({ success: false });
  } catch(e) {
    return NextResponse.json({ success: false });
  }
}

