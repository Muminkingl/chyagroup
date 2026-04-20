"use client";

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

export default function ChyaHistorySection() {
  // Using a threshold of 0.3 means the animation triggers when 30% of the section is visible
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3, triggerOnce: true });

  return (
    <section 
      id="history"
      ref={ref} 
      className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#09090b]"
    >
      {/* Background Image with Parallax/Scale effect */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-transform duration-[2000ms] ease-out",
          isVisible ? "scale-100" : "scale-110"
        )}
      >
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Modern City Skyline"
          className="w-full h-full object-cover object-center opacity-50"
        />
        
        {/* Sophisticated Gradient Overlays for depth and text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />

        {/* Fades - These MUST be on top to blend into #09090b perfectly */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#09090b] via-[#09090b]/80 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent z-10" />
      </div>


      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Animated Eyebrow Badge */}
        <div className={cn(
          "inline-flex items-center space-x-2 px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-black/30 backdrop-blur-md transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <iconify-icon icon="solar:buildings-linear" class="text-white/70"></iconify-icon>
          <span className="text-xs font-medium text-white/80 uppercase tracking-widest">Our Legacy</span>
        </div>

        {/* Primary Headline */}
        <h2 className={cn(
          "text-6xl md:text-8xl lg:text-[7rem] font-semibold tracking-tighter text-white leading-[1.05] transition-all duration-1000 delay-150",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          Chya group
          <span className="block mt-2 md:mt-4 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30 text-4xl md:text-6xl lg:text-7xl">
            since 2019
          </span>
        </h2>

        {/* Subtitle / Context */}
        <p className={cn(
          "mt-8 max-w-xl mx-auto text-lg md:text-xl text-white/50 font-light leading-relaxed transition-all duration-1000 delay-300",
           isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          Shaping modern horizons with unparalleled dedication. Discover how our vision evolved into a foundation for tomorrow's infrastructure.
        </p>

        {/* Primary Action Button */}
        <div className={cn(
          "mt-12 transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-medium text-black bg-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] focus:outline-none focus:ring-2 focus:ring-white/50">
            <span className="relative z-10 font-semibold tracking-wide">Read More</span>
            <iconify-icon 
              icon="solar:arrow-right-linear" 
              className="text-lg relative z-10 transition-transform duration-300 group-hover:translate-x-1" 
            />
            {/* Subtle highlight effect on hover inside the button */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </button>
        </div>
      </div>

    </section>
  );
}
