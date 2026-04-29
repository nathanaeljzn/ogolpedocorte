import { NextResponse } from 'next/server';
import { getDropboxClient } from '@/lib/dropbox';

// Cache in-memory for the lifetime of this server instance
const linkCache = new Map<string, string>();

let activeRequests = 0;
const MAX_CONCURRENT = 5;

async function executeDropboxWithLimit<T>(fn: () => Promise<T>): Promise<T> {
  while (activeRequests >= MAX_CONCURRENT) {
    await new Promise(r => setTimeout(r, 100 + Math.random() * 200)); 
  }
  activeRequests++;
  try {
    let retries = 5;
    while(retries > 0) {
      try {
        return await fn();
      } catch (e: any) {
        if (e?.status === 429 || e?.status >= 500) {
          retries--;
          await new Promise(r => setTimeout(r, 2000 + Math.random() * 1000)); 
        } else {
          throw e;
        }
      }
    }
    return await fn(); // final attempt
  } finally {
    activeRequests--;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const isDoc = searchParams.get('doc') === 'true';
  const isDirect = searchParams.get('direct') === 'true';

  if (!id) {
    return new NextResponse('Missing id', { status: 400 });
  }

  // Check cache first
  const cachedLink = linkCache.get(id);
  if (cachedLink) {
    if (isDirect) {
      return NextResponse.json({ url: cachedLink });
    }
    return NextResponse.redirect(cachedLink, 302);
  }

  try {
    const dbx = getDropboxClient();
    let link = '';
    
    // Concurrency limited execution
    await executeDropboxWithLimit(async () => {
      try {
         // Create shared link directly. If it exists, it throws 409 and we list it.
         const newLink = await dbx.sharingCreateSharedLinkWithSettings({ path: id });
         link = newLink.result.url;
      } catch (error: any) {
         if (error?.status === 409) {
           const sharedLinks = await dbx.sharingListSharedLinks({ path: id });
           if (sharedLinks.result.links.length > 0) {
             link = sharedLinks.result.links[0].url;
           } else {
             throw new Error('Could not get or create link');
           }
         } else {
           throw error;
         }
      }
    });
    
    // Format link to download original raw file
    if (!isDoc || isDirect) {
      link = link.replace('dl=0', 'raw=1')
                 .replace('?dl=0', '?raw=1')
                 .replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    }
               
    linkCache.set(id, link);
    
    if (isDirect) {
      return NextResponse.json({ url: link });
    }
    return NextResponse.redirect(link, 302);
  } catch (error: any) {
    console.error('Error fetching dropbox image:', id, error?.error || error.message || error);
    // Return a 1x1 transparent pixel so the image tag doesn't show broken image if it fails
    return new NextResponse(
      Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
      {
        status: 200,
        headers: { 'Content-Type': 'image/gif' },
      }
    );
  }
}
