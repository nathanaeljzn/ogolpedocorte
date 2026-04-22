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
             // Getting temp link
             const tempResp = await dbx.filesGetTemporaryLink({ path: entry.id });
             link = tempResp.result.link;
          } catch(e) {
             console.error("Error getting temp link for", entry.name);
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
           const tempResp = await dbx.filesGetTemporaryLink({ path: (pdf as any).id });
           pdfMap[(pdf as any).name.replace('.pdf', '')] = tempResp.result.link;
         } catch(e) {}
      }

      const finalImages = imagesWithLinks.map(img => ({
        ...img,
        documentUrl: pdfMap[img.name.replace(/\.[^/.]+$/, "")] || null // Match PDF with same name
      }));

      return NextResponse.json({ success: true, files: finalImages });
    } else {
      // Just returning the folders
      const folders = response.result.entries
        .filter((entry: any) => entry['.tag'] === 'folder')
        .map((entry: any) => ({
          id: entry.id,
          name: entry.name,
          path: entry.path_lower || entry.path_display || `/${entry.name}`,
        }));
        
      return NextResponse.json({ success: true, folders });
    }
    
  } catch (error: any) {
    console.error("Dropbox API Error:", error?.error || error);
    return NextResponse.json(
      { success: false, error: 'Houve um erro buscando arquivos no Dropbox.' },
      { status: 500 }
    );
  }
}
