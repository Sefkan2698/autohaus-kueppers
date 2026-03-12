import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, ArrowRight, Check, Star, Shield, Percent, Leaf } from 'lucide-react';
import { CONTENT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Citroën verdoppelt die Förderprämie – bis zu 12.000 € | Autohaus Küppers Goch',
  description:
    'Jetzt doppelt sparen: Citroën verdoppelt die staatliche E-Auto Förderung! Bis zu 12.000 € Gesamtvorteil für ë-C3 ab 17.140 € und ë-C3 Aircross ab 23.640 €. Garantiert 3.000 € – auch ohne staatliche Förderung. Ihr Citroën Partner in Goch.',
  keywords: [
    'Citroën Förderprämie verdoppelt',
    'ë-C3 Förderung',
    'Citroën Elektroauto Prämie 2026',
    'E-Auto Förderung Goch',
    'ë-C3 Aircross Förderung',
    'Citroën ë-C3 Preis',
    'Elektroauto kaufen Goch',
    'Citroën Händler Goch',
    'E-Auto Prämie 12000',
    'Citroën Preisrevolution',
  ],
  openGraph: {
    title: 'Citroën verdoppelt die Förderprämie – bis zu 12.000 € Vorteil',
    description:
      'ë-C3 ab 17.140 € & ë-C3 Aircross ab 23.640 €. Citroën verdoppelt die staatliche Prämie – bis zu 12.000 € Gesamtvorteil. Jetzt beim Autohaus Küppers in Goch.',
    type: 'website',
  },
};

const weitereModelle = [
  {
    name: 'Citroën ë-C4',
    tagline: 'Kompakte Limousine',
    kaufpreis: 'ab 28.900 €',
    leasingRate: 'ab 349 €/mtl.',
    highlights: ['8 Jahre Garantie³', 'Steuerbefreiung⁵', '3.000 € garantierte Citroën Förderprämie²'],
    foerderMax: '6.000 €',
    wltp: '14,9–15,6 kWh/100 km · CO₂: 0 g/km · CO₂-Klasse: A',
    kaufNote: '¹⁰',
    leasingNote: '¹¹',
    phev: false,
  },
  {
    name: 'Citroën ë-C4 X',
    tagline: 'Elegante Fastback-Limousine',
    kaufpreis: 'ab 29.600 €',
    leasingRate: 'ab 355 €/mtl.',
    highlights: ['8 Jahre Garantie³', 'Steuerbefreiung⁵', '3.000 € garantierte Citroën Förderprämie²'],
    foerderMax: '6.000 €',
    wltp: '14,5–15,3 kWh/100 km · CO₂: 0 g/km · CO₂-Klasse: A',
    kaufNote: '¹²',
    leasingNote: '¹³',
    phev: false,
  },
  {
    name: 'C5 Aircross Elektro',
    tagline: 'Großes SUV, vollelektrisch',
    kaufpreis: 'ab 39.590 €',
    leasingRate: 'ab 445 €/mtl.',
    highlights: ['8 Jahre Garantie³', '0%-Finanzierung⁴', 'Steuerbefreiung⁵', '3.000 € garantierte Citroën Förderprämie²'],
    foerderMax: '6.000 €',
    wltp: '17,0–17,2 kWh/100 km · CO₂: 0 g/km · CO₂-Klasse: A',
    kaufNote: '¹⁴',
    leasingNote: '¹⁵',
    phev: false,
  },
  {
    name: 'C5 Aircross Plug-in Hybrid',
    tagline: 'SUV mit PHEV-Antrieb',
    kaufpreis: 'ab 35.990 €',
    leasingRate: 'ab 405 €/mtl.',
    highlights: ['8 Jahre Garantie³', 'Steuerbefreiung⁵', '3.000 € garantierte Citroën Förderprämie²'],
    foerderMax: '4.500 €',
    wltp: '14,3–14,4 kWh/100 km + 2,5 l/100 km · CO₂: 55–56 g/km (gewichtet) · CO₂-Klasse: B',
    kaufNote: '¹⁶',
    leasingNote: '¹⁷',
    phev: true,
  },
  {
    name: 'Citroën ë-Berlingo',
    tagline: 'Vielseitiger Familienvan',
    kaufpreis: 'ab 33.940 €',
    leasingRate: 'ab 399 €/mtl.',
    highlights: ['8 Jahre Garantie³', '0%-Finanzierung⁴', 'Steuerbefreiung⁵', '3.000 € garantierte Citroën Förderprämie²'],
    foerderMax: '6.000 €',
    wltp: '18,0–18,6 kWh/100 km · CO₂: 0 g/km · CO₂-Klasse: A',
    kaufNote: '¹⁸',
    leasingNote: '¹⁹',
    phev: false,
  },
  {
    name: 'Citroën ë-SpaceTourer',
    tagline: 'Großraumvan für viele',
    kaufpreis: 'ab 43.230 €',
    leasingRate: 'ab 485 €/mtl.',
    highlights: ['8 Jahre Garantie³', '0%-Finanzierung⁴', 'Steuerbefreiung⁵', '3.000 € garantierte Citroën Förderprämie²'],
    foerderMax: '6.000 €',
    wltp: '24,0–24,9 kWh/100 km · CO₂: 0 g/km · CO₂-Klasse: A',
    kaufNote: '²⁰',
    leasingNote: '²¹',
    phev: false,
  },
];

