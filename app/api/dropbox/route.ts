import { NextResponse } from 'next/server';
import { getDropboxClient } from '@/lib/dropbox';

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

      const imagesWithLinks = [];
      
      // Processa sequencialmente para evitar Rate Limits agressivos do Dropbox
      for (const entry of imageEntries as any[]) {
        let link = linkCache.get(entry.id) || '';
        
        if (!link) {
          let retries = 3;
          while (retries > 0 && !link) {
            try {
               const sharedLinks = await dbx.sharingListSharedLinks({ path: entry.id });
               if (sharedLinks.result.links.length > 0) {
                 link = sharedLinks.result.links[0].url;
               } else {
                 const newLink = await dbx.sharingCreateSharedLinkWithSettings({ path: entry.id });
                 link = newLink.result.url;
               }
               link = link.replace('?dl=0', '?raw=1').replace('www.dropbox.com', 'dl.dropboxusercontent.com');
               linkCache.set(entry.id, link); // Salva no cache!
            } catch(e: any) {
               console.error("Error getting public link for", entry.name, e?.error || e);
               retries--;
               if (retries > 0) {
                 // Espera 1 segundo antes de tentar de novo em caso de erro/rate limit
                 await new Promise(r => setTimeout(r, 1000));
               }
            }
          }
        }
        
        imagesWithLinks.push({
          id: entry.id,
          name: entry.name,
          url: link, // Pode ficar vazio se falhar todas as tentativas
        });
      }
      
      // Filter pdfs and docs (fichas)
      const docEntries = response.result.entries.filter((entry: any) => 
        entry['.tag'] === 'file' && entry.name.match(/\.(pdf|doc|docx)$/i)
      );
      let docMap: Record<string, string> = {};
      
      const standaloneDocs = [];

      for (const doc of docEntries) {
         let link = linkCache.get((doc as any).id) || '';
         if (!link) {
           let retries = 3;
           while (retries > 0 && !link) {
             try {
               const sharedLinks = await dbx.sharingListSharedLinks({ path: (doc as any).id });
               if (sharedLinks.result.links.length > 0) {
                 link = sharedLinks.result.links[0].url;
               } else {
                 const newLink = await dbx.sharingCreateSharedLinkWithSettings({ path: (doc as any).id });
                 link = newLink.result.url;
               }
               link = link.replace('?dl=0', '?raw=1').replace('www.dropbox.com', 'dl.dropboxusercontent.com');
               linkCache.set((doc as any).id, link);
             } catch(e: any) {
               console.error("Error getting public link for doc", (doc as any).name, e?.error || e);
               retries--;
               if (retries > 0) {
                 await new Promise(r => setTimeout(r, 1000));
               }
             }
           }
         }
         if (link) {
           const plainName = (doc as any).name.replace(/\.[^/.]+$/, "");
           docMap[plainName] = link;
           standaloneDocs.push({
              id: (doc as any).id,
              name: (doc as any).name,
              url: link,
              documentUrl: link,
              isDoc: true
           });
         }
      }

      // We attach the docUrl to images.
      const finalImages = imagesWithLinks.map(img => {
        const plainName = img.name.replace(/\.[^/.]+$/, "");
        return {
          ...img,
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
    console.error("Dropbox API Error:", error?.error || error);
    return NextResponse.json(
      { success: false, error: 'Houve um erro buscando arquivos no Dropbox.' },
      { status: 500 }
    );
  }
}
