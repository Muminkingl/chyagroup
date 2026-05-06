import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import CompanySectors from "@/components/company/CompanySectors";

export default function OurCompanyPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#faf9f6]">
      <Header />
      <main className="relative z-10">
        <CompanySectors />
      </main>
      <Footer />
    </div>
  );
}
