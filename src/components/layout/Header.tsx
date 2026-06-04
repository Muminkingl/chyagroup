"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Iconify } from "../ui/Iconify";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import LanguageToggle from "./LanguageToggle";

const languageNames: Record<string, string> = {
  en: 'English',
  ar: 'العربية',
  ku: 'کوردی',
};

export const Header = () => {
  const pathname = usePathname();
  const { locale, setLocale, isRTL } = useLanguage();
  const t = translations[locale].nav;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.about, href: "/about" },
    { name: t.company, href: "/ourcompany" },
    { name: t.history, href: "/about#history" },
    { name: t.news, href: "/news" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 pointer-events-none transition-all duration-500">
      <div 
        className={cn(
          "max-w-7xl mx-auto transition-all duration-500 pointer-events-auto",
          isScrolled 
            ? "px-6 py-2.5 mx-4 sm:mx-6 lg:mx-auto mt-4 bg-[#fcfcfb] border border-[#0c1a2e]/10 rounded-full" 
            : "px-4 sm:px-6 lg:px-8 py-7 bg-transparent"
        )}
      >
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 relative z-50 flex-shrink-0" dir="ltr">
            <img src="/logo.svg" alt="Chya Group Logo" className="w-10 h-10 object-contain" />
            <div className="flex flex-col leading-[1.0] items-start select-none">
              <span className="text-[17px] font-black tracking-[0.05em] uppercase text-[#e84040]">CHYA</span>
              <span className="text-[14px] font-bold tracking-[0.12em] uppercase text-[#0a2a56] mt-0.5">GROUP</span>
            </div>
          </Link>

          <nav className={`hidden md:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {navLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className="text-[14px] font-bold text-[#1a365d] hover:text-[#0c1a2e] transition-colors"
                >
                    {link.name}
                </Link>
                ))}
            </div>
            
            <div className="w-px h-5 hidden lg:block bg-[#0c1a2e]/10" />
            
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {/* Language Dropdown */}
                <div className="relative" ref={langRef}>
                <button
                    onClick={() => setIsLangOpen(!isLangOpen)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 bg-white border border-[#0c1a2e]/10 text-[#1a365d] hover:bg-neutral-50 shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                    <Iconify icon="solar:global-linear" width={16} className="text-[#1a365d]" />
                    <span>{languageNames[locale]}</span>
                    <Iconify 
                    icon="solar:alt-arrow-down-linear" 
                    width={14} 
                    className={cn("transition-transform duration-200 text-[#1a365d]", isLangOpen && "rotate-180")} 
                    />
                </button>
                <AnimatePresence>
                    {isLangOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} bg-white rounded-xl shadow-lg border border-black/5 py-1 min-w-[140px] overflow-hidden`}
                    >
                        {(['en', 'ar', 'ku'] as const).map((code) => (
                        <button
                            key={code}
                            onClick={() => { setLocale(code); setIsLangOpen(false); }}
                            className={cn(
                            "w-full px-4 py-2.5 text-[13px] transition-colors",
                            isRTL ? "text-right" : "text-left",
                            locale === code 
                                ? "bg-[#0c1a2e]/5 text-[#0c1a2e] font-bold" 
                                : "text-[#3a4f6a] font-semibold hover:bg-[#0c1a2e]/5"
                            )}
                        >
                            {languageNames[code]}
                        </button>
                        ))}
                    </motion.div>
                    )}
                </AnimatePresence>
                </div>

                <Link href="/contact">
                    <button
                        className={`flex items-center gap-2 bg-[#0c1a2e] hover:bg-[#162d4f] text-white px-6 py-2.5 rounded-full text-[13px] font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                        <span>{t.contact}</span>
                        {isRTL ? (
                            <Iconify icon="solar:arrow-left-linear" width={16} />
                        ) : (
                            <Iconify icon="solar:arrow-right-linear" width={16} />
                        )}
                    </button>
                </Link>
            </div>
          </nav>

          {/* Mobile toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              className="relative z-50 p-2 text-[#0c1a2e] hover:text-[#0c1a2e]/70 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <Iconify icon="solar:close-circle-linear" width={24} /> : <Iconify icon="solar:hamburger-menu-linear" width={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-[#f5f0ea]/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden pointer-events-auto"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-2xl font-bold text-[#0c1a2e] hover:text-[#0c1a2e]/70 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <LanguageToggle />
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <button
              className="px-8 py-3 text-white text-lg font-medium rounded-full bg-[#0c1a2e] shadow-lg"
            >
              {t.contact}
            </button>
          </Link>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
};