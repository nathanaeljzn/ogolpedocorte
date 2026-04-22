import { NextResponse } from 'next/server';
import { getDropboxClient } from '@/lib/dropbox';

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

      const imagesWithLinks = await Promise.all(
        imageEntries.map(async (entry: any) => {
          let link = '';
          try {
             const sharedLinks = await dbx.sharingListSharedLinks({ path: entry.id });
             if (sharedLinks.result.links.length > 0) {
               link = sharedLinks.result.links[0].url;
             } else {
               const newLink = await dbx.sharingCreateSharedLinkWithSettings({ path: entry.id });
               link = newLink.result.url;
             }
             link = link.replace('?dl=0', '?raw=1').replace('www.dropbox.com', 'dl.dropboxusercontent.com');
          } catch(e) {
             console.error("Error getting public link for", entry.name);
          }
          return {
            id: entry.id,
            name: entry.name,
            url: link,
          };
        })
      );
      
      // Filter pdfs (fichas)
      const pdfEntries = response.result.entries.filter((entry: any) => 
        entry['.tag'] === 'file' && entry.name.match(/\.(pdf)$/i)
      );
      let pdfMap: Record<string, string> = {};
      
      // Match PDF map if they exist for specific images
      for (const pdf of pdfEntries) {
         try {
           const sharedLinks = await dbx.sharingListSharedLinks({ path: (pdf as any).id });
           let link = '';
           if (sharedLinks.result.links.length > 0) {
             link = sharedLinks.result.links[0].url;
           } else {
             const newLink = await dbx.sharingCreateSharedLinkWithSettings({ path: (pdf as any).id });
             link = newLink.result.url;
           }
           pdfMap[(pdf as any).name.replace('.pdf', '')] = link.replace('?dl=0', '?raw=1').replace('www.dropbox.com', 'dl.dropboxusercontent.com');
         } catch(e) {}
      }

      const finalImages = imagesWithLinks.map(img => ({
        ...img,
        documentUrl: pdfMap[img.name.replace(/\.[^/.]+$/, "")] || null // Match PDF with same name
      }));

      return NextResponse.json({ success: true, files: finalImages });
    } else {
      // Return folders AND any images inside the folder (useful for fetching Covers at the root)
      const folders = response.result.entries
        .filter((entry: any) => entry['.tag'] === 'folder')
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
             const sharedLinks = await dbx.sharingListSharedLinks({ path: (cover as any).id });
             let link = '';
             if (sharedLinks.result.links.length > 0) {
               link = sharedLinks.result.links[0].url;
             } else {
               const newLink = await dbx.sharingCreateSharedLinkWithSettings({ path: (cover as any).id });
               link = newLink.result.url;
             }
             coverMap[`VOLUME ${volNum}`] = link.replace('?dl=0', '?raw=1').replace('www.dropbox.com', 'dl.dropboxusercontent.com');
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
