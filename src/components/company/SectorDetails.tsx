"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import { Iconify } from "@/components/ui/Iconify";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const SECTOR_IMAGES: Record<string, string> = {
  "general-trading": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
  "money-exchange": "https://i.postimg.cc/1zkMz6gd/image.png",
  "mobile-tech": "https://i.postimg.cc/JzcBXk2n/image.png",
  "printing": "https://i.postimg.cc/c4H2KR9P/5f2e6a0d-6336-4c92-8c1e-5495307119ee-(1).jpg",
  "online-trading": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop",
};

const SECTOR_EMAILS: Record<string, string[]> = {
  "general-trading": [
    "lamatalmarjan2019@gmail.com",
    "chyaymateen2026@gmail.com",
    "chyaamazon2026@gmail.com"
  ],
  "money-exchange": [
    "chyaexchange2021@gmail.com",
    "chyagold2023@gmail.com",
    "hangawexchange2024@gmail.com",
    "lutkaychya2024@gmail.com",
    "khakisarwar2025@gmail.com",
    "barzychya2025@gmail.com",
    "manfazdibagabyhangaw2025@gmail.com"
  ],
  "mobile-tech": [
    "chyatech2025@gmail.com",
    "chyaphone2026@gmail.com"
  ],
  "printing": [
    "blueprinting2025@gmail.com"
  ],
  "online-trading": [
    "chyatravel2020@gmail.com",
    "kivaluxury2022@gmail.com"
  ]
};

