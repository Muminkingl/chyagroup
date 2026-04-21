"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';

import { Iconify } from '../ui/Iconify';


export const Footer = () => {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale];
  const currentYear = new Date().getFullYear();

  // Get sector names from features items for consistency
  const sectorNames = t.features.items.map(item => item.tag);

  return (
    <footer className="bg-[#09090b] text-neutral-400 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-1 text-start">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img src="/logo.svg" alt="Chya Group Logo" className="w-10 h-10 object-contain" />
              <span className="font-bold text-2xl tracking-widest uppercase flex gap-2">
                {locale === 'en' && (
                  <>
                    <span className="text-[#ff4d4d]">Chya</span>
                    <span className="text-[#60a5fa]">Group</span>
                  </>
                )}
                {locale === 'ar' && (
                  <>
                    <span className="text-[#60a5fa]">مجموعة</span>
                    <span className="text-[#ff4d4d]">چیا</span>
                  </>
                )}
                {locale === 'ku' && (
                  <>
                    <span className="text-[#ff4d4d]">چیا</span>
                    <span className="text-[#60a5fa]">گرووپ</span>
                  </>
                )}
              </span>
            </Link>
            <p className="text-sm leading-6 mb-6 font-light">
              {t.footer.description}
            </p>
            <div className="flex gap-4">
              <Link 
                href="https://www.instagram.com/chyagroup.iq?igsh=MXdrMWo3MWFidmkxaw%3D%3D&utm_source=qr" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <Iconify icon="ri:instagram-line" width={20} />
              </Link>
            </div>
          </div>

          {/* Links: Company */}
          <div className="text-start">
            <h4 className="text-white font-semibold mb-4 tracking-tight">{t.footer.company}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors font-light">{t.footer.links.about}</Link></li>
              <li><Link href="/about#leadership" className="hover:text-white transition-colors font-light">{t.footer.links.teams}</Link></li>
              <li><Link href="/about#history" className="hover:text-white transition-colors font-light">{t.footer.links.history}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors font-light">{t.footer.links.contact}</Link></li>
            </ul>
          </div>

          {/* Links: Sectors */}
          <div className="text-start">
            <h4 className="text-white font-semibold mb-4 tracking-tight">{t.footer.sectors}</h4>
            <ul className="space-y-3 text-sm">
              {sectorNames.map((name, idx) => (
                <li key={idx}>
                  <Link href="/#sectors" className="hover:text-white transition-colors font-light">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex justify-center items-center text-[10px] text-center tracking-widest uppercase opacity-40">
          <p dir="ltr">&copy; {currentYear} Chya Group. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

