"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";

export const Header = () => {
  const pathname = usePathname();
  const [scrollState, setScrollState] = useState<"hero" | "transition" | "dark">("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        // Home page logic: based on hero height
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
        // About page logic: wait until reaching the leadership section
        const leadershipSection = document.getElementById("leadership");
        const leadershipTop = leadershipSection ? leadershipSection.getBoundingClientRect().top : 400;

        if (leadershipTop > 80) {
          setScrollState("hero");
        } else {
          setScrollState("dark");
        }
      } else {
        // Subpage logic: based on simple scroll threshold
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
    { name: "About Us", href: "/about" },
    { name: "Our History", href: "/about#history" },
    { name: "News", href: "/news" },
  ];

  const LogoIcon = () => (
    <svg className="w-8 h-8 text-neutral-200" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );

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
            <span className="font-bold text-lg tracking-widest uppercase opacity-0 w-0 group-hover:opacity-100 group-hover:w-[160px] transition-all duration-300 overflow-hidden whitespace-nowrap">
              <span className="text-[#ff4d4d]">Chya</span>{" "}
              <span className="text-[#60a5fa]">Group</span>
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
            <Link href="/contact">
              <Button size="sm" variant="primary">
                Contact Us
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 p-2 text-neutral-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
              Contact Us
            </Button>
          </Link>
        </motion.div>
      )}
    </header>
  );
};
