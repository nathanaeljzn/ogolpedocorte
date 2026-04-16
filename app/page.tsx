import { Navbar } from '@/components/ui/navbar';
import { Apresentacao } from '@/components/sections/apresentacao';
import { Colecao } from '@/components/sections/colecao';
import { Fotogramas } from '@/components/sections/fotogramas';
import { Videos } from '@/components/sections/videos';
import { Footer } from '@/components/ui/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4EFE6] text-[#3A2A22] selection:bg-[#3A2A22] selection:text-[#F4EFE6]">
      <Navbar />
      <Apresentacao />
      <Colecao />
      <Fotogramas />
      <Videos />
      <Footer />
    </main>
  );
}
