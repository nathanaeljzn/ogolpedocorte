import { NextResponse } from 'next/server';
import { fetchImagesFromDropbox } from '@/lib/dropbox';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || ''; // Caminho vazio carrega a RaíZ do App do Dropbox

    const images = await fetchImagesFromDropbox(folder);

    return NextResponse.json({ success: true, images });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Houve um erro buscando imagens no Dropbox.' },
      { status: 500 }
    );
  }
}
