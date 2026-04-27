"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import { Iconify } from '@/components/ui/Iconify';

export default function LocationSection() {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale].location;

  return (
    <section className="w-full py-24 md:py-32 relative overflow-hidden" style={{ background: '#f5f0ea' }}>
      {/* Decorative arc grid — top right corner */}
      <svg
        className={`absolute top-0 ${isRTL ? 'left-0 scale-x-[-1]' : 'right-0'} w-[400px] h-[400px] opacity-[0.06] pointer-events-none z-0`}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[80, 120, 160, 200, 240, 280, 320].map((r) => (
          <circle key={r} cx="300" cy="0" r={r} stroke="#0c1a2e" strokeWidth="0.8" />
        ))}
      </svg>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className={`grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-center ${isRTL ? 'direction-rtl' : ''}`}>

          {/* Left — Content */}
          <div className={`flex flex-col justify-center ${isRTL ? 'text-right' : 'text-left'}`}>
            {/* Eyebrow */}
            <div className={`inline-flex items-center gap-2 mb-8 ${isRTL ? 'flex-row-reverse self-end' : 'self-start'}`}>
              <Iconify icon="solar:globus-linear" className="w-4 h-4 text-[#0c1a2e]/50" />
              <span className="text-xs font-semibold text-[#0c1a2e]/50 uppercase tracking-[0.2em]">{t.eyebrow}</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-[3.8rem] font-bold tracking-tight text-[#0c1a2e] leading-[1.05] mb-6">
              {t.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="block font-light italic text-[#0c1a2e]/50">
                {t.title.split(' ').slice(-1)}
              </span>
            </h2>

            {/* Description */}
            <p className="text-[15px] text-[#3a4f6a]/70 leading-relaxed max-w-sm mb-12">
              {t.description}
            </p>

            {/* Contact info items */}
            <div className="space-y-7 mb-12">
              {/* Address */}
              <div className={`flex items-start gap-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-[#0c1a2e]/[0.04] border border-[#0c1a2e]/10 flex items-center justify-center flex-shrink-0">
                  <Iconify icon="solar:buildings-2-linear" className="text-[#0c1a2e]/60 text-lg" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h4 className="text-base font-bold text-[#0c1a2e] mb-1">{t.hqTitle}</h4>
                  <p className="text-[15px] font-semibold text-[#3a4f6a]/80 leading-relaxed">{t.hqAddress}</p>
                </div>
              </div>

              {/* Email */}
              <div className={`flex items-start gap-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-[#0c1a2e]/[0.04] border border-[#0c1a2e]/10 flex items-center justify-center flex-shrink-0">
                  <Iconify icon="solar:letter-linear" className="text-[#0c1a2e]/60 text-lg" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h4 className="text-base font-bold text-[#0c1a2e] mb-1">{t.email}</h4>
                  <a
                    href="mailto:chyagroup2019@gmail.com"
                    className="text-[15px] font-semibold text-[#3a4f6a]/80 hover:text-[#0c1a2e] transition-colors"
                  >
                    chyagroup2019@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className={`flex items-start gap-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-[#0c1a2e]/[0.04] border border-[#0c1a2e]/10 flex items-center justify-center flex-shrink-0">
                  <Iconify icon="solar:phone-linear" className="text-[#0c1a2e]/60 text-lg" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h4 className="text-base font-bold text-[#0c1a2e] mb-1">{t.phone}</h4>
                  <div className="flex flex-col gap-1">
                    <a
                      href="tel:+9647504798788"
                      className="text-[15px] font-bold text-[#3a4f6a]/80 hover:text-[#0c1a2e] transition-colors"
                      dir="ltr"
                    >
                      +964 750 479 8788
                    </a>
                    <a
                      href="tel:+9647504442688"
                      className="text-[15px] font-bold text-[#3a4f6a]/80 hover:text-[#0c1a2e] transition-colors"
                      dir="ltr"
                    >
                      +964 750 444 2688
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className={`group inline-flex items-center gap-2 bg-[#0c1a2e] text-white font-semibold h-[48px] rounded-full ps-7 pe-6 text-sm hover:bg-[#162d4f] transition-all duration-300 shadow-sm hover:shadow-md w-fit ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span className="text-nowrap">{t.contactBtn}</span>
              {isRTL ? (
                <Iconify icon="solar:arrow-left-linear" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              ) : (
                <Iconify icon="solar:arrow-right-linear" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              )}
            </Link>
          </div>

          {/* Right — Map */}
          <div className="relative h-[450px] sm:h-[550px] lg:h-[620px] w-full rounded-[2rem] overflow-hidden group shadow-2xl shadow-[#0c1a2e]/5 border border-[#0c1a2e]/5">
            <iframe
              title="Chya Group Headquarters Location"
              src="https://maps.google.com/maps?q=Runaki%20street,%20Erbil,%20Iraq&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 transition-opacity duration-500 opacity-95 group-hover:opacity-100 sepia-[0.1] saturate-[0.9] contrast-[1.05]"
            ></iframe>
            {/* Overlay to catch clicks and handle zoom properly if needed, but here we just use it for the border */}
            <div className="absolute inset-0 pointer-events-none rounded-[2rem] ring-1 ring-inset ring-[#0c1a2e]/10"></div>
          </div>

        </div>
      </div>

      {/* Bottom transition "glow" to eliminate hard cut before footer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f5f0ea] via-[#f5f0ea]/50 to-transparent z-20 pointer-events-none" />
      <div className="absolute -bottom-px left-0 right-0 h-px bg-[#0c1a2e]/5 z-30" />
    </section>
  );
}
