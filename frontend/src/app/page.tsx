import HeroSection from '@/components/HeroSection';
import ModelsSection from '@/components/ModelsSection';
import ServicesSection from '@/components/ServicesSection';
import TeamSection from '@/components/TeamSection';
import TrustSection from '@/components/TrustSection';
import InfoBanner from '@/components/InfoBanner';

export default function Home() {
  return (
    <main>
      <InfoBanner />
      <HeroSection />
      <ModelsSection />
      <ServicesSection />
      <TrustSection />
      <TeamSection />
    </main>
  );
}
