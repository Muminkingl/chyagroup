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
    <footer className="relative w-full overflow-hidden" style={{ background: '#f5f0ea' }}>
      {/* Top transition glow to bridge from the map section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#f5f0ea] via-[#f5f0ea]/50 to-transparent z-20 pointer-events-none" />
      
      {/* Decorative dot grid — top left */}
      <div className={`absolute top-10 ${isRTL ? 'right-10' : 'left-10'} opacity-[0.15] pointer-events-none`}>
        <div className="grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-[#0c1a2e]" />
          ))}
        </div>
      </div>

      {/* Large watermark logo — bottom right */}
      <div className={`absolute bottom-[-10%] ${isRTL ? 'left-[-5%]' : 'right-[-5%]'} opacity-[0.03] pointer-events-none select-none`}>
        <img src="/logo.svg" alt="" className="w-[400px] h-[400px] object-contain grayscale" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16" dir={isRTL ? 'rtl' : 'ltr'}>
          
          {/* Column 1: Brand & Info */}
          <div className="md:col-span-5 flex flex-col items-start text-start">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <img src="/logo.svg" alt="Chya Group Logo" className="w-12 h-12 object-contain" />
              <div className="flex flex-col leading-none">
                <span className="font-bold text-2xl tracking-tighter uppercase text-[#ff4d4d]">
                  Chya
                </span>
                <span className="font-bold text-2xl tracking-widest uppercase text-[#0c1a2e]">
                  Group
                </span>
              </div>
            </Link>
            
            <p className="text-[15px] text-[#3a4f6a]/70 leading-relaxed max-w-sm mb-10 font-medium">
              {t.footer.description}
            </p>

            <div className="flex flex-col items-start gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0c1a2e] mb-2">Follow Us</span>
              <div className="flex gap-3">
                <Link 
                  href="https://www.instagram.com/chyagroup.iq?igsh=MXdrMWo3MWFidmkxaw%3D%3D&utm_source=qr" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#0c1a2e]/10 flex items-center justify-center text-[#0c1a2e]/60 hover:bg-[#0c1a2e] hover:text-white hover:border-[#0c1a2e] transition-all duration-300"
                >
                  <Iconify icon="ri:instagram-line" width={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="md:col-span-3 flex flex-col items-start text-start">
            <h4 className="text-lg font-bold text-[#0c1a2e] mb-6 relative inline-block">
              {t.footer.company}
              <span className={`absolute bottom-[-8px] ${isRTL ? 'right-0' : 'left-0'} w-6 h-[2px] bg-[#0c1a2e]`} />
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-[15px] font-medium text-[#3a4f6a]/60 hover:text-[#0c1a2e] transition-colors">
                  {t.footer.links.about}
                </Link>
              </li>
              <li>
                <Link href="/about#leadership" className="text-[15px] font-medium text-[#3a4f6a]/60 hover:text-[#0c1a2e] transition-colors">
                  {t.footer.links.teams}
                </Link>
              </li>
              <li>
                <Link href="/about#history" className="text-[15px] font-medium text-[#3a4f6a]/60 hover:text-[#0c1a2e] transition-colors">
                  {t.footer.links.history}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[15px] font-medium text-[#3a4f6a]/60 hover:text-[#0c1a2e] transition-colors">
                  {t.footer.links.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Sector Links */}
          <div className="md:col-span-4 flex flex-col items-start text-start">
            <h4 className="text-lg font-bold text-[#0c1a2e] mb-6 relative inline-block">
              {t.footer.sectors}
              <span className={`absolute bottom-[-8px] ${isRTL ? 'right-0' : 'left-0'} w-6 h-[2px] bg-[#0c1a2e]`} />
            </h4>
            <ul className="space-y-4">
              {sectorNames.map((name, idx) => (
                <li key={idx}>
                  <Link href="/#sectors" className="text-[15px] font-medium text-[#3a4f6a]/60 hover:text-[#0c1a2e] transition-colors">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-[#0c1a2e]/5 flex flex-col md:flex-row justify-between items-center gap-8" dir={isRTL ? 'rtl' : 'ltr'}>
          
          {/* Copyright */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#0c1a2e]/10 flex items-center justify-center">
              <Iconify icon="solar:shield-check-linear" className="text-[#0c1a2e]/40" width={14} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#0c1a2e]/40" dir="ltr">
              &copy; {currentYear} Chya Group. {t.footer.copyright}
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#0c1a2e]/10 flex items-center justify-center">
              <Iconify icon="solar:map-point-linear" className="text-[#0c1a2e]/40" width={14} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#0c1a2e]/40">
              Erbil, Kurdistan Region, Iraq
            </p>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#0c1a2e]/10 flex items-center justify-center">
              <Iconify icon="solar:letter-linear" className="text-[#0c1a2e]/40" width={14} />
            </div>
            <a href="mailto:info@chyagroup.com" className="text-xs font-bold uppercase tracking-widest text-[#0c1a2e]/40 hover:text-[#0c1a2e] transition-colors">
              info@chyagroup.com
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};
