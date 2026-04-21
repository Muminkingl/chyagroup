"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Iconify } from "../ui/Iconify";
import { Button } from "../ui/Button";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import LanguageToggle from "./LanguageToggle";

export const Header = () => {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const t = translations[locale].nav;
  
  const [scrollState, setScrollState] = useState<"hero" | "transition" | "dark">("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        const heroSection = document.querySelector("main > section") as HTMLElement | null;
        const heroBottom = heroSection ? heroSection.getBoundingClientRect().bottom : 600;

        if (heroBottom > 80) {
          setScrollState("hero");
        } else if (heroBottom > -80) {
          setScrollState("transition");
        } else {
          setScrollState("dark");
        }
      } else if (pathname === "/about") {
        const leadershipSection = document.getElementById("leadership");
        const leadershipTop = leadershipSection ? leadershipSection.getBoundingClientRect().top : 400;

        if (leadershipTop > 80) {
          setScrollState("hero");
        } else {
          setScrollState("dark");
        }
      } else {
        if (window.scrollY < 20) {
          setScrollState("hero");
        } else {
          setScrollState("dark");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { name: t.about, href: "/about" },
    { name: t.history, href: "/about#history" },
    { name: t.news, href: "/news" },
  ];

  const headerClass = {
    hero: "bg-transparent py-6",
    transition: "bg-black/60 backdrop-blur-md py-5 border-b border-white/5",
    dark: "bg-black/80 backdrop-blur-md py-4 border-b border-white/10",
  }[scrollState];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${headerClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 relative z-50 group">
            <img src="/logo.svg" alt="Chya Group Logo" className="w-10 h-10 object-contain" />
            <span className={cn(
              "font-bold text-lg tracking-widest uppercase opacity-0 w-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden whitespace-nowrap",
              locale === 'en' ? "group-hover:w-[160px]" : "group-hover:w-[200px]"
            )}>
              {locale === 'en' && (
                <>
                  <span className="text-[#ff4d4d]">Chya</span>{" "}
                  <span className="text-[#60a5fa]">Group</span>
                </>
              )}
              {locale === 'ar' && (
                <>
                  <span className="text-[#60a5fa]">مجموعة</span>{" "}
                  <span className="text-[#ff4d4d]">چیا</span>
                </>
              )}
              {locale === 'ku' && (
                <>
                  <span className="text-[#ff4d4d]">چیا</span>{" "}
                  <span className="text-[#60a5fa]">گرووپ</span>
                </>
              )}
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="w-px h-4 bg-white/10 hidden lg:block" />
            
            <LanguageToggle />

            <Link href="/contact">
              <Button size="sm" variant="primary">
                {t.contact}
              </Button>
            </Link>
          </nav>

          {/* Mobile toggle and Lang */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageToggle />
            <button
              className="relative z-50 p-2 text-neutral-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <Iconify icon="solar:close-circle-linear" width={24} /> : <Iconify icon="solar:hamburger-menu-linear" width={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-2xl font-bold text-neutral-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <Button
              size="lg"
              variant="primary"
            >
              {t.contact}
            </Button>
          </Link>
        </motion.div>
      )}
    </header>
  );
};
