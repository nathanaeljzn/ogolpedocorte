'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export function Apresentacao() {
  return (
    <section id="apresentacao" className="pt-24 pb-20 md:pt-28 md:pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-8 text-[#0E472D]">Apresentação</h2>
            <div className="space-y-6 text-lg text-[#2B734D] leading-relaxed">
              <p>
                Nos anos de 1990, herdei do meu pai uma coleção de mais de trinta mil fotogramas de cinema (décadas de 20 a 60). Esses fotogramas, em geral mostram os atores principais dos filmes e foram cuidadosamente guardados em álbuns feitos para esse fim, contento o nome e o ano da produção, bem como uma legenda com os nomes dos atores. Esse arquivo constitui uma fonte inesgotável de imagens da memória do cinema e um material de trabalho para minhas experimentações.
              </p>
              <p>
                Trabalhando com um acervo constituído fundamentalmente por fotogramas originários do cinema clássico, eu venho deslocando esses fotogramas em diversas configurações para desprogramar o dispositivo clássico e ativá-lo para outras possibilidades de fruição, para terem sua materialidade evidenciada e se abrirem as reconfigurações articuladas pela atuação imaginativa do espectador.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-[#0E472D]/10"
          >
            <Image
              src="https://dl.dropboxusercontent.com/scl/fi/mkg5una1zsfz3r341js7f/01.jpg?rlkey=340chkcwik9ot9lhvawmktr5y&raw=1"
              alt="Apresentação"
              width={800}
              height={1000}
              className="w-full h-auto object-contain"
              unoptimized
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
