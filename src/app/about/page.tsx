"use client";

import { useScrollSpy } from '@/hooks/useScrollSpy';
import Hero from '@/components/about/Hero';
import TeamSection from '@/components/about/TeamSection';
import HistorySection from '@/components/about/HistorySection';
import { clsx } from 'clsx';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';

export default function About() {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale].about;
  
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
    <div className="bg-[#09090b] min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className={clsx(
            "flex flex-col gap-16 relative",
            isRTL ? "lg:flex-row-reverse" : "lg:flex-row"
          )}>
            
            {/* Sticky Sidebar Navigation */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-32 glass-panel rounded-2xl p-6">
                <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-6">
                  {t.nav.title}
                </h3>
                <nav className="flex flex-col gap-4">
                  <a 
                    href="#leadership"
                    onClick={(e) => scrollToSection(e, 'leadership')}
                    className={clsx(
                      "flex items-center gap-3 text-sm transition-all duration-300",
                      activeSection === 'leadership' 
                        ? "text-amber-400 font-medium" 
                        : "text-zinc-400 hover:text-zinc-200",
                      activeSection === 'leadership' && (isRTL ? "-translate-x-2" : "translate-x-2")
                    )}
                  >
                    <div className={clsx(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      activeSection === 'leadership' ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "bg-transparent"
                    )} />
                    {t.nav.leadership}
                  </a>
                  
                  <div className="h-px w-full bg-white/5"></div>
                  
                  <a 
                    href="#history"
                    onClick={(e) => scrollToSection(e, 'history')}
                    className={clsx(
                      "flex items-center gap-3 text-sm transition-all duration-300",
                      activeSection === 'history' 
                        ? "text-amber-400 font-medium" 
                        : "text-zinc-400 hover:text-zinc-200",
                      activeSection === 'history' && (isRTL ? "-translate-x-2" : "translate-x-2")
                    )}
                  >
                    <div className={clsx(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      activeSection === 'history' ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "bg-transparent"
                    )} />
                    {t.nav.history}
                  </a>
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0 flex flex-col gap-32 text-start">
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
