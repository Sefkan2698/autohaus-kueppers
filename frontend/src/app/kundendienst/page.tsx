'use client';

import { Phone } from 'lucide-react';
import { CONTENT } from '@/lib/constants';

const services = [
  {
    category: 'Reparaturen & Wartung',
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
          <p className="text-neutral-500 text-sm tracking-[0.2em] uppercase mb-4">
            Kundendienst
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            <span className="text-primary">Wir nehmen es persönlich</span>
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed">
            Wir betreuen Sie individuell, denn Ihre persönlichen Anliegen sind unser Auftrag.
            Das Kundendienst-Team vom Autohaus Küppers steht Ihnen für alle Ihre Fragen zur Verfügung.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index}>
              <h2 className="text-lg font-semibold text-primary mb-6 pb-4 border-b border-neutral-200">
                {service.category}
              </h2>
              <ul className="space-y-3">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-neutral-600 text-sm leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-neutral-100 p-8 md:p-12">
          <div className="max-w-2xl">
            <p className="text-neutral-500 text-sm tracking-[0.2em] uppercase mb-4">
              Kontakt
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Haben Sie Fragen?
            </h2>
            <p className="text-neutral-600 mb-8">
              Unser Kundendienst-Team ist Mo–Fr von {CONTENT.hours.service.weekdays} für Sie da.
            </p>
            <a
              href={`tel:${CONTENT.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors"
            >
              <Phone className="w-4 h-4" strokeWidth={1.5} />
              {CONTENT.phone}
            </a>
          </div>
        </div>

        {/* Hours */}
        <div className="grid grid-cols-3 gap-px bg-neutral-200 mt-px">
          <div className="bg-white p-6 md:p-8">
            <p className="text-xs text-primary uppercase tracking-wider mb-2 font-medium">Verkauf</p>
            <p className="text-neutral-900 font-medium">{CONTENT.hours.sales.weekdays}</p>
          </div>
          <div className="bg-white p-6 md:p-8">
            <p className="text-xs text-primary uppercase tracking-wider mb-2 font-medium">Service</p>
            <p className="text-neutral-900 font-medium">{CONTENT.hours.service.weekdays}</p>
          </div>
          <div className="bg-white p-6 md:p-8">
            <p className="text-xs text-primary uppercase tracking-wider mb-2 font-medium">Teile</p>
            <p className="text-neutral-900 font-medium">{CONTENT.hours.parts}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
