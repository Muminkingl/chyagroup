"use client";
import Link from 'next/link';

export default function LocationSection() {
  return (
    <section className="w-full py-24 bg-[#09090b] relative overflow-hidden">
      {/* Background ambient glow - matching feature section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 items-center">

          <div className="lg:col-span-1 flex flex-col justify-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 w-fit">
              <iconify-icon icon="solar:map-point-linear" class="text-white/70"></iconify-icon>
              <span className="text-xs font-medium text-white/80 uppercase tracking-widest">Global HQ</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
              Visit our headquarters
            </h2>

            <p className="text-white/50 text-lg font-light leading-relaxed mb-8">
              Strategically located in Erbil. Come experience the future of commerce and industry in person.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <iconify-icon icon="solar:buildings-2-linear" class="text-white text-lg" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Erbil Headquarters</h4>
                  <p className="text-white/50 text-sm">Runaki Street, Erbil 44001,<br />Kurdistan Region, Iraq</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <iconify-icon icon="solar:letter-linear" class="text-white text-lg" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email</h4>
                  <a 
                    href="mailto:chyagroup2019@gmail.com" 
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    chyagroup2019@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <iconify-icon icon="solar:phone-linear" class="text-white text-lg" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Phone</h4>
                  <div className="flex flex-col gap-1">
                    <a 
                      href="tel:+9647504798788" 
                      className="text-white/50 text-sm hover:text-white transition-colors"
                    >
                      +964 750 479 8788
                    </a>
                    <a 
                      href="tel:+9647504442688" 
                      className="text-white/50 text-sm hover:text-white transition-colors"
                    >
                      +964 750 444 2688
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-10 px-8 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform w-fit inline-block"
            >
              Contact Us
            </Link>
          </div>

          <div className="lg:col-span-2 relative h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 group bg-white/5">
            <iframe
              title="Chya Group Headquarters Location"
              src="https://maps.google.com/maps?q=Runaki%20street,%20Erbil,%20Iraq&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 transition-opacity duration-500 opacity-80 group-hover:opacity-100 grayscale-[0.9] invert-[0.95] contrast-[1.2] hue-rotate-[180deg]"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
