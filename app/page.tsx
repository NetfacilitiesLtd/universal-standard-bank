import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import MobileBanking from "@/components/MobileBanking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <WhyChooseUs />
      <MobileBanking />
      <Footer />
    </main>
  );
}