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
  
  // Setup scroll spy for the main sections
  const activeSection = useScrollSpy(['leadership', 'history'], 200);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#faf9f6]">
      <Header />

      <main className="relative z-10 flex-grow">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className={clsx(
            "flex flex-col gap-16 relative",
            isRTL ? "lg:flex-row-reverse" : "lg:flex-row"
          )}>
            
            {/* Sticky Sidebar Navigation */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-32 glass-panel rounded-2xl p-6 border border-[#0c1a2e]/10 bg-white/60 backdrop-blur-md shadow-sm">
                <h3 className="text-[10px] uppercase tracking-widest text-[#3a4f6a] font-bold mb-6">
                  {t.nav.title}
                </h3>
                <nav className="flex flex-col gap-4">
                  <a 
                    href="#leadership"
                    onClick={(e) => scrollToSection(e, 'leadership')}
                    className={clsx(
                      "flex items-center gap-3 text-sm transition-all duration-300",
                      activeSection === 'leadership' 
                        ? "text-[#0c1a2e] font-bold" 
                        : "text-[#3a4f6a] hover:text-[#0c1a2e]",
                      activeSection === 'leadership' && (isRTL ? "-translate-x-2" : "translate-x-2")
                    )}
                  >
                    <div className={clsx(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      activeSection === 'leadership' ? "bg-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "bg-transparent"
                    )} />
                    {t.nav.leadership}
                  </a>
                  
                  <div className="h-px w-full bg-[#0c1a2e]/5"></div>
                  
                  <a 
                    href="#history"
                    onClick={(e) => scrollToSection(e, 'history')}
                    className={clsx(
                      "flex items-center gap-3 text-sm transition-all duration-300",
                      activeSection === 'history' 
                        ? "text-[#0c1a2e] font-bold" 
                        : "text-[#3a4f6a] hover:text-[#0c1a2e]",
                      activeSection === 'history' && (isRTL ? "-translate-x-2" : "translate-x-2")
                    )}
                  >
                    <div className={clsx(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      activeSection === 'history' ? "bg-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "bg-transparent"
                    )} />
                    {t.nav.history}
                  </a>
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0 flex flex-col gap-32 text-start text-[#0c1a2e]">
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
