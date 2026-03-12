import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, ArrowRight, Check, Briefcase, Car, Calculator, Users, Zap, Gauge, Package, Shield } from 'lucide-react';
import { CONTENT } from '@/lib/constants';
import GewerbeFahrzeugCarousel from '@/components/GewerbeFahrzeugCarousel';

export const metadata: Metadata = {
  title: 'Firmenwagen & Gewerbekunden – Autohaus Küppers Goch',
  description:
    'Attraktive Konditionen für Gewerbekunden und Firmenwagen-Flotten bei Autohaus Küppers in Goch. Citroën Nutzfahrzeuge, Leasing, Finanzierung und persönliche Betreuung für Ihr Unternehmen.',
  keywords: [
    'Firmenwagen Goch',
    'Gewerbe Citroën Goch',
    'Citroën Nutzfahrzeuge Goch',
    'Flottenmanagement Goch',
    'Dienstwagen Citroën',
    'Leasing Gewerbe Goch',
    'Citroën Händler Gewerbebetrieb',
    'Fuhrpark Autohaus Küppers',
  ],
  openGraph: {
    title: 'Firmenwagen & Gewerbekunden – Autohaus Küppers Goch',
    description:
      'Attraktive Gewerbekonditionen, persönliche Betreuung und zuverlässiger Service für Ihr Unternehmen. Citroën Nutzfahrzeuge & Pkw für Selbstständige und Flottenbetreiber.',
    type: 'website',
  },
};

const vorteile = [
  {
    icon: Car,
    title: 'Attraktive Gewerbekonditionen',
    description:
      'Als Gewerbekunde profitieren Sie von speziellen Konditionen auf das gesamte Citroën Sortiment – Pkw ebenso wie Nutzfahrzeuge.',
    items: [
      'Exklusive Händlerangebote für Gewerbetreibende',
      'Rabatte auf Neufahrzeuge & Jahreswagen',
      'Sonderkonditionen für Mehrfachbestellungen',
      'Individuelle Fahrzeugkonfiguration',
    ],
  },
  {
    icon: Calculator,
    title: 'Flexible Finanzierung & Leasing',
    description:
      'Ob Kauf, Finanzierung oder Leasing – wir finden das passende Modell für Ihr Budget. Steuervorteile für Dienstwagen inklusive.',
    items: [
      'Maßgeschneiderte Leasingverträge',
      'Finanzierungslösungen mit günstigen Zinsen',
      'Full-Service-Leasing auf Anfrage',
      'Steuerlich absetzbare Dienstwagen',
    ],
  },
  {
    icon: Users,
    title: 'Persönliche Betreuung',
    description:
      'Sie erhalten einen festen Ansprechpartner, der Ihren Fuhrpark kennt und sich um alle Belange kümmert – von der Bestellung bis zum Service.',
    items: [
      'Persönlicher Gewerbe-Ansprechpartner',
      'Schnelle Reaktionszeiten',
      'Transparente Kommunikation',
      'Langfristige Partnerschaft',
    ],
  },
  {
    icon: Briefcase,
    title: 'Werkstatt & Service für Flotten',
    description:
      'Unsere Werkstatt hält Ihren Fuhrpark in Schuss. Kurze Ausfallzeiten und schnelle Termine sind für uns selbstverständlich.',
    items: [
      'Vorrangige Werkstatttermine',
      'Ersatzfahrzeuge bei längeren Reparaturen',
      'DEKRA Hauptuntersuchung im Haus',
      'Citroën Originalteile & Zubehör',
    ],
  },
];

const features = [
  {
    icon: Zap,
    title: 'Elektrifizierte Modellpalette',
    description: 'Für viele Ihrer Bedürfnisse gibt es bereits einen elektrifizierten Citroën.',
  },
  {
    icon: Shield,
    title: 'Verbesserter Komfort',
    description:
      'Die Advanced Comfort Sitze mit zusätzlichem Schaumstoff und verbesserter Rückenlehne sorgen für mehr Komfort.',
  },
  {
    icon: Gauge,
    title: 'Einfaches Fahren',
    description:
      'Profitieren Sie von bis zu 22 Fahrerassistenzsystemen, die Sie unterstützen und Ihren Arbeitsalltag sicherer machen.',
  },
  {
    icon: Package,
    title: 'Vielseitigkeit',
    description:
      'Profitieren Sie von bis zu 1.900 kg Nutzlast und bis zu 17 m³ Ladevolumen.',
  },
];

