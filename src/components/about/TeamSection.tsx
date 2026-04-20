import TeamCard from './TeamCard';

const teamData = [
  { 
    name: "Haji Muzafer Al Sarraf", 
    role: "Founder & Honorary Chairman", 
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
    featured: true
  },
  { 
    name: "Ibrahim Haji Muzafer", 
    role: "Chairman of The Board & CEO", 
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80" 
  },
  { 
    name: "Bashir Al Rajih", 
    role: "Member of Board & COO", 
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80" 
  },
  { 
    name: "Ali Naaman Hadad", 
    role: "Member of Board & CMO", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80" 
  },
  { 
    name: "Qasim Ali Othman", 
    role: "General Manager", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" 
  }
];

export default function TeamSection({ id }: { id: string }) {
  // Separate founder for featured layout
  const founder = teamData.find(m => m.featured);
  const board = teamData.filter(m => !m.featured);

  return (
    <section id={id} className="scroll-mt-32">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4 flex items-center gap-4">
          <span className="w-8 h-1 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"></span>
          Ownership Team
        </h2>
        <p className="text-zinc-400 max-w-2xl">
          Meet the visionary leadership driving our strategic direction and operational excellence.
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
