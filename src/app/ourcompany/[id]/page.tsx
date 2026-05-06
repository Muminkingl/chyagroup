import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import SectorDetails from "@/components/company/SectorDetails";

export default async function SectorPage({ params }: { params: { id: string } }) {
  // Await params if using Next.js 15+ (if not, it still works fine to await)
  const resolvedParams = await params;

  return (
    <div className="relative min-h-screen w-full bg-[#faf9f6]">
      <Header />
      <main className="relative z-10">
        <SectorDetails id={resolvedParams.id} />
      </main>
      <Footer />
    </div>
  );
}
