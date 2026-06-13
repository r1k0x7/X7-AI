import { HeroSection } from "@/components/landing/hero-section";
import { StatsSection } from "@/components/landing/stats-section";
import { AIShowcase } from "@/components/landing/ai-showcase";
import { FeaturesSection } from "@/components/landing/features-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { ParticleBackground } from "@/components/landing/particle-background";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-cyber-dark">
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AIShowcase />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
