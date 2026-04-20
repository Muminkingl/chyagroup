export default function Hero() {
  return (
    <div className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
      {/* High-quality contextual background image (urban/corporate architecture) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transform scale-105"
        style={{ 
          backgroundImage: 'url("https://aknafalsawary.com/wp-content/uploads/2024/06/Erbil-City.jpg")',
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
}
