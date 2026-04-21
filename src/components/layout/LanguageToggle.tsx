"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "/flag/english.svg" },
  { code: "ar", name: "العربية", flag: "/flag/arabic.svg" },
  { code: "ku", name: "کوردی", flag: "/flag/kurdish.svg" },
];

export default function LanguageToggle() {
  const { locale, setLocale, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300"
      >
        <img src={currentLang.flag} alt={currentLang.name} className="w-5 h-3.5 object-cover rounded-[2px]" />
        <span className="text-xs font-medium text-white/90 hidden sm:block">{currentLang.name}</span>
        <ChevronDown size={14} className={`text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`absolute top-full mt-2 w-40 glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-[100] ${isRTL ? "left-0" : "right-0"}`}
          >
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLocale(lang.code as any);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/[0.05] ${
                    locale === lang.code ? "text-amber-500 bg-white/[0.02]" : "text-white/70"
                  }`}
                >
                  <img src={lang.flag} alt={lang.name} className="w-5 h-3.5 object-cover rounded-[2px]" />
                  <span className="font-medium">{lang.name}</span>
                  {locale === lang.code && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-500" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
