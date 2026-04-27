"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Iconify } from "../ui/Iconify";

const languages = [
  { code: "en", name: "EN" },
  { code: "ar", name: "AR" },
  { code: "ku", name: "KU" },
];

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-5">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code as any)}
          className={`text-sm font-bold tracking-widest transition-all duration-300 relative py-1 ${
            locale === lang.code ? "text-white" : "text-white/40 hover:text-white/70"
          }`}
        >
          {lang.name}
          {locale === lang.code && (
            <motion.div
              layoutId="lang-underline"
              className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
