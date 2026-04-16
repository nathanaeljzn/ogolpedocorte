'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

export function Colecao() {
  return (
    <section id="colecao" className="py-24 md:py-32 px-6 bg-[#E8DFD0] border-y border-[#C4B29E]/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-8 text-[#3A2A22]">A Coleção</h2>
          <div className="space-y-6 text-lg text-[#6B574B] leading-relaxed">
            <p>
              Manuel Eduardo Pierre Solon começou sua coleção de fotogramas ainda criança, conseguidos no cine são João, em Sobral. Seus álbuns foram aumentando em sua passagem pelo Crato. Já em Fortaleza chegou ao auge quando frequentava as seções dos cines Rex e Diogo.
            </p>
            <p>
              A coleção é resultado de hobby quase obsessivo que começou em 1936. O primeiro fotograma da coleção, Eduardo Solon nunca esquece: “Eu tinha 11 anos e foi Tarzan, o filho da Selva”. Naquela época assistia a todos os filmes, ocorre que para torna-se um colecionador de fotogramas não basta apenas gostar de cinema. Outros pré-requisitos: uma boa dose de paciência e uma outra de abnegação.
            </p>
            <p>
              O acervo conta mais de trinta mil fotogramas de cinema (décadas de 20 a 60) é constituído de 6.000 fotogramas catalogados e 25.000 que ainda não foram catalogados. Fazem parte da coleção, clássicos do cinema como: Judy Garland em O Mágico de Oz, Humphrey Bogart e Ingrid Bergman em Casablanca, Marlon Brando em O Selvagem, e quase mil fotogramas do cinema nacional.
            </p>
          </div>
          <div className="mt-10">
            <Link
              href="/albuns"
              className="inline-flex items-center justify-center h-12 px-8 font-medium text-[#F4EFE6] bg-[#3A2A22] rounded-full hover:bg-[#2C1E16] transition-colors shadow-lg shadow-[#3A2A22]/20"
            >
              Folhear Álbuns
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
