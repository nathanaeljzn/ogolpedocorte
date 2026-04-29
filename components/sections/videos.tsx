'use client';

import { motion } from 'motion/react';

export function Videos() {
  return (
    <section id="videos" className="py-24 md:py-32 px-6 bg-zinc-100 border-y border-zinc-300/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-zinc-900">Vídeos</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 ring-1 ring-zinc-900/20 shadow-2xl shadow-zinc-900/20"
        >
          <iframe
            src="https://www.youtube.com/embed/s3VP51dA334?si=QsHsfhqrr7zhspUE"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full opacity-90"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
