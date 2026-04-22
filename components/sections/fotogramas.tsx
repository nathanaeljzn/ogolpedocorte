'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const FOTOGRAMAS = [
  { id: 1, src: 'https://dl.dropboxusercontent.com/scl/fi/l7k9x3bvq165tj7j7jr6m/1.png?rlkey=s03d5gkgllofjgha5plljezrp&raw=1' },
  { id: 2, src: 'https://dl.dropboxusercontent.com/scl/fi/5231maaic2f0d01acpec5/2.png?rlkey=tme909c2odchqy6o0gxggur4a&raw=1' },
  { id: 3, src: 'https://dl.dropboxusercontent.com/scl/fi/in7rzc6i7q5dv4dwi2r65/3.png?rlkey=v8b4417bfz9vrmxxkzomm4fz3&raw=1' },
  { id: 4, src: 'https://dl.dropboxusercontent.com/scl/fi/rje5vwmwfqndudf8cq8yt/4.png?rlkey=0qlzacre2f610t7k2k60jshxu&raw=1' },
  { id: 5, src: 'https://dl.dropboxusercontent.com/scl/fi/lev6u58ze8oftfl6j9xj6/5.png?rlkey=d3mm4g5dseyy8x0uwuv26dko6&raw=1' },
  { id: 6, src: 'https://dl.dropboxusercontent.com/scl/fi/robmmbiyj79zpj760a099/6.png?rlkey=zt93mmqz45xg55hb3nprre2oo&raw=1' },
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
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 text-[#0E472D]">Banco de Fotogramas</h2>
          <p className="text-lg text-[#2B734D] max-w-3xl leading-relaxed">
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
              className="relative aspect-[3/2] rounded-xl overflow-hidden bg-[#E3F0E9] group shadow-md"
            >
              <Image
                src={foto.src}
                alt={`Fotograma ${foto.id}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 sepia-[.4] mix-blend-multiply"
                referrerPolicy="no-referrer"
                unoptimized
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[#0E472D]/10 rounded-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
