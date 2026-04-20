import { Header } from "@/components/layout/Header";
import HeroSection from "@/components/sections/newhero";
import { Footer } from "@/components/layout/Footer";
import FeatureSection from "@/components/sections/feuture";
import ChyaHistorySection from "@/components/sections/history";
import LatestNewsSection from "@/components/sections/news";
import LocationSection from "@/components/sections/location";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] flex flex-col">
      <Header />
      <HeroSection />
      
      <div id="sectors" className="py-24 md:py-32 scroll-mt-20 relative overflow-hidden flex items-center justify-center">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <FeatureSection />
        </div>
      </div>

      <ChyaHistorySection />
      <LatestNewsSection />
      <LocationSection />

      <Footer />
    </main>
  );
}
