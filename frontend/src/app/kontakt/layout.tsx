import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt – Autohaus Küppers Goch',
  description:
    'Nehmen Sie Kontakt mit Autohaus Küppers in Goch auf. Kaufanfragen, Probefahrten, Werkstatt-Termine und Gewerbekunden-Anfragen – wir sind Mo.–Fr. für Sie erreichbar.',
  keywords: [
    'Autohaus Küppers Kontakt',
    'Kontakt Citroën Goch',
    'Probefahrt Goch',
    'Werkstatt Termin Goch',
    'Kaufanfrage Citroën',
    'Autohaus Goch Telefon',
  ],
  openGraph: {
    title: 'Kontakt – Autohaus Küppers Goch',
    description:
      'Kaufanfragen, Probefahrten, Werkstatt-Termine: Wir sind Mo.–Fr. für Sie da. Autohaus Küppers in Goch.',
    type: 'website',
  },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}