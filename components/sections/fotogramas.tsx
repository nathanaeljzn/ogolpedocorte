'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const FOTOGRAMAS = [
  { id: 1, src: 'https://picsum.photos/seed/frame1/600/400?grayscale' },
  { id: 2, src: 'https://picsum.photos/seed/frame2/600/400?grayscale' },
  { id: 3, src: 'https://picsum.photos/seed/frame3/600/400?grayscale' },
  { id: 4, src: 'https://picsum.photos/seed/frame4/600/400?grayscale' },
  { id: 5, src: 'https://picsum.photos/seed/frame5/600/400?grayscale' },
  { id: 6, src: 'https://picsum.photos/seed/frame6/600/400?grayscale' },
];

export function Fotogramas() {
  return (
    <section id="fotogramas" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 text-[#3A2A22]">Banco de Fotogramas</h2>
          <p className="text-lg text-[#6B574B] max-w-3xl leading-relaxed">
            Pensamos na elaboração do site O Golpe do Corte como um laboratório de um cinema-processo visa impulsionar as potencialidades dos fotogramas para se desvencilharem de seu sentido narrativo inicial e desenvolver um aplicativo para elaboração de um “cinema de edição”.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {FOTOGRAMAS.map((foto, index) => (
            <motion.div
              key={foto.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-[3/2] rounded-xl overflow-hidden bg-[#E8DFD0] group shadow-md"
            >
              <Image
                src={foto.src}
                alt={`Fotograma ${foto.id}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 sepia-[.4] mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[#3A2A22]/10 rounded-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
