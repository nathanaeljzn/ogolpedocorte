'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronDown, X, ZoomIn, ArrowLeft, ChevronLeft, ZoomOut, Maximize, FileText, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export type Photo = { id: string; url: string; caption?: string; documentUrl?: string; };
export type DBNode = { id: string; name: string; path: string; coverUrl?: string; };

export default function AlbunsPage() {
  const [volumes, setVolumes] = useState<DBNode[]>([]);
  const [expandedVolume, setExpandedVolume] = useState<string | null>(null);
  
  const [albumsByVolume, setAlbumsByVolume] = useState<Record<string, DBNode[]>>({});
  const [selectedAlbum, setSelectedAlbum] = useState<DBNode | null>(null);
  
  const [pagesByAlbum, setPagesByAlbum] = useState<Record<string, DBNode[]>>({});
  const [selectedPage, setSelectedPage] = useState<DBNode | null>(null);
  
  const [photosByPage, setPhotosByPage] = useState<Record<string, Photo[]>>({});
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number | null>(null);

  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingAlbums, setLoadingAlbums] = useState<Record<string, boolean>>({});
  const [loadingPages, setLoadingPages] = useState<Record<string, boolean>>({});
  const [loadingPhotos, setLoadingPhotos] = useState<Record<string, boolean>>({});

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 1. Load root volumes on mount
  useEffect(() => {
    fetch('/api/dropbox?folder=')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Filtrando todas as pastas que começam com "VOL"
          const vols = (data.folders as DBNode[]).filter(f => 
            f.name.toUpperCase().startsWith('VOL')
          );
          vols.sort((a, b) => a.name.localeCompare(b.name));
          
          const volsWithCovers = vols.map(v => ({
             ...v,
             name: v.name.replace(/VOLUME/i, 'Álbum').replace(/\s*\(C\d*\)/i, '').trim(),
          }));
          
          setVolumes(volsWithCovers);

          // Tentar carregar as capas ausentes em background:
          volsWithCovers.forEach(vol => {
             if (!vol.coverUrl) {
                fetch(`/api/dropbox-cover?volumePath=${encodeURIComponent(vol.path)}`)
                  .then(r => r.json())
                  .then(c => {
                     if (c.success && c.coverUrl) {
                        setVolumes(currentVols => 
                          currentVols.map(cv => cv.id === vol.id ? { ...cv, coverUrl: c.coverUrl } : cv)
                        );
                     }
                  }).catch(() => {});
             }
          });
        } else {
          setErrorMsg(data.error || 'Erro ao carregar dados do Dropbox.');
        }
      })
      .catch((e) => {
        console.error(e);
        setErrorMsg('Falha na comunicação com o servidor.');
      })
      .finally(() => setLoadingInitial(false));
  }, []);

  // 2. Load albums when volume expands
  const handleVolumeClick = async (volume: DBNode) => {
    const isExpanding = expandedVolume !== volume.id;
    setExpandedVolume(isExpanding ? volume.id : null);
    
    if (isExpanding && !albumsByVolume[volume.id]) {
      setLoadingAlbums(prev => ({ ...prev, [volume.id]: true }));
      try {
        const res = await fetch(`/api/dropbox?folder=${encodeURIComponent(volume.path)}`);
        const data = await res.json();
        if (data.success) {
          // Filtrando álbuns indesejados
          const ignoredAlbums = [
            'paginas 01 a 50 album 06',
            'album c3',
            'paginas 01 a 50 c',
            'paginas 01 a 50  album 06' // just in case additional spaces
          ];
          
          let albums = (data.folders as DBNode[])
            .filter(a => !ignoredAlbums.some(ignored => a.name.toLowerCase().includes(ignored)))
            .map(a => {
               // Formatar os nomes conforme solicitado (Fotogramas)
               const lowerName = a.name.toLowerCase();
               if (
                 lowerName.includes('fotogramas tratados pra site') || 
                 lowerName.includes('fotogramas album') ||
                 lowerName.includes('fotogramas album c')
               ) {
                  return { ...a, name: 'Fotogramas' };
               }
               if (lowerName === 'filmes' || lowerName === 'fichas') {
                  return { ...a, name: 'Fichas' };
               }
               return a;
            })
            // Sort albums: Fotogramas first, then Fichas, then others
            .sort((a, b) => {
               if (a.name === 'Fotogramas' && b.name !== 'Fotogramas') return -1;
               if (b.name === 'Fotogramas' && a.name !== 'Fotogramas') return 1;
               if (a.name === 'Fichas' && b.name !== 'Fichas') return -1;
               if (b.name === 'Fichas' && a.name !== 'Fichas') return 1;
               return a.name.localeCompare(b.name);
            });
            
          setAlbumsByVolume(prev => ({ ...prev, [volume.id]: albums }));
        }
      } finally {
        setLoadingAlbums(prev => ({ ...prev, [volume.id]: false }));
      }
    }
  };

  // 3. Load pages when album is selected
  const handleAlbumClick = async (album: DBNode) => {
    setSelectedAlbum(album);
    setSelectedPage(null); // reset page
    
    if (!pagesByAlbum[album.id]) {
      setLoadingPages(prev => ({ ...prev, [album.id]: true }));
      try {
        const res = await fetch(`/api/dropbox?folder=${encodeURIComponent(album.path)}`);
        const data = await res.json();
        if (data.success) {
          // Sort numeric pages naturally
          let pages = (data.folders as DBNode[])
            .map(p => {
               const matches = p.name.match(/\d+/g);
               const numStr = matches ? matches[matches.length - 1] : null;
               const num = numStr ? parseInt(numStr, 10) : 0;
               return { ...p, name: num > 0 ? `Página ${num}` : p.name };
            })
            .sort((a, b) => {
               const numA = parseInt(a.name.replace(/\D/g, '')) || 0;
               const numB = parseInt(b.name.replace(/\D/g, '')) || 0;
               return numA - numB;
            });
            
          if (pages.length === 0) {
            pages = [{ ...album, name: 'Arquivos' }];
          }

          setPagesByAlbum(prev => ({ ...prev, [album.id]: pages }));
          if (pages.length > 0) {
            handlePageClick(pages[0]);
          }
        }
      } finally {
        setLoadingPages(prev => ({ ...prev, [album.id]: false }));
      }
    } else if (pagesByAlbum[album.id].length > 0) {
      handlePageClick(pagesByAlbum[album.id][0]);
    }
  };

  // 4. Load photos when page is selected
  const handlePageClick = async (page: DBNode) => {
    setSelectedPage(page);
    
    if (!photosByPage[page.id]) {
      setLoadingPhotos(prev => ({ ...prev, [page.id]: true }));
      try {
        const res = await fetch(`/api/dropbox?folder=${encodeURIComponent(page.path)}&images=true`);
        const data = await res.json();
        if (data.success) {
          const photos = (data.files as any[]).map(f => ({
            id: f.id,
            url: f.url,
            caption: f.name,
            documentUrl: f.documentUrl,
            isDoc: f.isDoc
          }));
          // Sort photos by name (natural sort, numbers first)
          photos.sort((a, b) => {
            const getCaption = (item: any) => item.caption || '';
            const capA = getCaption(a);
            const capB = getCaption(b);
            const isNumA = /^0*\d+\.[a-zA-Z]+$/i.test(capA);
            const isNumB = /^0*\d+\.[a-zA-Z]+$/i.test(capB);
            
            if (isNumA && !isNumB) return -1;
            if (!isNumA && isNumB) return 1;
            return capA.localeCompare(capB, undefined, { numeric: true, sensitivity: 'base' });
          });
          setPhotosByPage(prev => ({ ...prev, [page.id]: photos }));
        }
      } finally {
        setLoadingPhotos(prev => ({ ...prev, [page.id]: false }));
      }
    }
  };

  const openLightbox = (index: number) => setLightboxPhotoIndex(index);
  const closeLightbox = () => setLightboxPhotoIndex(null);

  const activePhotos = selectedPage ? photosByPage[selectedPage.id] || [] : [];
  
  const showNextPhoto = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxPhotoIndex !== null && lightboxPhotoIndex < activePhotos.length - 1) {
      setLightboxPhotoIndex(prev => (prev !== null ? prev + 1 : prev));
    }
  }, [lightboxPhotoIndex, activePhotos.length]);

  const showPrevPhoto = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxPhotoIndex !== null && lightboxPhotoIndex > 0) {
      setLightboxPhotoIndex(prev => (prev !== null ? prev - 1 : prev));
    }
  }, [lightboxPhotoIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNextPhoto();
      if (e.key === 'ArrowLeft') showPrevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhotoIndex, showNextPhoto, showPrevPhoto]);

  const currentPhoto = lightboxPhotoIndex !== null ? activePhotos[lightboxPhotoIndex] : null;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col md:flex-row">
      <div className="md:hidden flex items-center p-4 border-b border-zinc-300/50 bg-zinc-50 sticky top-0 z-40">
        <Link href="/" className="flex items-center text-sm text-zinc-800 hover:text-zinc-900 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Início
        </Link>
      </div>

      <aside className="w-full md:w-80 border-r border-zinc-300/50 bg-zinc-50 flex-shrink-0 md:h-screen md:sticky md:top-0 overflow-y-auto custom-scrollbar">
        <div className="p-6 hidden md:block">
          <Link href="/" className="inline-flex items-center text-sm text-zinc-800 hover:text-zinc-900 transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
          <h1 className="text-2xl font-display font-bold tracking-tight">Acervo</h1>
          <p className="text-sm text-zinc-800 mt-2">Navegue pelos volumes e álbuns da coleção.</p>
        </div>

        <nav className="p-4 md:p-6 md:pt-0 space-y-4">
          {loadingInitial ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-zinc-800" />
            </div>
          ) : errorMsg ? (
            <div className="text-sm text-red-600 text-center bg-red-100 p-4 rounded-lg">
              <p className="font-semibold mb-2">Erro de Acesso</p>
              <p>{errorMsg}</p>
              {errorMsg.includes('Houve um erro buscando') && (
                 <p className="mt-4 text-xs">O token do Dropbox pode estar expirado. Atualize o DROPBOX_ACCESS_TOKEN nas configurações.</p>
              )}
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md w-full font-medium shadow-sm hover:bg-red-700 transition"
              >
                 Recarregar Página
              </button>
            </div>
          ) : volumes.length === 0 ? (
            <div className="text-sm text-zinc-800 text-center">Nenhum volume encontrado no Dropbox.</div>
          ) : (
             volumes.map((volume) => (
              <div key={volume.id} className="border border-zinc-300/30 rounded-lg overflow-hidden bg-zinc-50/50">
                <button
                  onClick={() => handleVolumeClick(volume)}
                  className="w-full flex flex-col p-4 text-left hover:bg-zinc-300/20 transition-colors"
                >
                  {volume.coverUrl && (
                    <div className="w-full aspect-[3/2] relative rounded-md overflow-hidden mb-3 ring-1 ring-[theme(colors.zinc.300)]/30">
                      <Image
                        src={volume.coverUrl}
                        alt={`Capa do ${volume.name}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium text-sm text-zinc-900">{volume.name}</span>
                    {expandedVolume === volume.id ? (
                      <ChevronDown className="w-4 h-4 text-zinc-800" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-zinc-800" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedVolume === volume.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-2 pt-0 space-y-1 bg-zinc-100/30">
                        {loadingAlbums[volume.id] ? (
                           <div className="flex justify-center py-4"><Loader2 className="w-4 h-4 animate-spin text-zinc-800" /></div>
                        ) : albumsByVolume[volume.id]?.length === 0 ? (
                           <div className="px-4 py-2 text-xs text-zinc-800">Vazio</div>
                        ) : (
                           albumsByVolume[volume.id]?.map((album) => (
                            <button
                              key={album.id}
                              onClick={() => handleAlbumClick(album)}
                              className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                                selectedAlbum?.id === album.id
                                  ? 'bg-[#9B111E] text-zinc-50 font-medium shadow-md'
                                  : 'text-zinc-800 hover:bg-zinc-300/20 hover:text-zinc-900'
                              }`}
                            >
                              {album.name}
                            </button>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-h-[50vh] md:h-screen overflow-hidden bg-zinc-50">
        {selectedAlbum ? (
          <>
            <header className="p-6 border-b border-zinc-300/50 bg-zinc-50/80 backdrop-blur-md flex-shrink-0 z-10 sticky top-0">
              <h2 className="text-2xl font-display font-bold text-zinc-900">{selectedAlbum.name}</h2>
              
              {!(pagesByAlbum[selectedAlbum.id]?.length === 1 && pagesByAlbum[selectedAlbum.id]?.[0].name === 'Arquivos') && (
                <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 custom-scrollbar">
                  {loadingPages[selectedAlbum.id] ? (
                    <Loader2 className="w-5 h-5 animate-spin text-zinc-800" />
                  ) : (
                    pagesByAlbum[selectedAlbum.id]?.map((page) => (
                      <button
                        key={page.id}
                        onClick={() => handlePageClick(page)}
                        className={`px-4 py-1.5 text-sm rounded-full whitespace-nowrap transition-all ${
                          selectedPage?.id === page.id
                            ? 'bg-[#9B111E] text-zinc-50 ring-1 ring-zinc-900/20 shadow-md'
                            : 'bg-transparent text-zinc-800 hover:text-zinc-900 border border-zinc-300/50 hover:bg-zinc-100'
                        }`}
                      >
                        {page.name}
                      </button>
                    ))
                  )}
                </div>
              )}
            </header>

            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative">
              {selectedPage && loadingPhotos[selectedPage.id] ? (
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-zinc-800" />
                 </div>
              ) : selectedPage && activePhotos.length === 0 ? (
                 <div className="absolute inset-0 flex items-center justify-center text-zinc-800">
                    Nenhum conteúdo encontrado nesta pasta.
                 </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPage?.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                  >
                    {activePhotos.map((photo, index) => {
                      const isPdfDoc = photo.url && (photo as any).isDoc;
                      return (
                      <div
                        key={photo.id}
                        className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#A4D2B8] cursor-pointer border border-zinc-300/50 shadow-sm hover:shadow-md transition-shadow"
                        onClick={() => {
                           if (isPdfDoc) window.open(photo.url, '_blank');
                           else openLightbox(index);
                        }}
                      >
                        {isPdfDoc ? (
                           <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 text-zinc-900">
                             <FileText className="w-16 h-16 mb-4 text-zinc-800" />
                             <span className="font-medium text-center px-4 break-words truncate max-w-full">{photo.caption}</span>
                           </div>
                        ) : (
                          <>
                            <Image
                              src={photo.url}
                              alt={photo.caption || 'Fotograma'}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-[#052314]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <ZoomIn className="w-8 h-8 text-zinc-50" />
                            </div>
                            {photo.caption && (
                              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#052314]/90 to-transparent flex items-center justify-between">
                                <p className="text-sm font-medium text-zinc-50 truncate pr-2">{photo.caption}</p>
                                {photo.documentUrl && <FileText className="w-4 h-4 text-zinc-50 flex-shrink-0" />}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )})}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-zinc-800">
            {volumes.length > 0 ? "Selecione um álbum para visualizar os fotogramas." : ""}
          </div>
        )}
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {currentPhoto && selectedPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#052314]/95 backdrop-blur-sm p-4 md:p-10"
            onClick={closeLightbox}
          >
            <div className="absolute top-6 right-6 flex items-center gap-4 z-50" onClick={(e) => e.stopPropagation()}>
              {currentPhoto.documentUrl && (
                <a
                  href={currentPhoto.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-50 bg-zinc-800 hover:bg-[#165c36] rounded-full transition-colors"
                  title="Ver Ficha da Imagem"
                >
                  <FileText className="w-4 h-4" />
                  Ver Ficha
                </a>
              )}
              <button
                className="p-2 text-zinc-300 hover:text-zinc-50 bg-zinc-900/50 rounded-full transition-colors"
                onClick={closeLightbox}
                title="Fechar (Esc)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {lightboxPhotoIndex !== null && lightboxPhotoIndex > 0 && (
              <button
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-3 text-zinc-300 hover:text-zinc-50 bg-zinc-900/50 hover:bg-zinc-900/80 rounded-full transition-all z-50"
                onClick={showPrevPhoto}
                title="Anterior (Seta Esquerda)"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {lightboxPhotoIndex !== null && lightboxPhotoIndex < activePhotos.length - 1 && (
              <button
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-3 text-zinc-300 hover:text-zinc-50 bg-zinc-900/50 hover:bg-zinc-900/80 rounded-full transition-all z-50"
                onClick={showNextPhoto}
                title="Próxima (Seta Direita)"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video rounded-lg overflow-hidden ring-1 ring-[theme(colors.zinc.300)]/20 shadow-2xl bg-[#052314]"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhoto.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full"
                >
                  <TransformWrapper
                    initialScale={1}
                    minScale={0.5}
                    maxScale={4}
                    centerOnInit={true}
                    wheel={{ step: 0.1 }}
                  >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                      <>
                        <div className="absolute top-4 left-4 flex items-center gap-2 z-50 bg-[#052314]/60 p-2 rounded-lg backdrop-blur-sm">
                          <button onClick={() => zoomIn()} className="p-1.5 text-zinc-300 hover:text-zinc-50 transition-colors" title="Aumentar Zoom">
                            <ZoomIn className="w-5 h-5" />
                          </button>
                          <button onClick={() => zoomOut()} className="p-1.5 text-zinc-300 hover:text-zinc-50 transition-colors" title="Diminuir Zoom">
                            <ZoomOut className="w-5 h-5" />
                          </button>
                          <button onClick={() => resetTransform()} className="p-1.5 text-zinc-300 hover:text-zinc-50 transition-colors" title="Tamanho Original">
                            <Maximize className="w-5 h-5" />
                          </button>
                        </div>
                        <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                          <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                              src={currentPhoto.url}
                              alt={currentPhoto.caption || 'Fotograma ampliado'}
                              fill
                              className="object-contain"
                              referrerPolicy="no-referrer"
                              draggable={false}
                              unoptimized
                            />
                          </div>
                        </TransformComponent>
                      </>
                    )}
                  </TransformWrapper>
                </motion.div>
              </AnimatePresence>

              {currentPhoto.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#052314] via-[#052314]/80 to-transparent pointer-events-none z-40">
                  <p className="text-lg font-medium text-zinc-50 text-center">{currentPhoto.caption}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
