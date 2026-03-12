import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, ArrowRight, Check, Wrench, ClipboardCheck, HeadphonesIcon } from 'lucide-react';
import { CONTENT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Kundendienst & Werkstatt – Autohaus Küppers Goch',
  description:
    'Meisterbetrieb mit über 30 Jahren Erfahrung: KFZ-Reparaturen, HU/AU, Inspektionen und Reifenservice in Goch. Schnelle Termine und persönliche Beratung.',
  keywords: [
    'Werkstatt Goch',
    'KFZ Reparatur Goch',
    'Citroën Werkstatt Goch',
    'Inspektion Goch',
    'Reifenservice Goch',
    'Kundendienst Autohaus Küppers',
    'Autowerkstatt Niederrhein',
  ],
  openGraph: {
    title: 'Kundendienst & Werkstatt – Autohaus Küppers Goch',
    description:
      'KFZ-Reparaturen aller Art, HU/AU direkt im Haus und persönliche Betreuung. Ihr Meisterbetrieb in Goch.',
    type: 'website',
  },
};

const services = [
  {
    icon: Wrench,
    category: 'Reparaturen & Wartung',
    description: 'Unser Meisterbetrieb kümmert sich um alle Reparaturen – von der kleinen Inspektion bis zur kompletten Instandsetzung. Mit modernster Technik und über 30 Jahren Erfahrung.',
    items: [
      'KFZ-Reparaturen aller Art und Fabrikate',
      'Unfallinstandsetzung',
      'Scheibenreparatur und -erneuerung',
      'Digitale Achsvermessung',
      'DEKRA/Abgasuntersuchung im Haus',
      'Fahrzeugbewertung nach DAT',
    ],
  },
  {
    icon: ClipboardCheck,
    category: 'Checks & Inspektionen',
    description: 'Regelmäßige Checks sorgen für Sicherheit und Werterhalt. Wir prüfen Ihr Fahrzeug gründlich und bereiten es optimal auf jede Jahreszeit vor.',
    items: [
      'Frühjahr- und Wintercheck',
      'Urlaubsdurchsicht',
      'Kostenloser Lichttest das ganze Jahr',
      'Reifen-Service',
      'Klimaanlagenservice',
    ],
  },
  {
    icon: HeadphonesIcon,
    category: 'Service & Beratung',
    description: 'Wir beraten Sie kompetent in allen Fragen rund ums Auto – von Finanzierung bis zum Ersatzfahrzeug während der Reparatur.',
    items: [
      'Kostenvoranschläge',
      'Finanzdienstleistung rund ums Auto',
      'Kundendienstersatzfahrzeug',
    ],
  },
];

export default function KundendienstPage() {
  return (
    <main className="bg-white min-h-screen">

      {/* Hero Banner */}
      <div className="relative w-full pt-24">
        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden">
          <Image
            src="/images/kundendienst/werkstatt2.jpg"
            alt="Werkstatt Autohaus Küppers"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <p className="text-white/70 text-xs uppercase tracking-[0.2em] mb-3">
                Kundendienst
              </p>
              <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 max-w-xl">
                Wir nehmen es persönlich
              </h1>
              <p className="text-white/90 text-base md:text-xl font-medium max-w-lg">
                Wir betreuen Sie individuell, denn Ihre persönlichen Anliegen sind unser Auftrag.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-20">

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="flex flex-col bg-white border border-neutral-200 rounded-xl p-7">
                <div className="mb-5">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h2 className="text-lg font-semibold text-primary mb-3">
                  {service.category}
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2.5 mb-7 flex-1">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-sm text-neutral-600">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/kontakt?betreff=Service"
                  className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors self-start rounded"
                >
                  Termin vereinbaren
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="bg-neutral-100 p-8 md:p-12">
          <div className="max-w-2xl">
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
              Kontakt
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Haben Sie Fragen?
            </h2>
            <p className="text-neutral-600 mb-8">
              Unser Kundendienst-Team ist Mo.–Fr. von {CONTENT.hours.service.monFri} für Sie da.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${CONTENT.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors"
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                {CONTENT.phone}
              </a>
              <Link
                href="/kontakt?betreff=Service"
                className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-900 px-6 py-3 font-medium hover:border-primary hover:text-primary transition-colors"
              >
                Online anfragen
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