export default function SectorDetails({ id }: { id: string }) {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale];
  
  const activeSection = useScrollSpy(['history', 'president', 'vision', 'branches', 'links'], 200);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const featureItem = t.features.items.find((item) => item.id === id);

  if (!featureItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
        <h1 className="text-2xl text-[#0c1a2e] font-bold">Sector not found</h1>
      </div>
    );
  }

  const bgImage = SECTOR_IMAGES[id] || SECTOR_IMAGES["general-trading"];
  const currentEmails = SECTOR_EMAILS[id] || ["chyagroup2019@gmail.com"];

  const sidebarLinks = [
    { id: 'history', label: 'History' },
    { id: 'president', label: "President's Message" },
    { id: 'vision', label: 'Vision & Mission' },
    { id: 'branches', label: 'Branches & Locations' },
    { id: 'links', label: 'Links' },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
        <div className="absolute inset-0 z-10 bg-[#0c1a2e]/60" />
        <div className="relative z-20 text-center px-6">
          <h1 dir="auto" className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            {featureItem.tag}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-8">
          <Link 
            href="/ourcompany"
            className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold text-[#3a4f6a] hover:text-[#e84040] transition-colors",
              isRTL ? "flex-row-reverse" : ""
            )}
          >
            <Iconify icon={isRTL ? "solar:arrow-right-linear" : "solar:arrow-left-linear"} width={18} />
            Back to Sectors
          </Link>
        </div>

        <div className={cn("flex flex-col lg:flex-row gap-12 lg:gap-20", isRTL ? "lg:flex-row-reverse" : "")}>
          
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-32 bg-[#f4f7fa] rounded-[2rem] p-8 border border-[#0c1a2e]/5 shadow-[0_20px_50px_rgba(12,26,46,0.04)] transition-all duration-500">
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#b91c1c] font-bold mb-8">
                {featureItem.tag}
              </h3>
              <nav className="flex flex-col gap-4">
                {sidebarLinks.map((link, index) => (
                  <React.Fragment key={link.id}>
                    <a 
                      href={`#${link.id}`}
                      onClick={(e) => scrollToSection(e, link.id)}
                      className={cn(
                        "flex items-center gap-3 text-sm transition-all duration-300",
                        activeSection === link.id
                          ? "text-[#0c1a2e] font-bold" 
                          : "text-[#3a4f6a] hover:text-[#0c1a2e]",
                        activeSection === link.id && (isRTL ? "-translate-x-2" : "translate-x-2")
                      )}
                    >
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full transition-colors",
                        activeSection === link.id ? "bg-[#b91c1c] shadow-[0_0_10px_rgba(185,28,28,0.5)]" : "bg-transparent"
                      )} />
                      {link.label}
                    </a>
                    {index < sidebarLinks.length - 1 && (
                      <div className="h-px w-full bg-[#0c1a2e]/5" />
                    )}
                  </React.Fragment>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 flex flex-col gap-24 text-start text-[#0c1a2e] pt-4">
            
            {/* History Section */}
            <section id="history" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <Iconify icon="solar:document-text-bold-duotone" width={32} className="text-[#b91c1c]" />
                <h2 className="text-3xl font-bold">History</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-[16px] leading-relaxed text-[#3a4f6a] font-medium">
                  {t.history.summary}
                </p>
                <p className="text-[16px] leading-relaxed text-[#3a4f6a]">
                  {featureItem.contentBody}
                </p>
                <p className="text-[16px] leading-relaxed text-[#3a4f6a]">
                  We operate across five dynamic sectors, bringing specialized solutions to the market. Our commitment to excellence drives us to continually expand our services and ensure the highest quality in every transaction.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                {featureItem.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-8 text-center border border-[#0c1a2e]/5 shadow-[0_4px_24px_rgba(12,26,46,0.04)] hover:shadow-[0_8px_30px_rgba(12,26,46,0.08)] transition-all duration-300 hover:-translate-y-1">
                    <div className="text-4xl font-extrabold text-[#2563eb] mb-3">{metric.value}</div>
                    <div className="text-[13px] font-bold text-[#0c1a2e] tracking-wider uppercase">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* President's Message */}
            <section id="president" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <Iconify icon="solar:letter-bold-duotone" width={32} className="text-[#b91c1c]" />
                <h2 className="text-3xl font-bold">President's Message</h2>
              </div>
              <p className="text-[16px] leading-relaxed text-[#3a4f6a]">
                We believe in ourselves and are convinced that Nothing is Impossible to stay ahead of competition and of our times. We have always taken pride in ourselves in our services and continuously striving to take it to the next level.
              </p>
            </section>

            {/* Vision & Mission */}
            <section id="vision" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <Iconify icon="solar:target-bold-duotone" width={32} className="text-[#b91c1c]" />
                <h2 className="text-3xl font-bold">Vision & Mission</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-[#0c1a2e] mb-2">Vision</h4>
                  <p className="text-[16px] leading-relaxed text-[#3a4f6a]">
                    Providing high quality products to all over the world.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#0c1a2e] mb-2">Mission</h4>
                  <p className="text-[16px] leading-relaxed text-[#3a4f6a]">
                    We ensure that our products in the market meet the global standards.
                  </p>
                </div>
              </div>
            </section>

            {/* Branches & Locations */}
            <section id="branches" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <Iconify icon="solar:map-point-bold-duotone" width={32} className="text-[#b91c1c]" />
                <h2 className="text-3xl font-bold">Branches & Locations</h2>
              </div>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Headquarters */}
                  <div className="bg-white p-6 rounded-2xl border border-[#0c1a2e]/5 shadow-sm group hover:border-[#b91c1c]/20 transition-colors">
                    <h5 className="font-bold text-[#0c1a2e] mb-3 flex items-center gap-2">
                      <Iconify icon="solar:buildings-bold-duotone" className="text-[#b91c1c]" />
                      Global Headquarters
                    </h5>
                    <p className="text-sm text-[#3a4f6a] leading-relaxed">
                      Runaki Street, Erbil 44001<br />
                      Kurdistan Region, Iraq
                    </p>
                  </div>
                  
                  {/* Local Branches */}
                  <div className="bg-white p-6 rounded-2xl border border-[#0c1a2e]/5 shadow-sm group hover:border-[#b91c1c]/20 transition-colors">
                    <h5 className="font-bold text-[#0c1a2e] mb-3 flex items-center gap-2">
                      <Iconify icon="solar:map-bold-duotone" className="text-[#b91c1c]" />
                      Erbil Branches
                    </h5>
                    <p className="text-sm text-[#3a4f6a] leading-relaxed">
                      Old Bourse, Two-Way Runaki Street,<br />
                      Ankawa Neighborhood, Pirmam Road
                    </p>
                  </div>

                  {/* Soran Branches */}
                  <div className="bg-white p-6 rounded-2xl border border-[#0c1a2e]/5 shadow-sm group hover:border-[#b91c1c]/20 transition-colors">
                    <h5 className="font-bold text-[#0c1a2e] mb-3 flex items-center gap-2">
                      <Iconify icon="solar:map-bold-duotone" className="text-[#b91c1c]" />
                      Soran Region
                    </h5>
                    <p className="text-sm text-[#3a4f6a] leading-relaxed">
                      Soran City Center,<br />
                      Rawanduz Road
                    </p>
                  </div>

                  {/* International Branches */}
                  <div className="bg-white p-6 rounded-2xl border border-[#0c1a2e]/5 shadow-sm group hover:border-[#b91c1c]/20 transition-colors">
                    <h5 className="font-bold text-[#0c1a2e] mb-3 flex items-center gap-2">
                      <Iconify icon="solar:earth-bold-duotone" className="text-[#b91c1c]" />
                      Turkey Branch
                    </h5>
                    <p className="text-sm text-[#3a4f6a] leading-relaxed">
                      Silopi District,<br />
                      Sirnak City, Turkey
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Links */}
            <section id="links" className="scroll-mt-32 mb-24">
              <div className="flex items-center gap-3 mb-8">
                <Iconify icon="solar:link-bold-duotone" width={32} className="text-[#b91c1c]" />
                <h2 className="text-3xl font-bold">Links</h2>
              </div>
              
              <div className="flex flex-col gap-4">
                <a href="#" className="flex items-center justify-between bg-white text-[#0c1a2e] border border-[#0c1a2e]/5 p-5 rounded-2xl group transition-all duration-300 hover:shadow-md hover:border-[#b91c1c]/20">
                  <div className="flex items-center gap-4">
                    <Iconify icon="solar:global-linear" width={24} className="text-[#b91c1c]" />
                    <span className="font-semibold">chyagroup.com/</span>
                  </div>
                  <div className="bg-[#faf9f6] text-[#b91c1c] w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:bg-[#b91c1c] group-hover:text-white">
                    <Iconify icon="solar:arrow-right-up-linear" width={20} />
                  </div>
                </a>

                {currentEmails.map((email, idx) => (
                  <a key={idx} href={`mailto:${email}`} className="flex items-center justify-between bg-white text-[#0c1a2e] border border-[#0c1a2e]/5 p-5 rounded-2xl group transition-all duration-300 hover:shadow-md hover:border-[#b91c1c]/20">
                    <div className="flex items-center gap-4">
                      <Iconify icon="solar:letter-linear" width={24} className="text-[#b91c1c]" />
                      <span className="font-semibold">{email}</span>
                    </div>
                    <div className="bg-[#faf9f6] text-[#b91c1c] w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:bg-[#b91c1c] group-hover:text-white">
                      <Iconify icon="solar:arrow-right-up-linear" width={20} />
                    </div>
                  </a>
                ))}

                <a href="#" className="flex items-center justify-between bg-white text-[#0c1a2e] border border-[#0c1a2e]/5 p-5 rounded-2xl group transition-all duration-300 hover:shadow-md hover:border-[#b91c1c]/20">
                  <div className="flex items-center gap-4">
                    <Iconify icon="mdi:facebook" width={24} className="text-[#b91c1c]" />
                    <span className="font-semibold">facebook.com/chyagroup</span>
                  </div>
                  <div className="bg-[#faf9f6] text-[#b91c1c] w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:bg-[#b91c1c] group-hover:text-white">
                    <Iconify icon="solar:arrow-right-up-linear" width={20} />
                  </div>
                </a>

                <a href="https://www.instagram.com/chyagroup.iq?igsh=MXdrMWo3MWFidmkxaw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-white text-[#0c1a2e] border border-[#0c1a2e]/5 p-5 rounded-2xl group transition-all duration-300 hover:shadow-md hover:border-[#b91c1c]/20">
                  <div className="flex items-center gap-4">
                    <Iconify icon="mdi:instagram" width={24} className="text-[#b91c1c]" />
                    <span className="font-semibold">instagram.com/chyagroup.iq</span>
                  </div>
                  <div className="bg-[#faf9f6] text-[#b91c1c] w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:bg-[#b91c1c] group-hover:text-white">
                    <Iconify icon="solar:arrow-right-up-linear" width={20} />
                  </div>
                </a>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
