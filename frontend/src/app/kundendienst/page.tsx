'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import { CONTENT } from '@/lib/constants';

const services = [
  {
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
    <main className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
            Kundendienst
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Wir nehmen es persönlich
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed">
            Wir betreuen Sie individuell, denn Ihre persönlichen Anliegen sind unser Auftrag.
            Das Kundendienst-Team vom Autohaus Küppers steht Ihnen für alle Ihre Fragen zur Verfügung.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[21/9] mb-16 md:mb-20 overflow-hidden">
          <Image
            src="/images/kundendienst/werkstatt2.jpg"
            alt="Werkstatt Autohaus Küppers"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col">
              <h2 className="text-lg font-semibold text-primary mb-4 pb-4 border-b border-neutral-200">
                {service.category}
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-3 mb-6 flex-1">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-neutral-600 leading-relaxed flex items-start gap-2">
                    <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                    <Link
                      href="/kontakt?betreff=Service"
                      className="hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/kontakt?betreff=Service"
                className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors self-start"
              >
                Termin vereinbaren
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          ))}
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

        {/* Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 mt-px">
          <div className="bg-white p-6 md:p-8">
            <p className="text-xs text-primary uppercase tracking-wider mb-4 font-medium">Verkauf</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Mo. – Do.</span>
                <span className="text-neutral-900 font-medium">{CONTENT.hours.sales.monThu}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Fr.</span>
                <span className="text-neutral-900 font-medium">{CONTENT.hours.sales.fri}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Sa.</span>
                <span className="text-neutral-900 font-medium">{CONTENT.hours.sales.sat}</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 md:p-8">
            <p className="text-xs text-primary uppercase tracking-wider mb-4 font-medium">Werkstatt</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Mo. – Fr.</span>
                <span className="text-neutral-900 font-medium">{CONTENT.hours.service.monFri}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Sa.</span>
                <span className="text-neutral-900 font-medium">{CONTENT.hours.service.sat}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
