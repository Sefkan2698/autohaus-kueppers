import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Karriere – Jobs bei Autohaus Küppers Goch',
  description:
    'Wir suchen motivierte Mitarbeiter und Auszubildende für unser Autohaus in Goch. Entdecken Sie aktuelle Stellenangebote und bewerben Sie sich direkt online.',
  keywords: [
    'Jobs Autohaus Goch',
    'Ausbildung Kfz-Mechatroniker Goch',
    'Stellenangebote Goch',
    'Karriere Citroën Goch',
    'Ausbildungsplatz Autohaus Niederrhein',
  ],
  openGraph: {
    title: 'Karriere & Jobs – Autohaus Küppers Goch',
    description:
      'Aktuelle Stellenangebote und Ausbildungsplätze bei Autohaus Küppers in Goch. Jetzt online bewerben!',
    type: 'website',
  },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}