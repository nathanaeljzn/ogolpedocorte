export type Photo = {
  id: string;
  url: string;
  caption?: string;
  documentUrl?: string;
};

export type Page = {
  id: string;
  title: string;
  photos: Photo[];
};

export type Album = {
  id: string;
  title: string;
  pages: Page[];
};

export type Volume = {
  id: string;
  title: string;
  coverUrl?: string;
  albums: Album[];
};

// Função auxiliar para gerar dados falsos (mock) para visualização inicial
const generateMockPhotos = (count: number, pageId: string): Photo[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `photo-${pageId}-${i + 1}`,
    url: `https://picsum.photos/seed/album-${pageId}-${i + 1}/800/600?grayscale`,
    caption: `Fotograma ${i + 1} - Ator/Cena`,
    // Adicionando um PDF de exemplo para testar o botão de ficha
    documentUrl: i % 2 === 0 ? '/exemplo-ficha.pdf' : undefined,
  }));
};

const generateMockPages = (count: number, albumId: string): Page[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `page-${albumId}-${i + 1}`,
    title: `Página ${i + 1}`,
    photos: generateMockPhotos(Math.floor(Math.random() * 4) + 2, `${albumId}-${i + 1}`), // 2 a 5 fotos por página
  }));
};

const generateMockAlbums = (count: number, volumeId: string): Album[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `album-${volumeId}-${i + 1}`,
    title: `Álbum ${i + 1}`,
    pages: generateMockPages(Math.floor(Math.random() * 5) + 3, `${volumeId}-${i + 1}`), // 3 a 7 páginas por álbum
  }));
};

export const volumesData: Volume[] = [
  {
    id: 'vol-1',
    title: 'Volume 1 (1920-1930)',
    coverUrl: 'https://picsum.photos/seed/vol-1/600/400?grayscale',
    albums: generateMockAlbums(4, 'vol-1'),
  },
  {
    id: 'vol-2',
    title: 'Volume 2 (1930-1940)',
    coverUrl: 'https://picsum.photos/seed/vol-2/600/400?grayscale',
    albums: generateMockAlbums(3, 'vol-2'),
  },
  {
    id: 'vol-3',
    title: 'Volume 3 (1940-1950)',
    coverUrl: 'https://picsum.photos/seed/vol-3/600/400?grayscale',
    albums: generateMockAlbums(5, 'vol-3'),
  },
  {
    id: 'vol-4',
    title: 'Volume 4 (1950-1960)',
    coverUrl: 'https://picsum.photos/seed/vol-4/600/400?grayscale',
    albums: generateMockAlbums(2, 'vol-4'),
  },
  {
    id: 'vol-5',
    title: 'Volume 5 (Cinema Nacional)',
    coverUrl: 'https://picsum.photos/seed/vol-5/600/400?grayscale',
    albums: generateMockAlbums(4, 'vol-5'),
  },
  {
    id: 'vol-6',
    title: 'Volume 6 (Não Catalogados)',
    coverUrl: 'https://picsum.photos/seed/vol-6/600/400?grayscale',
    albums: generateMockAlbums(6, 'vol-6'),
  },
];
