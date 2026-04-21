"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'en' | 'ar' | 'ku';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  locale: Locale;
  direction: Direction;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [direction, setDirection] = useState<Direction>('ltr');

  // Load language from storage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('chya-locale') as Locale;
    if (savedLocale && ['en', 'ar', 'ku'].includes(savedLocale)) {
      setLocale(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    const newDir = (newLocale === 'ar' || newLocale === 'ku') ? 'rtl' : 'ltr';
    setDirection(newDir);
    localStorage.setItem('chya-locale', newLocale);
    
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = newLocale;
  };

  return (
    <LanguageContext.Provider value={{ 
      locale, 
      direction, 
      setLocale, 
      isRTL: direction === 'rtl' 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
