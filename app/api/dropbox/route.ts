import { NextResponse } from 'next/server';
import { getDropboxClient } from '@/lib/dropbox';

export const dynamic = 'force-dynamic';

// Cache em memória para evitar Rate Limit e lentidão no Dropbox API (resiste até o servidor reiniciar)
const linkCache = new Map<string, string>();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || '';
    const getImages = searchParams.get('images') === 'true'; // if true, gets temp links
    
    // Hardcoded shared link provided by user
    const sharedLink = 'https://www.dropbox.com/scl/fo/jbji8sakhj6f0lsjz20fc/ACrTz_N-oPRC4qiciRFqZcU?rlkey=f0vrpwnr9vgkzl7kfbzd0jb8f&e=3&dl=0';
    
    const dbx = getDropboxClient();
    
    const response = await dbx.filesListFolder({ 
      path: folder,
      shared_link: { url: sharedLink }
    });

      if (getImages) {
      // Filter only images
      const imageEntries = response.result.entries.filter((entry: any) => 
        entry['.tag'] === 'file' && entry.name.match(/\.(jpg|jpeg|png|gif)$/i)
      );

      // Filter pdfs and docs (fichas)
      const docEntries = response.result.entries.filter((entry: any) => 
        entry['.tag'] === 'file' && entry.name.match(/\.(pdf|doc|docx)$/i)
      );

      let docMap: Record<string, string> = {};
      const standaloneDocs = [];

      for (const doc of docEntries as any[]) {
         const url = `/api/dropbox-image?id=${encodeURIComponent(doc.id)}`;
         const plainName = doc.name.replace(/\.[^/.]+$/, "");
         docMap[plainName] = url;
         standaloneDocs.push({
           id: doc.id,
           name: doc.name,
           url: url,
           documentUrl: url,
           isDoc: true
         });
      }

      // We attach the docUrl to images.
      const finalImages = imageEntries.map((img: any) => {
        const plainName = img.name.replace(/\.[^/.]+$/, "");
        return {
          id: img.id,
          name: img.name,
          url: `/api/dropbox-image?id=${encodeURIComponent(img.id)}`,
          documentUrl: docMap[plainName] || null 
        };
      });

      // Se a pasta não possui imagens, mas possui docs (ex: "Fichas"), retornamos os docs como arquivos
      const finalFiles = finalImages.length > 0 ? finalImages : standaloneDocs;

      return NextResponse.json({ success: true, files: finalFiles });
    } else {
      // Return folders AND any images inside the folder (useful for fetching Covers at the root)
      const folders = response.result.entries
        .filter((entry: any) => entry['.tag'] === 'folder' && !entry.name.match(/^p[áa]ginas$/i))
        .map((entry: any) => ({
          id: entry.id,
          name: entry.name,
          path: entry.path_lower || entry.path_display || (folder ? `${folder}/${entry.name}` : `/${entry.name}`),
          coverUrl: null as string | null
        }));
        
      // Check if there are cover files in this root folder mapping to the volumes
      const coverEntries = response.result.entries.filter((entry: any) => 
        entry['.tag'] === 'file' && entry.name.match(/CAPA V\d+\.(jpg|jpeg|png)$/i)
      );
      
      let coverMap: Record<string, string> = {};
      for (const cover of coverEntries) {
         try {
           const match = cover.name.match(/CAPA V(\d+)/i);
           if (match) {
             const volNum = match[1];
             let link = linkCache.get((cover as any).id) || '';
             
             if (!link) {
               const sharedLinks = await dbx.sharingListSharedLinks({ path: (cover as any).id });
               if (sharedLinks.result.links.length > 0) {
                 link = sharedLinks.result.links[0].url;
               } else {
                 const newLink = await dbx.sharingCreateSharedLinkWithSettings({ path: (cover as any).id });
                 link = newLink.result.url;
               }
               link = link.replace('?dl=0', '?raw=1').replace('www.dropbox.com', 'dl.dropboxusercontent.com');
               linkCache.set((cover as any).id, link);
             }
             coverMap[`VOLUME ${volNum}`] = link;
           }
         } catch(e) {}
      }

      const finalFolders = folders.map((f) => ({
         ...f,
         coverUrl: coverMap[f.name.toUpperCase()] || null
      }));
        
      return NextResponse.json({ success: true, folders: finalFolders });
    }
    
  } catch (error: any) {
    console.error("Dropbox API Error:", error?.error || error, error.stack);
    return NextResponse.json(
      { success: false, error: 'Houve um erro buscando arquivos no Dropbox.', details: error?.error || error.message },
      { status: 500 }
    );
  }
}
