Okay now create a /about page route which si about us and for ui use his `import { useScrollSpy } from '../hooks/useScrollSpy';
import Hero from '../components/about/Hero';
import TeamSection from '../components/about/TeamSection';
import HistorySection from '../components/about/HistorySection';
import { clsx } from 'clsx';

export default function About() {
  // Setup scroll spy for the two main sections
  const activeSection = useScrollSpy(['leadership', 'history'], 200);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-zinc-950">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16 relative">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-32 glass-panel rounded-2xl p-6">
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-6">On this page</h3>
              <nav className="flex flex-col gap-4">
                <a 
                  href="#leadership"
                  onClick={(e) => scrollToSection(e, 'leadership')}
                  className={clsx(
                    "flex items-center gap-3 text-sm transition-all duration-300",
                    activeSection === 'leadership' ? "text-amber-400 font-medium translate-x-2" : "text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  <div className={clsx(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    activeSection === 'leadership' ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "bg-transparent"
                  )} />
                  Ownership Team
                </a>
                
                <div className="h-px w-full bg-zinc-800/50"></div>
                
                <a 
                  href="#history"
                  onClick={(e) => scrollToSection(e, 'history')}
                  className={clsx(
                    "flex items-center gap-3 text-sm transition-all duration-300",
                    activeSection === 'history' ? "text-amber-400 font-medium translate-x-2" : "text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  <div className={clsx(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    activeSection === 'history' ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "bg-transparent"
                  )} />
                  Our History
                </a>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 flex flex-col gap-32">
            <TeamSection id="leadership" />
            <HistorySection id="history" />
          </div>

        </div>
      </div>
    </div>
  );
}`


`export default function Hero() {
  return (
    <div className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
      {/* High-quality contextual background image (urban/corporate architecture) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transform scale-105"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80")',
          backgroundAttachment: 'fixed' // Parallax effect
        }}
      />
      
      {/* Complex gradient overlay to ensure text readability and set the mood */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950"></div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-16">
        <div className="inline-flex items-center gap-2 mb-6">
          <iconify-icon icon="solar:star-fall-bold-duotone" class="text-amber-400 text-xl"></iconify-icon>
          <span className="text-sm font-medium tracking-wide text-zinc-300 uppercase">Discover Our Roots</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-6 drop-shadow-lg">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
          Driven by vision, guided by experience. We are a collective of industry leaders dedicated to shaping the future of global enterprise.
        </p>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-zinc-950 to-transparent z-20"></div>
    </div>
  );
}`

`// Placeholder data for the timeline structure
const historyTimeline = [
  {
    year: "1998",
    title: "Foundation",
    description: "The company was established with a vision to revolutionize the sector, starting with a small but dedicated team of innovators."
  },
  {
    year: "2005",
    title: "Market Expansion",
    description: "Successfully expanded operations globally, establishing key partnerships and opening our first international offices."
  },
  {
    year: "2015",
    title: "Digital Transformation",
    description: "Led the industry in digital adoption, modernizing our infrastructure and creating unprecedented value for stakeholders."
  },
  {
    year: "Present",
    title: "Continuing the Legacy",
    description: "Today, we stand as a leader in our field, driven by the same core values established by our founding members."
  }
];

export default function HistorySection({ id }) {
  return (
    <section id={id} className="scroll-mt-32">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4 flex items-center gap-4">
          <span className="w-8 h-1 bg-gradient-to-r from-zinc-500 to-zinc-300 rounded-full"></span>
          Our History
        </h2>
        <p className="text-zinc-400 max-w-2xl">
          A legacy of excellence built over decades of dedication. We are currently curating our detailed historical timeline.
        </p>
      </div>

      <div className="relative pl-4 md:pl-0">
        {/* Vertical Line */}
        <div className="absolute left-[15px] md:left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-zinc-800 to-transparent transform md:-translate-x-1/2"></div>

        <div className="space-y-12 relative">
          {historyTimeline.map((item, index) => (
            <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] md:left-1/2 top-1.5 md:top-auto w-5 h-5 rounded-full bg-zinc-950 border-2 border-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.3)] transform md:-translate-x-1/2 z-10 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
              </div>

              {/* Content Box */}
              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}>
                <div className="glass-panel p-6 rounded-2xl border border-zinc-800/50 hover:border-zinc-700 transition-colors group">
                  <span className="inline-block px-3 py-1 rounded-full bg-zinc-800/80 text-amber-400 text-xs font-medium mb-3 border border-zinc-700/50">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-medium text-white mb-2 tracking-tight group-hover:text-amber-50 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
              
            </div>
          ))}
        </div>
        
        {/* Placeholder Note */}
        <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800/50 border-dashed text-zinc-500 text-sm">
              <iconify-icon icon="solar:pen-new-square-linear"></iconify-icon>
              Detailed history timeline will be updated soon
            </div>
        </div>
      </div>
    </section>
  );
}
`

`import { clsx } from 'clsx';

export default function TeamCard({ member, featured = false }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-500 hover:border-zinc-700 hover:shadow-2xl hover:shadow-amber-500/5">
      {/* Background Gradient Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
      
      <div className={clsx(
        "relative z-10 flex flex-col h-full",
        featured ? "sm:flex-row items-center" : "flex-col"
      )}>
        
        {/* Image Container */}
        <div className={clsx(
          "overflow-hidden bg-zinc-800",
          featured ? "w-full sm:w-2/5 aspect-square sm:aspect-auto sm:h-64" : "w-full aspect-[4/3]"
        )}>
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover object-top grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          />
        </div>

        {/* Content Container */}
        <div className={clsx(
          "p-6 flex-1 flex flex-col justify-center",
          featured ? "sm:p-8" : ""
        )}>
          <div className="flex items-center gap-2 mb-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out delay-100">
            <iconify-icon icon="solar:buildings-2-bold-duotone" class="text-amber-500"></iconify-icon>
            <span className="text-xs uppercase tracking-wider text-amber-500/80 font-medium">Leadership</span>
          </div>
          
          <h3 className={clsx(
            "font-medium text-white tracking-tight mb-2",
            featured ? "text-2xl md:text-3xl" : "text-xl"
          )}>
            {member.name}
          </h3>
          
          <p className={clsx(
            "text-amber-400/80 font-light",
            featured ? "text-lg" : "text-sm"
          )}>
            {member.role}
          </p>
          
          {/* Subtle separator line that grows on hover */}
          <div className="w-0 h-px bg-gradient-to-r from-amber-500/50 to-transparent mt-6 group-hover:w-full transition-all duration-700 ease-in-out"></div>
        </div>
      </div>
    </div>
  );
}`

`import TeamCard from './TeamCard';

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

export default function TeamSection({ id }) {
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
}`