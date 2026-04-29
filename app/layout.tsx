import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'O Golpe do Corte | Solon Ribeiro',
  description: 'Arquivo e experimentações com fotogramas de cinema clássico.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${outfit.variable} font-sans bg-zinc-50 text-zinc-900 antialiased selection:bg-zinc-900 selection:text-zinc-50`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
