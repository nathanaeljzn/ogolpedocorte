import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';

const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' });

export const metadata: Metadata = {
  title: 'O Golpe do Corte | Solon Ribeiro',
  description: 'Arquivo e experimentações com fotogramas de cinema clássico.',
};

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${lexend.variable} font-sans bg-[#F4F9F6] text-[#0E472D] antialiased selection:bg-[#0E472D] selection:text-[#F4F9F6]`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
