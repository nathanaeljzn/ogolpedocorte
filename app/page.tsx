import { Navbar } from '@/components/ui/navbar';
import { Apresentacao } from '@/components/sections/apresentacao';
import { Colecao } from '@/components/sections/colecao';
import { Fotogramas } from '@/components/sections/fotogramas';
import { Videos } from '@/components/sections/videos';
import { Footer } from '@/components/ui/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-zinc-900 selection:text-zinc-50">
      <Navbar />
      <Apresentacao />
      <Colecao />
      <Fotogramas />
      <Videos />
      <Footer />
    </main>
  );
}
