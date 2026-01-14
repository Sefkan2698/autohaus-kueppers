import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import TrustSection from '@/components/TrustSection';
import InfoBanner from '@/components/InfoBanner';

export default function Home() {
  return (
    <main>
      <InfoBanner />
      <HeroSection />
      <ServicesSection />
      <TrustSection />
    </main>
  );
}