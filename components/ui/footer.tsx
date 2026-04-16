import Image from 'next/image';

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-[#C4B29E]/50 bg-[#F4EFE6] text-[#3A2A22]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <h2 className="text-2xl font-display font-bold tracking-tighter uppercase text-[#3A2A22]">O Golpe do Corte</h2>
          <p className="text-sm text-[#6B574B]">
            © {new Date().getFullYear()} O Golpe do Corte. Todos os Direitos Reservados.
          </p>
          <p className="text-xs text-[#8D7B68] mt-2">
            Visitantes: 1009332
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-8">
          <div className="relative w-[100px] h-[50px]">
            <Image
              src="/rumos.png"
              alt="Rumos Itaú Cultural"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="relative w-[120px] h-[60px]">
            <Image
              src="/minc.png"
              alt="Ministério da Cultura"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="relative w-[120px] h-[60px]">
            <Image
              src="/rouanet.png"
              alt="Lei Rouanet"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
