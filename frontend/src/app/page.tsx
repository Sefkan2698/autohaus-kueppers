import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import ModelsSection from '@/components/ModelsSection';
import ServicesSection from '@/components/ServicesSection';
import TeamSection from '@/components/TeamSection';
import TrustSection from '@/components/TrustSection';
import TrustStrip from '@/components/TrustStrip';
import InfoBanner from '@/components/InfoBanner';
import FoerderungPopup from '@/components/FoerderungPopup';
import FoerderungBanner from '@/components/FoerderungBanner';
import KontaktCTA from '@/components/KontaktCTA';

export const metadata: Metadata = {
  title: 'Autohaus Küppers – Citroën Händler Goch | Neuwagen, Service & DEKRA',
  description:
    'Ihr Citroën Vertragshändler in Goch seit über 65 Jahren. Neuwagen, Vorführwagen, Gebrauchtwagen, Werkstatt, DEKRA Hauptuntersuchung & E-Auto Förderung bis 12.000 €.',
  alternates: { canonical: 'https://www.auto-kueppers.de' },
};

export default function Home() {
  return (
    <main>
      <FoerderungPopup />
      <InfoBanner />
      <HeroSection />
      <TrustStrip />
      <FoerderungBanner />
      <ModelsSection />
      <ServicesSection />
      <TrustSection />
      <TeamSection />
      <KontaktCTA />
    </main>
  );
}
