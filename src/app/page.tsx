import { AboutSection } from "@/components/AboutSection";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Servicesection } from "@/components/ServiceSection";
import { VideoBanner } from "@/components/VideoBanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <AboutSection />
      <VideoBanner />
      <Servicesection />
      <Footer />
    </>
  );
}
