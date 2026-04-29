"use client";

import TeamCard from './TeamCard';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';

export default function TeamSection({ id }: { id: string }) {
  const { locale } = useLanguage();
  const t = translations[locale].about.team;

  // Map the dictionary members to an array for easier rendering
  const teamData = [
    { 
      name: t.members.haji, 
      role: t.members.hajiRole, 
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
      featured: true
    },
    { 
      name: t.members.ibrahim, 
      role: t.members.ibrahimRole, 
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80" 
    },
    { 
      name: t.members.bashir, 
      role: t.members.bashirRole, 
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80" 
    },
    { 
      name: t.members.ali, 
      role: t.members.aliRole, 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80" 
    },
    { 
      name: t.members.qasim, 
      role: t.members.qasimRole, 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" 
    }
  ];

  // Separate founder for featured layout
  const founder = teamData.find(m => m.featured);
  const board = teamData.filter(m => !m.featured);

  return (
    <section id={id} className="scroll-mt-32">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0c1a2e] mb-4 flex items-center gap-4">
          <span className="w-8 h-[2px] bg-[#3b82f6]"></span>
          {t.title}
        </h2>
        <p className="text-[#3a4f6a] max-w-2xl text-lg leading-relaxed font-medium">
          {t.description}
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Featured Founder Card */}
        {founder && (
          <div className="w-full lg:w-2/3">
            <TeamCard member={founder} featured={true} />
          </div>
        )}

        {/* Rest of the board grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {board.map((member, idx) => (
            <TeamCard key={idx} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
