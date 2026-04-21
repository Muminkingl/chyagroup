"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);


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
                <InstagramIcon className="w-5 h-5" />
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