export default function GewerbePage() {
  return (
    <main className="bg-white min-h-screen">

      {/* Hero Banner */}
      <div className="relative w-full pt-24">
        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden">
          <Image
            src="/images/gewerbe/gewerbehero.png"
            alt="Citroën Nutzfahrzeuge für Gewerbekunden"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <p className="text-white/70 text-xs uppercase tracking-[0.2em] mb-3">
                Gewerbekunden
              </p>
              <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 max-w-xl">
                Citroën für Profis
              </h1>
              <p className="text-white/90 text-base md:text-xl font-medium">
                Ihr verlässlicher Partner für Firmenwagen & Flotten
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Intro Text + Handwerker Bild */}
        <div className="grid md:grid-cols-2 gap-12 items-center py-16 md:py-20">
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
              Ihr Partner seit über 65 Jahren
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 leading-snug">
              Der Citroën Partner der Gewerbetreibenden
            </h2>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                Citroën ist seit jeher der Partner der Gewerbetreibenden. Vom 2CV Van bis zum
                Berlingo Kastenwagen – die Marke hat sich immer dafür eingesetzt, mit Konventionen
                zu brechen, Mobilität für alle Unternehmen erschwinglich zu machen, ihre Bedürfnisse
                zu erfüllen und sie bei der Entwicklung Ihres Geschäfts zu unterstützen.
              </p>
              <p>
                Entdecken Sie unser umfangreiches Angebot an 100&nbsp;% elektrischen
                Nutzfahrzeugen, die speziell für Profis entwickelt wurden, um allen ihren
                Anforderungen gerecht zu werden.
              </p>
            </div>
            <Link
              href="/kontakt?betreff=Gewerbeanfrage"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors rounded text-sm mt-8"
            >
              Jetzt Gewerbe-Anfrage stellen
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="/images/gewerbe/handwerker.png"
              alt="Handwerker mit Citroën Nutzfahrzeug"
              fill
              className="object-cover"
            />
          </div>
        </div>

      </div>

      {/* Feature Strip */}
      <div className="bg-primary py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title}>
                  <div className="flex justify-center mb-4">
                    <Icon className="w-10 h-10 text-white/90" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-sm md:text-base mb-2">{f.title}</h3>
                  <p className="text-white/75 text-xs md:text-sm leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Nutzfahrzeuge Carousel */}
        <div className="py-16 md:py-20">
          <div className="mb-10">
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-3">
              Nutzfahrzeuge
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Citroën Nutzfahrzeuge für Ihr Unternehmen
            </h2>
            <p className="text-neutral-600 mt-3 max-w-2xl">
              Vom kompakten Kastenwagen bis zum Großraumtransporter – jeweils als Verbrenner
              oder 100&nbsp;% elektrische Variante für emissionsfreie Innenstadtzonen.
            </p>
          </div>
          <GewerbeFahrzeugCarousel />
          <div className="mt-8">
            <Link
              href="/fahrzeuge"
              className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-900 px-6 py-3 font-medium hover:border-primary hover:text-primary transition-colors rounded text-sm"
            >
              Alle Fahrzeuge ansehen
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* Vorteile Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 md:mb-20">
          {vorteile.map((vorteil, index) => {
            const Icon = vorteil.icon;
            return (
              <div key={index} className="flex flex-col bg-white border border-neutral-200 rounded-xl p-7">
                <div className="mb-5">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h2 className="text-lg font-semibold text-primary mb-3">
                  {vorteil.title}
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  {vorteil.description}
                </p>
                <ul className="space-y-2.5 flex-1">
                  {vorteil.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-600">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Warum Küppers */}
        <div className="bg-neutral-50 rounded-xl p-8 md:p-12 mb-16 md:mb-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-3">
                Warum Autohaus Küppers?
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                Vertrauen seit über 65 Jahren
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Als familiengeführter Betrieb mit über 65 Jahren Erfahrung und 50 Jahren
                Citroën-Partnerschaft kennen wir die Bedürfnisse unserer Gewerbekunden genau.
                Verlässlichkeit, kurze Wege und persönlicher Service zeichnen uns aus.
              </p>
              <Link
                href="/kontakt?betreff=Gewerbeanfrage"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors rounded text-sm"
              >
                Jetzt Gewerbe-Anfrage stellen
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { zahl: '65+', label: 'Jahre Erfahrung' },
                { zahl: '50', label: 'Jahre Citroën Partner' },
                { zahl: '1', label: 'Fester Ansprechpartner' },
                { zahl: '∞', label: 'Persönlicher Service' },
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-neutral-200 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-primary mb-1">{stat.zahl}</p>
                  <p className="text-sm text-neutral-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-neutral-100 rounded-xl p-8 md:p-12 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
              Kontakt für Gewerbekunden
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Lassen Sie uns Ihren Fuhrpark besprechen
            </h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              Kontaktieren Sie uns – wir erstellen Ihnen ein individuelles Angebot für Ihren
              Fuhrpark. Unser Team ist Mo.–Fr. für Sie erreichbar.
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
                href="/kontakt?betreff=Gewerbeanfrage"
                className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-900 px-6 py-3 font-medium hover:border-primary hover:text-primary transition-colors rounded"
              >
                Gewerbe-Anfrage senden
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}