const models = [
  {
    name: 'Citroën ë-C3',
    tagline: 'Der kompakte Stadtbegleiter',
    image: '/images/eautos/e3.png',
    kaufpreis: 'ab 17.140 €',
    leasingRate: 'ab 155 €/mtl.',
    leasingSonder: '3.000 € Leasingsonderzahlung',
    laufzeit: '48 Monate · 10.000 km/Jahr',
    description:
      'Kompakt, wendig und perfekt für die Stadt. Der ë-C3 überzeugt mit großzügigem Innenraum, moderner Konnektivität und einer Reichweite, die Ihren Alltag entspannt macht.',
    highlights: [
      '8 Jahre Garantie³',
      '0%-Finanzierung⁴',
      'Steuerbefreiung⁵',
      '3.000 € garantierte Citroën Förderprämie²',
    ],
    wltp: 'Energieverbrauch: 16,5–17,3 kWh/100 km · CO₂: 0 g/km · CO₂-Klasse: A',
    foerderNote: 'Staatl. Förderung bis zu 6.000 €⁶ bei Berechtigung (Citroën verdoppelt sie²)',
    kaufNote: '¹ inkl. 3.000 € garantierter Citroën Förderprämie²',
    leasingNote: '⁷ inkl. 3.000 € garantierter Citroën Förderprämie²',
  },
  {
    name: 'Citroën ë-C3 Aircross',
    tagline: 'Das ultrakompakte SUV mit Lounge-Atmosphäre',
    image: '/images/eautos/e3aircross.png',
    kaufpreis: 'ab 23.640 €',
    leasingRate: 'ab 195 €/mtl.',
    leasingSonder: '3.000 € Leasingsonderzahlung',
    laufzeit: '48 Monate · 10.000 km/Jahr',
    description:
      'Der ë-C3 Aircross verbindet SUV-Charakter mit der gemütlichen Atmosphäre einer Lounge. Erhöhte Sitzposition, viel Platz und elektrischer Antrieb – Mobilität für die ganze Familie.',
    highlights: [
      '8 Jahre Garantie³',
      '0%-Finanzierung⁴',
      'Steuerbefreiung⁵',
      '3.000 € garantierte Citroën Förderprämie²',
    ],
    wltp: 'Energieverbrauch: 16,1–18,6 kWh/100 km · CO₂: 0 g/km · CO₂-Klasse: A',
    foerderNote: 'Staatl. Förderung bis zu 6.000 €⁶ bei Berechtigung (Citroën verdoppelt sie²)',
    kaufNote: '⁸ inkl. 3.000 € garantierter Citroën Förderprämie²',
    leasingNote: '⁹ inkl. 3.000 € garantierter Citroën Förderprämie²',
  },
];

