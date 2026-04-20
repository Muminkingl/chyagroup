"use client";

import { cn } from '@/lib/utils';

const newsItems = [
  {
    id: 1,
    title: "Chya Group Announces Global Expansion Phase II",
    date: "Oct 24, 2023",
    category: "Company News",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    excerpt: "Building on our foundational success, we are thrilled to announce the opening of three new regional headquarters across Europe and Asia."
  },
  {
    id: 2,
    title: "Pioneering Sustainable Infrastructure Standards",
    date: "Sep 18, 2023",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800",
    excerpt: "Our latest initiative sets a new benchmark for zero-emission building frameworks, integrating advanced renewable tech directly into the facade."
  },
  {
    id: 3,
    title: "Q3 Insights: Shaping Tomorrow's Skylines",
    date: "Aug 02, 2023",
    category: "Insights",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800",
    excerpt: "An in-depth look at the macroeconomic trends driving the next decade of structural development and urban planning."
  }
];

export default function LatestNewsSection() {
  return (
    <section className="w-full py-24 bg-[#09090b] border-b border-white/5 relative overflow-hidden">
      {/* Background ambient glow - matching feature section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <iconify-icon icon="solar:document-text-linear" class="text-white/70"></iconify-icon>
              <span className="text-xs font-medium text-white/80 uppercase tracking-widest">Press & Updates</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
              Latest news from Chya
            </h2>
          </div>
          
          <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium text-white">
            <span>View All News</span>
            <iconify-icon icon="solar:arrow-right-linear" class="text-lg transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <article 
              key={item.id} 
              className="group flex flex-col rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden hover:bg-white/[0.04] transition-colors"
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 text-xs font-medium bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white/90">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col flex-grow p-6">
                <time className="text-xs text-white/40 mb-3">{item.date}</time>
                <h3 className="text-xl font-medium text-white mb-3 line-clamp-2 group-hover:text-white/80 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed line-clamp-3 mb-6">
                  {item.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5">
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
                    Read article
                    <iconify-icon icon="solar:arrow-right-up-linear" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
