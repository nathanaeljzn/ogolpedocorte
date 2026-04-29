import { NextResponse } from 'next/server';
import { getDropboxClient } from '@/lib/dropbox';

// Cache in-memory for the lifetime of this server instance
const linkCache = new Map<string, string>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new NextResponse('Missing id', { status: 400 });
  }

  // Check cache first
  const cachedLink = linkCache.get(id);
  if (cachedLink) {
    return NextResponse.redirect(cachedLink, 302);
  }

  try {
    const dbx = getDropboxClient();
    let link = '';
    
    // First try to list existing shared links. This is faster than creating a new one.
    const sharedLinks = await dbx.sharingListSharedLinks({ path: id });
    if (sharedLinks.result.links.length > 0) {
      link = sharedLinks.result.links[0].url;
    } else {
      const newLink = await dbx.sharingCreateSharedLinkWithSettings({ path: id });
      link = newLink.result.url;
    }
    
    // Format link to download original raw file
    link = link.replace('dl=0', 'raw=1')
               .replace('?dl=0', '?raw=1')
               .replace('www.dropbox.com', 'dl.dropboxusercontent.com');
               
    linkCache.set(id, link);
    
    return NextResponse.redirect(link, 302);
  } catch (error: any) {
    console.error('Error fetching dropbox image:', id, error?.error || error.message || error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
