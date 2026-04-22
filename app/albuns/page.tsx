'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronDown, X, ZoomIn, ArrowLeft, ChevronLeft, ZoomOut, Maximize, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { volumesData, Volume, Album, Page, Photo } from '@/lib/data/albums';

export default function AlbunsPage() {
  const [expandedVolume, setExpandedVolume] = useState<string | null>(volumesData[0].id);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(volumesData[0].albums[0]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(volumesData[0].albums[0].pages[0]);
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number | null>(null);

  const handleVolumeClick = (volumeId: string) => {
    setExpandedVolume(expandedVolume === volumeId ? null : volumeId);
  };

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
    setSelectedPage(album.pages[0]);
  };

  const openLightbox = (index: number) => {
    setLightboxPhotoIndex(index);
  };

  const closeLightbox = () => {
    setLightboxPhotoIndex(null);
  };

  const showNextPhoto = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedPage && lightboxPhotoIndex !== null) {
      setLightboxPhotoIndex((prev) => (prev !== null && prev < selectedPage.photos.length - 1 ? prev + 1 : prev));
    }
  }, [selectedPage, lightboxPhotoIndex]);

  const showPrevPhoto = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedPage && lightboxPhotoIndex !== null) {
      setLightboxPhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    }
  }, [selectedPage, lightboxPhotoIndex]);

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

  const currentPhoto = lightboxPhotoIndex !== null && selectedPage ? selectedPage.photos[lightboxPhotoIndex] : null;

  return (
    <div className="min-h-screen bg-[#F4F9F6] text-[#0E472D] flex flex-col md:flex-row">
      {/* Header Mobile */}
      <div className="md:hidden flex items-center p-4 border-b border-[#B1D8C4]/50 bg-[#E3F0E9] sticky top-0 z-40">
        <Link href="/" className="flex items-center text-sm text-[#2B734D] hover:text-[#0E472D] transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Início
        </Link>
      </div>

      {/* Sidebar - Navegação de Volumes e Álbuns */}
      <aside className="w-full md:w-80 border-r border-[#B1D8C4]/50 bg-[#E3F0E9] flex-shrink-0 md:h-screen md:sticky md:top-0 overflow-y-auto custom-scrollbar">
        <div className="p-6 hidden md:block">
          <Link href="/" className="inline-flex items-center text-sm text-[#2B734D] hover:text-[#0E472D] transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
          <h1 className="text-2xl font-display font-bold tracking-tight">Acervo</h1>
          <p className="text-sm text-[#2B734D] mt-2">Navegue pelos volumes e álbuns da coleção.</p>
        </div>

        <nav className="p-4 md:p-6 md:pt-0 space-y-4">
          {volumesData.map((volume) => (
            <div key={volume.id} className="border border-[#B1D8C4]/30 rounded-lg overflow-hidden bg-[#F4F9F6]/50">
              <button
                onClick={() => handleVolumeClick(volume.id)}
                className="w-full flex flex-col p-4 text-left hover:bg-[#B1D8C4]/20 transition-colors"
              >
                {volume.coverUrl && (
                  <div className="w-full aspect-[3/2] relative rounded-md overflow-hidden mb-3 ring-1 ring-[#B1D8C4]/30">
                    <Image
                      src={volume.coverUrl}
                      alt={`Capa do ${volume.title}`}
                      fill
                      className="object-cover sepia-[.2] mix-blend-multiply opacity-90"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-sm text-[#0E472D]">{volume.title}</span>
                  {expandedVolume === volume.id ? (
                    <ChevronDown className="w-4 h-4 text-[#2B734D]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#2B734D]" />
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
                    <div className="p-2 pt-0 space-y-1 bg-[#E3F0E9]/30">
                      {volume.albums.map((album) => (
                        <button
                          key={album.id}
                          onClick={() => handleAlbumClick(album)}
                          className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                            selectedAlbum?.id === album.id
                              ? 'bg-[#9B111E] text-[#F4F9F6] font-medium shadow-md'
                              : 'text-[#2B734D] hover:bg-[#B1D8C4]/20 hover:text-[#0E472D]'
                          }`}
                        >
                          {album.title}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content - Visualizador do Álbum */}
      <main className="flex-1 flex flex-col min-h-[50vh] md:h-screen overflow-hidden bg-[#F4F9F6]">
        {selectedAlbum ? (
          <>
            {/* Header do Álbum */}
            <header className="p-6 border-b border-[#B1D8C4]/50 bg-[#E3F0E9]/50 backdrop-blur-md flex-shrink-0">
              <h2 className="text-2xl font-display font-bold text-[#0E472D]">{selectedAlbum.title}</h2>
              
              {/* Paginação */}
              <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 custom-scrollbar">
                {selectedAlbum.pages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => setSelectedPage(page)}
                    className={`px-4 py-1.5 text-sm rounded-full whitespace-nowrap transition-all ${
                      selectedPage?.id === page.id
                        ? 'bg-[#9B111E] text-[#F4F9F6] ring-1 ring-[#0E472D]/20 shadow-md'
                        : 'bg-transparent text-[#2B734D] hover:text-[#0E472D] hover:bg-[#E3F0E9]'
                    }`}
                  >
                    {page.title}
                  </button>
                ))}
              </div>
            </header>

            {/* Grid de Fotos da Página */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPage?.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                >
                  {selectedPage?.photos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#A4D2B8] cursor-pointer border border-[#B1D8C4]/50 shadow-sm hover:shadow-md transition-shadow"
                      onClick={() => openLightbox(index)}
                    >
                      <Image
                        src={photo.url}
                        alt={photo.caption || 'Fotograma'}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 sepia-[.4] mix-blend-multiply"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-[#052314]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-[#F4F9F6]" />
                      </div>
                      {photo.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#052314]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-sm font-medium text-[#F4F9F6] truncate">{photo.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#2B734D]">
            Selecione um álbum para visualizar.
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
            {/* Top Controls */}
            <div className="absolute top-6 right-6 flex items-center gap-4 z-50" onClick={(e) => e.stopPropagation()}>
              {currentPhoto.documentUrl && (
                <a
                  href={currentPhoto.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#F4F9F6] bg-[#2B734D] hover:bg-[#165c36] rounded-full transition-colors"
                  title="Ver Ficha da Imagem"
                >
                  <FileText className="w-4 h-4" />
                  Ver Ficha
                </a>
              )}
              <button
                className="p-2 text-[#B1D8C4] hover:text-[#F4F9F6] bg-[#0E472D]/50 rounded-full transition-colors"
                onClick={closeLightbox}
                title="Fechar (Esc)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Buttons */}
            {lightboxPhotoIndex !== null && lightboxPhotoIndex > 0 && (
              <button
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-3 text-[#B1D8C4] hover:text-[#F4F9F6] bg-[#0E472D]/50 hover:bg-[#0E472D]/80 rounded-full transition-all z-50"
                onClick={showPrevPhoto}
                title="Anterior (Seta Esquerda)"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {lightboxPhotoIndex !== null && lightboxPhotoIndex < selectedPage.photos.length - 1 && (
              <button
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-3 text-[#B1D8C4] hover:text-[#F4F9F6] bg-[#0E472D]/50 hover:bg-[#0E472D]/80 rounded-full transition-all z-50"
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
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video rounded-lg overflow-hidden ring-1 ring-[#B1D8C4]/20 shadow-2xl bg-[#052314]"
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
                          <button onClick={() => zoomIn()} className="p-1.5 text-[#B1D8C4] hover:text-[#F4F9F6] transition-colors" title="Aumentar Zoom">
                            <ZoomIn className="w-5 h-5" />
                          </button>
                          <button onClick={() => zoomOut()} className="p-1.5 text-[#B1D8C4] hover:text-[#F4F9F6] transition-colors" title="Diminuir Zoom">
                            <ZoomOut className="w-5 h-5" />
                          </button>
                          <button onClick={() => resetTransform()} className="p-1.5 text-[#B1D8C4] hover:text-[#F4F9F6] transition-colors" title="Tamanho Original">
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
                  <p className="text-lg font-medium text-[#F4F9F6] text-center">{currentPhoto.caption}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
