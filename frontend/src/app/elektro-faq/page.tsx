import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { CONTENT } from '@/lib/constants';
import ElektroFaqAccordion from '@/components/ElektroFaqAccordion';

export const metadata: Metadata = {
  title: 'Elektro FAQ – Häufige Fragen zu E-Autos & Hybrid | Autohaus Küppers Goch',
  description:
    'Antworten auf die häufigsten Fragen rund um Elektromobilität: Reichweite, Laden, Batterie, Hybrid vs. Plug-in-Hybrid und Kosten. Ihr Citroën Elektro-Experte in Goch.',
  keywords: [
    'Elektroauto FAQ',
    'E-Auto Fragen Goch',
    'Hybrid Unterschied Plug-in',
    'Elektroauto Reichweite',
    'Batterie Garantie Citroën',
    'Elektroauto laden Goch',
    'BEV PHEV MHEV Erklärung',
  ],
  openGraph: {
    title: 'Elektro FAQ – Häufige Fragen zu E-Autos & Hybrid',
    description:
      'Alles was Sie über Elektromobilität wissen müssen: von Antriebsarten über Ladezeiten bis zur Batteriegarantie. Autohaus Küppers in Goch beantwortet Ihre Fragen.',
    type: 'website',
  },
};

const antriebsarten = [
  {
    kürzel: 'ICE',
    name: 'Verbrennungsmotor',
    farbe: 'bg-neutral-100 text-neutral-700',
    beschreibung:
      'Klassischer thermischer Motor (Benzin, Diesel). Verbrennung des Kraftstoffs treibt Kolben und Kurbelwelle an.',
  },
  {
    kürzel: 'MHEV',
    name: 'Mild Hybrid',
    farbe: 'bg-yellow-50 text-yellow-800',
    beschreibung:
      'Verbrennungsmotor + kleiner Elektromotor. Batterie lädt durch Rekuperation. Kein rein elektrisches Fahren möglich.',
  },
  {
    kürzel: 'HEV',
    name: 'Vollhybrid',
    farbe: 'bg-green-50 text-green-800',
    beschreibung:
      'Verbrennungsmotor + Elektromotor. Batterie lädt durch Rekuperation. Kurze Strecken rein elektrisch möglich.',
  },
  {
    kürzel: 'PHEV',
    name: 'Plug-in Hybrid',
    farbe: 'bg-blue-50 text-blue-800',
    beschreibung:
      'Verbrennungsmotor + größerer Elektromotor. Aufladen per Steckdose. Längere Strecken rein elektrisch möglich.',
  },
  {
    kürzel: 'BEV',
    name: '100 % Elektrisch',
    farbe: 'bg-primary/10 text-primary',
    beschreibung:
      'Ausschließlich elektrischer Antrieb. Kein Verbrenner. Laden nur über externe Quelle und Rekuperation.',
  },
];

export default function ElektroFaqPage() {
  return (
    <main className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
            Elektromobilität
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Elektro FAQ
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed">
            Hier finden Sie Antworten auf die häufigsten Fragen rund um Elektroautos, Hybridfahrzeuge,
            Laden und Kosten. Ihr Citroën-Team in Goch steht Ihnen außerdem persönlich zur Verfügung.
          </p>
        </div>

        {/* Antriebsarten */}
        <div className="mb-16 md:mb-20">
          <div className="mb-8">
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-3">
              Übersicht
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Welche Antriebsarten gibt es?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {antriebsarten.map((a) => (
              <div key={a.kürzel} className="border border-neutral-200 rounded-xl p-5">
                <div className={`inline-block text-sm font-bold px-2.5 py-1 rounded mb-3 ${a.farbe}`}>
                  {a.kürzel}
                </div>
                <p className="font-semibold text-neutral-900 text-sm mb-2">{a.name}</p>
                <p className="text-xs text-neutral-600 leading-relaxed">{a.beschreibung}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mb-16 md:mb-20">
          <div className="mb-8">
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-3">
              Häufige Fragen
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Ihre Fragen – unsere Antworten
            </h2>
          </div>
          <ElektroFaqAccordion />
        </div>

        {/* CTA */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-8 md:p-12">
          <div className="max-w-2xl">
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
              Noch Fragen?
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Wir beraten Sie persönlich
            </h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              Haben Sie noch offene Fragen zur Elektromobilität oder möchten Sie ein E-Fahrzeug
              Probe fahren? Unser Team in Goch hilft Ihnen gerne weiter.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${CONTENT.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-medium hover:bg-primary/90 transition-colors rounded"
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                {CONTENT.phone}
              </a>
              <Link
                href="/aktionen/citroen-foerderung"
                className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-700 px-6 py-3 font-medium hover:bg-neutral-100 transition-colors rounded"
              >
                Elektrofahrzeuge & Förderung
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}