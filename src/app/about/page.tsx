"use client";

import { useScrollSpy } from '@/hooks/useScrollSpy';
import Hero from '@/components/about/Hero';
import TeamSection from '@/components/about/TeamSection';
import HistorySection from '@/components/about/HistorySection';
import { clsx } from 'clsx';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function About() {
  // Setup scroll spy for the two main sections
  const activeSection = useScrollSpy(['leadership', 'history'], 200);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex flex-col lg:flex-row gap-16 relative">
            
            {/* Sticky Sidebar Navigation */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-32 glass-panel rounded-2xl p-6">
                <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-6">On this page</h3>
                <nav className="flex flex-col gap-4">
                  <a 
                    href="#leadership"
                    onClick={(e) => scrollToSection(e, 'leadership')}
                    className={clsx(
                      "flex items-center gap-3 text-sm transition-all duration-300",
                      activeSection === 'leadership' ? "text-amber-400 font-medium translate-x-2" : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    <div className={clsx(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      activeSection === 'leadership' ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "bg-transparent"
                    )} />
                    Ownership Team
                  </a>
                  
                  <div className="h-px w-full bg-zinc-800/50"></div>
                  
                  <a 
                    href="#history"
                    onClick={(e) => scrollToSection(e, 'history')}
                    className={clsx(
                      "flex items-center gap-3 text-sm transition-all duration-300",
                      activeSection === 'history' ? "text-amber-400 font-medium translate-x-2" : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    <div className={clsx(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      activeSection === 'history' ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "bg-transparent"
                    )} />
                    Our History
                  </a>
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0 flex flex-col gap-32">
              <TeamSection id="leadership" />
              <HistorySection id="history" />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
