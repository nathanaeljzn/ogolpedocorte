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

// Aqui o estado ficará vazio até que seja buscado via API no Client-Side
export const volumesData: Volume[] = [];
