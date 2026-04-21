import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Iconify } from '@/components/ui/Iconify';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center relative overflow-hidden px-6 pt-20">
        {/* Background Decorative Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none text-start"></div>
        
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 border border-white/10 mb-8 animate-bounce transition-all duration-1000">
            <Iconify icon="solar:ghost-bold-duotone" width={48} className="text-amber-500" />
          </div>
          
          <h1 className="text-8xl md:text-[12rem] font-bold text-white mb-4 tracking-tighter opacity-10 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            404
          </h1>
          
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Lost in the <span className="text-amber-500">Chya</span> universe?
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl font-light mb-12 max-w-lg mx-auto leading-relaxed">
              The page you are looking for has either been moved to another dimension or never existed in ours.
            </p>
            
            <Link 
              href="/"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)] group"
            >
              <span>Back to Civilization</span>
              <Iconify icon="solar:arrow-right-linear" width={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