export default function CitroenFoerderungPage() {
  return (
    <main className="bg-white min-h-screen">

      {/* Hero Banner */}
      <div className="relative w-full pt-24">
        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden">
          <Image
            src="/images/banner/foerderung.png"
            alt="Citroën verdoppelt die Förderprämie – Die Preisrevolution"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <p className="text-white/70 text-xs uppercase tracking-[0.2em] mb-3">
                Förderung 2026
              </p>
              <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 max-w-xl">
                Die Preisrevolution
              </h1>
              <p className="text-white/90 text-base md:text-xl font-medium">
                Citroën verdoppelt die Förderprämie²
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">

        {/* Intro */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="text-neutral-600 text-lg leading-relaxed">
            E-Mobilität für alle – und jetzt zum unschlagbaren Preis. Mit dem ë-C3 und dem
            ë-C3 Aircross steigen Sie günstig in die Elektromobilität ein. Dank der verdoppelten
            Citroën Förderprämie sparen Sie bis zu <strong>12.000 €²</strong> gegenüber dem
            Listenpreis.
          </p>
        </div>

        {/* Prämien-Übersicht */}
        <div className="grid md:grid-cols-3 gap-4 mb-16 md:mb-20">
          <div className="bg-neutral-100 rounded-xl p-7 flex flex-col">
            <p className="text-xs uppercase tracking-widest font-medium text-neutral-500 mb-3">
              Staatliche Förderung
            </p>
            <p className="text-4xl font-bold text-neutral-900 mb-3">bis zu 6.000 €⁶</p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Staatliche Förderung für förderfähige Elektrofahrzeuge – abhängig von Ihrer
              persönlichen Berechtigung.
            </p>
          </div>
          <div className="bg-primary rounded-xl p-7 flex flex-col">
            <p className="text-xs uppercase tracking-widest font-medium text-white/70 mb-3">
              Citroën verdoppelt²
            </p>
            <p className="text-4xl font-bold text-white mb-3">+ bis zu 6.000 €</p>
            <p className="text-sm text-white/80 leading-relaxed">
              Citroën legt denselben Betrag noch einmal drauf – die staatliche Förderung wird
              vollständig verdoppelt.
            </p>
          </div>
          <div className="bg-neutral-900 rounded-xl p-7 flex flex-col">
            <p className="text-xs uppercase tracking-widest font-medium text-white/50 mb-3">
              Ihr Gesamtvorteil
            </p>
            <p className="text-4xl font-bold text-white mb-3">bis zu 12.000 €²</p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Maximale Ersparnis – so günstig war der Einstieg in die Elektromobilität noch nie.
            </p>
          </div>
        </div>

        {/* Garantie-Banner */}
        <div className="border border-primary/20 bg-primary/5 rounded-xl p-7 md:p-10 mb-16 md:mb-20 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-shrink-0">
            <Star className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-neutral-900 mb-2">
              Garantiert 3.000 € – auch ohne staatliche Förderung²
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Sie sind nicht berechtigt, die staatliche Förderung zu erhalten? Kein Problem –
              Citroën garantiert Ihnen eine Prämie von 3.000 €, unabhängig von Ihrer persönlichen
              Förderberechtigung. Diese ist bereits in den ausgewiesenen Preisen enthalten.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/kontakt?betreff=Förderanfrage"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-primary-dark transition-colors rounded whitespace-nowrap"
            >
              Jetzt anfragen
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* Modelle */}
        <div className="mb-16 md:mb-20">
          <div className="mb-10">
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-3">
              Förderfähige Modelle
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Jetzt mit doppelter Prämie erhältlich
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {models.map((model, index) => (
              <div
                key={index}
                className="border border-neutral-200 rounded-xl overflow-hidden flex flex-col hover:border-primary transition-colors"
              >
                {/* Car Image */}
                <div className="relative aspect-[16/9] bg-neutral-50">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                <div className="p-7 flex flex-col flex-1">
                  {/* Title */}
                  <div className="mb-5">
                    <h3 className="text-xl font-bold text-neutral-900">{model.name}</h3>
                    <p className="text-sm text-primary mt-0.5">{model.tagline}</p>
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Kaufpreis</p>
                      <p className="text-xl font-bold text-neutral-900">{model.kaufpreis}</p>
                      <p className="text-xs text-neutral-400 mt-1">{model.kaufNote}</p>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <p className="text-xs text-primary/70 uppercase tracking-widest mb-1">Leasing</p>
                      <p className="text-xl font-bold text-primary">{model.leasingRate}</p>
                      <p className="text-xs text-neutral-400 mt-1">{model.leasingNote}</p>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 mb-5">{model.laufzeit} · {model.leasingSonder}</p>

                  {/* Förderung Info */}
                  <p className="text-xs bg-neutral-100 rounded px-3 py-2 text-neutral-600 mb-5">
                    {model.foerderNote}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {model.highlights.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-neutral-700">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* WLTP */}
                  <p className="text-xs text-neutral-400 mb-5 leading-relaxed border-t border-neutral-100 pt-4">
                    * {model.wltp}
                  </p>

                  <Link
                    href="/kontakt?betreff=Förderanfrage"
                    className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors self-start rounded"
                  >
                    Angebot anfragen
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weitere Modelle */}
        <div className="mb-16 md:mb-20">
          <div className="mb-10">
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-3">
              Weitere förderfähige Modelle
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Noch mehr Auswahl – alle mit Citroën Förderprämie²
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {weitereModelle.map((model, index) => (
              <div
                key={index}
                className={`border rounded-xl p-6 flex flex-col hover:border-primary transition-colors ${
                  model.phev ? 'border-neutral-300 bg-neutral-50' : 'border-neutral-200 bg-white'
                }`}
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="font-bold text-neutral-900">{model.name}</h3>
                    {model.phev && (
                      <span className="text-xs bg-neutral-200 text-neutral-600 px-2 py-0.5 rounded font-medium">
                        Plug-in Hybrid
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-primary">{model.tagline}</p>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-neutral-100 rounded-lg p-3">
                    <p className="text-xs text-neutral-500 mb-0.5">Kaufen</p>
                    <p className="font-bold text-neutral-900 text-sm">{model.kaufpreis}{model.kaufNote}</p>
                  </div>
                  <div className="bg-primary/5 border border-primary/15 rounded-lg p-3">
                    <p className="text-xs text-primary/70 mb-0.5">Leasing</p>
                    <p className="font-bold text-primary text-sm">{model.leasingRate}{model.leasingNote}</p>
                  </div>
                </div>

                <p className="text-xs text-neutral-500 bg-neutral-50 rounded px-3 py-1.5 mb-4">
                  Staatl. Förderung bis zu {model.foerderMax}⁶ (Citroën verdoppelt²)
                </p>

                <ul className="space-y-1.5 flex-1 mb-4">
                  {model.highlights.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-neutral-600">
                      <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" strokeWidth={2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-neutral-400 border-t border-neutral-100 pt-3 leading-relaxed">
                  * {model.wltp}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Förderung FAQ */}
        <div className="mb-16 md:mb-20">
          <div className="mb-10">
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-3">
              Staatliche Förderung
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Förderungen – Was steht Ihnen zu?
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6 max-w-2xl">
              Wir sagen's Ihnen! Prüfen Sie hier, welche staatliche Förderprämie Ihrem Haushalt zusteht –
              und denken Sie daran: Bei Citroën Modellen gibt es die <strong>doppelte Förderprämie²</strong>.
            </p>
            <a
              href="https://www.bundesumweltministerium.de/foerderung/fragen-und-antworten-zur-e-auto-foerderung "
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-700 px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors rounded"
            >
              Zur offiziellen Förderseite
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </a>
          </div>

          {/* BEV Tabellen */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-neutral-900 mb-1">
              Batterieelektrische Fahrzeuge (BEV)
            </h3>
            <p className="text-sm text-neutral-500 mb-6">Bei Anschaffung eines rein batterieelektrischen Fahrzeugs</p>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  title: 'Haushalt ohne Kinder',
                  rows: [
                    { einkomm: '85.001 € – 90.000 €', foerd: '0 €' },
                    { einkomm: '80.001 € – 85.000 €', foerd: '0 €' },
                    { einkomm: '60.001 € – 80.000 €', foerd: '3.000 €' },
                    { einkomm: '45.001 € – 60.000 €', foerd: '4.000 €' },
                    { einkomm: 'Bis 45.000 €', foerd: '5.000 €' },
                  ],
                },
                {
                  title: 'Haushalt mit 1 Kind unter 18',
                  rows: [
                    { einkomm: '85.001 € – 90.000 €', foerd: '0 €' },
                    { einkomm: '80.001 € – 85.000 €', foerd: '3.500 €' },
                    { einkomm: '60.001 € – 80.000 €', foerd: '3.500 €' },
                    { einkomm: '45.001 € – 60.000 €', foerd: '4.500 €' },
                    { einkomm: 'Bis 45.000 €', foerd: '5.500 €' },
                  ],
                },
                {
                  title: 'Haushalt mit 2+ Kindern unter 18',
                  rows: [
                    { einkomm: '85.001 € – 90.000 €', foerd: '4.000 €' },
                    { einkomm: '80.001 € – 85.000 €', foerd: '4.000 €' },
                    { einkomm: '60.001 € – 80.000 €', foerd: '4.000 €' },
                    { einkomm: '45.001 € – 60.000 €', foerd: '5.000 €' },
                    { einkomm: 'Bis 45.000 €', foerd: '6.000 €' },
                  ],
                },
              ].map((table, i) => (
                <div key={i} className="border border-neutral-200 rounded-xl overflow-hidden">
                  <div className="bg-neutral-900 px-4 py-3">
                    <p className="text-white text-sm font-medium">{table.title}</p>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-neutral-100">
                        <th className="text-left px-4 py-2 text-xs text-neutral-500 font-medium">Haushaltseinkommen</th>
                        <th className="text-right px-4 py-2 text-xs text-neutral-500 font-medium">Förderung</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row, j) => (
                        <tr key={j} className={`border-t border-neutral-100 ${row.foerd !== '0 €' ? 'bg-white' : 'bg-neutral-50'}`}>
                          <td className="px-4 py-2.5 text-neutral-600 text-xs">{row.einkomm}</td>
                          <td className={`px-4 py-2.5 text-right font-semibold text-xs ${row.foerd !== '0 €' ? 'text-primary' : 'text-neutral-400'}`}>
                            {row.foerd}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>

          {/* PHEV Tabellen */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-neutral-900 mb-1">
              Plug-in-Hybride & Range-Extender (PHEV)
            </h3>
            <p className="text-sm text-neutral-500 mb-6">Bei Anschaffung eines förderfähigen Plug-In-Hybrids oder E-Fahrzeugs mit Range-Extender</p>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  title: 'Haushalt ohne Kinder',
                  rows: [
                    { einkomm: '85.001 € – 90.000 €', foerd: '0 €' },
                    { einkomm: '80.001 € – 85.000 €', foerd: '0 €' },
                    { einkomm: '60.001 € – 80.000 €', foerd: '1.500 €' },
                    { einkomm: '45.001 € – 60.000 €', foerd: '2.500 €' },
                    { einkomm: 'Bis 45.000 €', foerd: '3.500 €' },
                  ],
                },
                {
                  title: 'Haushalt mit 1 Kind unter 18',
                  rows: [
                    { einkomm: '85.001 € – 90.000 €', foerd: '0 €' },
                    { einkomm: '80.001 € – 85.000 €', foerd: '2.000 €' },
                    { einkomm: '60.001 € – 80.000 €', foerd: '2.000 €' },
                    { einkomm: '45.001 € – 60.000 €', foerd: '3.000 €' },
                    { einkomm: 'Bis 45.000 €', foerd: '4.000 €' },
                  ],
                },
                {
                  title: 'Haushalt mit 2+ Kindern unter 18',
                  rows: [
                    { einkomm: '85.001 € – 90.000 €', foerd: '2.500 €' },
                    { einkomm: '80.001 € – 85.000 €', foerd: '2.500 €' },
                    { einkomm: '60.001 € – 80.000 €', foerd: '2.500 €' },
                    { einkomm: '45.001 € – 60.000 €', foerd: '3.500 €' },
                    { einkomm: 'Bis 45.000 €', foerd: '4.500 €' },
                  ],
                },
              ].map((table, i) => (
                <div key={i} className="border border-neutral-200 rounded-xl overflow-hidden">
                  <div className="bg-neutral-700 px-4 py-3">
                    <p className="text-white text-sm font-medium">{table.title}</p>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-neutral-100">
                        <th className="text-left px-4 py-2 text-xs text-neutral-500 font-medium">Haushaltseinkommen</th>
                        <th className="text-right px-4 py-2 text-xs text-neutral-500 font-medium">Förderung</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row, j) => (
                        <tr key={j} className={`border-t border-neutral-100 ${row.foerd !== '0 €' ? 'bg-white' : 'bg-neutral-50'}`}>
                          <td className="px-4 py-2.5 text-neutral-600 text-xs">{row.einkomm}</td>
                          <td className={`px-4 py-2.5 text-right font-semibold text-xs ${row.foerd !== '0 €' ? 'text-neutral-700' : 'text-neutral-400'}`}>
                            {row.foerd}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>

          {/* Regelungen */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-neutral-50 rounded-xl p-6">
              <h4 className="font-semibold text-neutral-900 mb-4">Wer ist anspruchsberechtigt?</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} /><span>Privatpersonen (keine Unternehmen)</span></li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} /><span>Haushaltseinkommen bis 80.000 € / Jahr</span></li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} /><span>+5.000 € Einkommensgrenze je Kind (max. 2 Kinder)</span></li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} /><span>Kauf oder Leasing eines Neufahrzeugs</span></li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} /><span>Mindesthaltedauer: 36 Monate</span></li>
              </ul>
            </div>
            <div className="bg-neutral-50 rounded-xl p-6">
              <h4 className="font-semibold text-neutral-900 mb-4">Welche Fahrzeuge werden gefördert?</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} /><span>EU-Fahrzeugklasse M1 (PKW)</span></li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} /><span>Rein batterieelektrisch (BEV) oder Plug-in-Hybrid (PHEV)</span></li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} /><span>PHEV: CO₂ ≤ 60 g/km oder elektr. Reichweite ≥ 80 km</span></li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} /><span>Neufahrzeug, erstmals in Deutschland zugelassen</span></li>
                <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} /><span>Antrag bis 1 Jahr nach Zulassung</span></li>
              </ul>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-sm text-neutral-600 leading-relaxed mb-8">
            <p className="font-semibold text-neutral-900 mb-2">Gültigkeit der Förderung</p>
            <p>Die Förderung gilt rückwirkend für Zulassungen ab <strong>01.01.2026</strong> und endet mit Erschöpfung der bereitgestellten Fördermittel, spätestens am <strong>31.12.2028</strong> (PHEV: 30.06.2027). Ein Rechtsanspruch besteht nicht.</p>
          </div>

          {/* Tabellen-Bild */}
          <div className="border border-neutral-200 rounded-xl overflow-hidden">
            <Image
              src="/images/eautos/tabelleeautos.png"
              alt="Übersicht: So funktioniert die Citroën Förderprämie – Tabelle"
              width={1400}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Inklusiv-Vorteile */}
        <div className="bg-neutral-50 rounded-xl p-8 md:p-12 mb-16 md:mb-20">
          <div className="mb-8">
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-3">
              Inklusiv bei beiden Modellen
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Sicher, smart und extrem attraktiv
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">8 Jahre Garantie³</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Langfristige Sicherheit und Wertstabilität für Ihren neuen Elektro-Citroën.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Percent className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">0%-Finanzierung⁴</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Finanzieren Sie Ihr E-Auto ohne Zinskosten – maximale Planungssicherheit.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Leaf className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Steuerbefreiung⁵</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Elektrofahrzeuge sind von der Kfz-Steuer befreit – ein dauerhafter finanzieller Vorteil.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-neutral-100 rounded-xl p-8 md:p-12">
          <div className="max-w-2xl">
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
              Jetzt handeln
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Sichern Sie sich Ihr E-Auto noch heute!
            </h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              Besuchen Sie uns in Goch oder kontaktieren Sie uns – wir beraten Sie persönlich
              zu allen Details der Förderprämie und finden das passende Modell für Sie.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${CONTENT.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors rounded"
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                {CONTENT.phone}
              </a>
              <Link
                href="/kontakt?betreff=Förderanfrage"
                className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-900 px-6 py-3 font-medium hover:border-primary hover:text-primary transition-colors rounded"
              >
                Online anfragen
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Rechtliche Hinweise */}
        <div className="mt-12 pt-8 border-t border-neutral-200 space-y-2 text-xs text-neutral-400 leading-relaxed">
          <p>¹ Citroën ë-C3 Elektromotor 113 Urban Range YOU ab 17.140 € inkl. 3.000 € garantierter Citroën Förderprämie². Unverbindliche Preisempfehlung des Herstellers. Änderungen vorbehalten.</p>
          <p>² Citroën Förderprämie: Bei Berechtigung zur staatlichen Förderung verdoppelt Citroën die staatliche Prämie (bis zu 6.000 €⁶). Ohne Berechtigung: garantierte Citroën Förderprämie von 3.000 €. Gilt für Neuverträge im Aktionszeitraum auf förderfähige Modelle. Irrtümer und Änderungen vorbehalten. Details bei Ihrem Citroën Händler.</p>
          <p>³ 8 Jahre Garantie gemäß Citroën Garantiebedingungen. Details auf Anfrage.</p>
          <p>⁴ 0%-Finanzierung: Angebot der Stellantis Bank SA Niederlassung Deutschland, gültig für ausgewählte Modelle und Laufzeiten. Bonität vorausgesetzt.</p>
          <p>⁵ Steuerbefreiung gemäß §3d KraftStG für reine Elektrofahrzeuge. Aktuell gültige gesetzliche Regelungen beachten.</p>
          <p>⁶ Staatliche Förderung nach aktuell geltenden gesetzlichen Regelungen, abhängig von persönlicher Berechtigung und Fahrzeugqualifikation.</p>
          <p>⁷ Leasing ë-C3: Ein unverbindliches Kilometerleasingangebot für Privatkunden (Bonität vorausgesetzt) der Stellantis Bank SA Niederlassung Deutschland GmbH, Siemensstraße 10, 63263 Neu-Isenburg für den Citroën ë-C3 Elektromotor 113 Urban Range YOU. 48 × 155,– € mtl., Leasingsonderzahlung: 3.000,– €, Laufzeit: 48 Monate, Laufleistung: 10.000 km/Jahr.</p>
          <p>⁸ Citroën ë-C3 Aircross Elektromotor 113 Standard-Range YOU ab 23.640 € inkl. 3.000 € garantierter Citroën Förderprämie².</p>
          <p>⁹ Leasing ë-C3 Aircross: Ein unverbindliches Kilometerleasingangebot für Privatkunden (Bonität vorausgesetzt) der Stellantis Bank SA Niederlassung Deutschland GmbH, Siemensstraße 10, 63263 Neu-Isenburg für den Citroën ë-C3 Aircross Elektromotor 113 Standard-Range YOU. 48 × 195,– € mtl., Leasingsonderzahlung: 3.000,– €, Laufzeit: 48 Monate, Laufleistung: 10.000 km/Jahr.</p>
          <p>¹⁰ Citroën ë-C4 Elektromotor 113 Standard Range YOU ab 28.900 € inkl. 3.000 € garantierter Citroën Förderprämie².</p>
          <p>¹¹ Leasing ë-C4: Ein unverbindliches Kilometerleasingangebot für Privatkunden (Bonität vorausgesetzt) der Stellantis Bank SA Niederlassung Deutschland GmbH, Siemensstraße 10, 63263 Neu-Isenburg für den Citroën ë-C4 Elektromotor 113 Standard Range YOU. 48 × 349,– € mtl., Leasingsonderzahlung: 3.000,– €, Laufzeit: 48 Monate, Laufleistung: 10.000 km/Jahr.</p>
          <p>¹² Citroën ë-C4 X Elektromotor 113 Standard Range YOU ab 29.600 € inkl. 3.000 € garantierter Citroën Förderprämie².</p>
          <p>¹³ Leasing ë-C4 X: Ein unverbindliches Kilometerleasingangebot für Privatkunden (Bonität vorausgesetzt) der Stellantis Bank SA Niederlassung Deutschland GmbH, Siemensstraße 10, 63263 Neu-Isenburg für den Citroën ë-C4 X Elektromotor 113 Standard Range YOU. 48 × 355,– € mtl., Leasingsonderzahlung: 3.000,– €, Laufzeit: 48 Monate, Laufleistung: 10.000 km/Jahr.</p>
          <p>¹⁴ Citroën C5 Aircross Elektro Elektromotor 210 Komfort Range YOU ab 39.590 € inkl. 3.000 € garantierter Citroën Förderprämie².</p>
          <p>¹⁵ Leasing C5 Aircross Elektro: Ein unverbindliches Kilometerleasingangebot für Privatkunden (Bonität vorausgesetzt) der Stellantis Bank SA Niederlassung Deutschland GmbH, Siemensstraße 10, 63263 Neu-Isenburg für den Citroën C5 Aircross Elektro Elektromotor 210 Komfort Range YOU. 48 × 445,– € mtl., Leasingsonderzahlung: 3.000,– €, Laufzeit: 48 Monate, Laufleistung: 10.000 km/Jahr.</p>
          <p>¹⁶ Citroën C5 Aircross Plug-In-Hybrid 195 PLUS ab 35.990 € inkl. 3.000 € garantierter Citroën Förderprämie². Staatl. Förderung für Plug-in-Hybride bis zu 4.500 €⁶.</p>
          <p>¹⁷ Leasing C5 Aircross Plug-in Hybrid: Ein unverbindliches Kilometerleasingangebot für Privatkunden (Bonität vorausgesetzt) der Stellantis Bank SA Niederlassung Deutschland GmbH, Siemensstraße 10, 63263 Neu-Isenburg für den Citroën C5 Aircross Plug-In-Hybrid 195 PLUS. 48 × 405,– € mtl., Leasingsonderzahlung: 3.000,– €, Laufzeit: 48 Monate, Laufleistung: 10.000 km/Jahr.</p>
          <p>¹⁸ Citroën ë-Berlingo Elektromotor 136 Standard Range PLUS ab 33.940 € inkl. 3.000 € garantierter Citroën Förderprämie².</p>
          <p>¹⁹ Leasing ë-Berlingo: Ein unverbindliches Kilometerleasingangebot für Privatkunden (Bonität vorausgesetzt) der Stellantis Bank SA Niederlassung Deutschland GmbH, Siemensstraße 10, 63263 Neu-Isenburg für den Citroën ë-Berlingo Elektromotor 136 Standard Range PLUS. 48 × 399,– € mtl., Leasingsonderzahlung: 3.000,– €, Laufzeit: 48 Monate, Laufleistung: 10.000 km/Jahr.</p>
          <p>²⁰ Citroën ë-SpaceTourer Elektromotor 136 Standard Range PLUS ab 43.230 € inkl. 3.000 € garantierter Citroën Förderprämie².</p>
          <p>²¹ Leasing ë-SpaceTourer: Ein unverbindliches Kilometerleasingangebot für Privatkunden (Bonität vorausgesetzt) der Stellantis Bank SA Niederlassung Deutschland GmbH, Siemensstraße 10, 63263 Neu-Isenburg für den Citroën ë-SpaceTourer Elektromotor 136 Standard Range PLUS. 48 × 485,– € mtl., Leasingsonderzahlung: 3.000,– €, Laufzeit: 48 Monate, Laufleistung: 10.000 km/Jahr.</p>
          <p>* Kombinierte Werte gem. WLTP.</p>
        </div>

      </div>
    </main>
  );
}
