import { Navbar } from '@/components/ui/navbar';
import { Apresentacao } from '@/components/sections/apresentacao';
import { Colecao } from '@/components/sections/colecao';
import { Fotogramas } from '@/components/sections/fotogramas';
import { Videos } from '@/components/sections/videos';
import { Footer } from '@/components/ui/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F9F6] text-[#0E472D] selection:bg-[#0E472D] selection:text-[#F4F9F6]">
      <Navbar />
      <Apresentacao />
      <Colecao />
      <Fotogramas />
      <Videos />
      <Footer />
    </main>
  );
}
