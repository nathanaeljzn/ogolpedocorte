import Image from 'next/image';

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-[#B1D8C4]/50 bg-[#F4F9F6] text-[#0E472D]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <h2 className="text-2xl font-display font-bold tracking-tighter uppercase text-[#0E472D]">O Golpe do Corte</h2>
          <p className="text-sm text-[#2B734D]">
            © {new Date().getFullYear()} O Golpe do Corte. Todos os Direitos Reservados.
          </p>
          <p className="text-xs text-[#9B111E] mt-2">
            Visitantes: 1009332
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-8">
          <div className="relative w-[100px] h-[50px]">
            <Image
              src="https://dl.dropboxusercontent.com/scl/fi/k2144todmu43e4ezz3fbl/rumos.png.png?rlkey=dkr6yp3o7djbbvqzpk9t929r6&raw=1"
              alt="Rumos Itaú Cultural"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="relative w-[120px] h-[60px]">
            <Image
              src="https://dl.dropboxusercontent.com/scl/fi/klc0qocyvim65hoa7tfu0/minc.png.png?rlkey=z1oxg2ekldkqfvjih4qut8ww6&raw=1"
              alt="Ministério da Cultura"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="relative w-[120px] h-[60px]">
            <Image
              src="https://dl.dropboxusercontent.com/scl/fi/areisphec2daunasow7cq/rouanet.png.png?rlkey=juy4pg9bjoz3dy0xmz28hd3dp&raw=1"
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
