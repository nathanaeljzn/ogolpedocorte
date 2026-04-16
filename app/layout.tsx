import type { Metadata } from 'next';
import { Inter, Lexend } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' });

export const metadata: Metadata = {
  title: 'O Golpe do Corte | Solon Ribeiro',
  description: 'Arquivo e experimentações com fotogramas de cinema clássico.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} ${lexend.variable} font-sans bg-[#F4EFE6] text-[#3A2A22] antialiased selection:bg-[#3A2A22] selection:text-[#F4EFE6]`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
