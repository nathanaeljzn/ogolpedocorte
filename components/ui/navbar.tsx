'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { name: 'Apresentação', href: '/#apresentacao' },
  { name: 'Coleção', href: '/#colecao' },
  { name: 'Fotogramas', href: '/#fotogramas' },
  { name: 'Vídeos', href: '/#videos' },
  { name: 'Solon Ribeiro', href: '/solon-ribeiro' },
  { name: 'Acervo (Álbuns)', href: '/albuns' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-50/95 backdrop-blur-md border-b border-zinc-300/50 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/#apresentacao" className="text-xl font-display font-bold tracking-tighter uppercase transition-colors text-zinc-900">
          O Golpe do Corte
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors text-zinc-800 hover:text-zinc-900"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden transition-colors text-zinc-800 hover:text-zinc-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-zinc-50/95 backdrop-blur-xl border-b border-zinc-300/50 py-4 px-6 flex flex-col gap-4 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-zinc-800 hover:text-zinc-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
