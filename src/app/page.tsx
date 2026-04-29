import { Header } from "@/components/layout/Header";
import HeroSection from "@/components/sections/newhero";
import { Footer } from "@/components/layout/Footer";
import FeatureSection from "@/components/sections/feuture";
import TimelineSectors from "@/components/sections/TimelineSectors";
import ChyaHistorySection from "@/components/sections/history";
import LatestNewsSection from "@/components/sections/news";
import LocationSection from "@/components/sections/location";
import AgentLoop from "@/components/sections/AgentLoop";
import ClientsSection from "@/components/sections/Clients";
import BrandQRs from "@/components/sections/BrandQRs";
import { getLatestPosts } from "@/lib/news_fetch";

export default async function Home() {
  const latestPosts = await getLatestPosts(3);

  return (
    <main className="min-h-screen bg-[#09090b] flex flex-col">
      <Header />
      <div className="bg-[#faf9f6]">
        <HeroSection />
        <ChyaHistorySection />
      </div>

      <div id="sectors">
        <FeatureSection />
        <TimelineSectors />
      </div>

      <AgentLoop />
      
      <ClientsSection />

      <LatestNewsSection posts={latestPosts} />

      <BrandQRs />

      <LocationSection />

      <Footer />
    </main>
  );
}
