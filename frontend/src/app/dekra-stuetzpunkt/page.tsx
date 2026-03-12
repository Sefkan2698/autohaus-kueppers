import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, ArrowRight, Check, ShieldCheck, ClipboardList, Gauge, Clock, Star } from 'lucide-react';
import { CONTENT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'DEKRA Stützpunkt – Hauptuntersuchung & Abgasuntersuchung | Autohaus Küppers Goch',
  description:
    'Hauptuntersuchung (HU) und Abgasuntersuchung (AU) direkt im Haus bei Autohaus Küppers in Goch. Als offizieller DEKRA Stützpunkt bieten wir schnelle, zuverlässige Fahrzeugprüfungen – ohne Umwege.',
  keywords: [
    'HU AU Goch',
    'Hauptuntersuchung Goch',
    'Abgasuntersuchung Goch',
    'DEKRA Stützpunkt Goch',
    'DEKRA Prüfstelle Goch',
    'TÜV Alternative Goch',
    'Fahrzeugprüfung Goch',
    'DEKRA Autohaus Küppers',
  ],
  openGraph: {
    title: 'DEKRA Stützpunkt bei Autohaus Küppers – HU & AU in Goch',
    description:
      'Hauptuntersuchung und Abgasuntersuchung direkt bei uns im Haus. Kein Extra-Termin, kein Umweg – alles aus einer Hand.',
    type: 'website',
  },
};

const leistungen = [
  {
    icon: ShieldCheck,
    title: 'Hauptuntersuchung (HU)',
    description:
      'Die gesetzlich vorgeschriebene Hauptuntersuchung führen wir als DEKRA Stützpunkt direkt bei uns durch. Kein Extra-Termin, kein Umweg zu einer fremden Prüfstelle.',
    items: [
      'Technische Prüfung nach StVZO',
      'Bremsenprüfung & Fahrwerksdiagnose',
      'Beleuchtungs- und Elektrikprüfung',
      'Lenkung, Reifen & Karosserie',
      'Umweltrelevante Bauteile',
      'DEKRA Plakette direkt vor Ort',
    ],
  },
  {
    icon: Gauge,
    title: 'Abgasuntersuchung (AU)',
    description:
      'Die Abgasuntersuchung prüft, ob Ihr Fahrzeug die gesetzlichen Abgasnormen einhält. Bei uns erfolgt die AU zusammen mit der HU – schnell, effizient und aus einer Hand.',
    items: [
      'Messung der Abgasemissionen',
      'OBD-Diagnose (On-Board-Diagnose)',
      'Prüfung für Benziner & Diesel',
      'Schnelle Abwicklung im Haus',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Vorbereitung & Beratung',
    description:
      'Unsere Werkstatt bereitet Ihr Fahrzeug optimal auf die Hauptuntersuchung vor. Wir erkennen Mängel frühzeitig und beheben sie direkt – damit Ihr Auto sicher durch die Prüfung kommt.',
    items: [
      'HU-Vorbereitungscheck',
      'Mängelbeseitigung vor der HU',
      'Kostenloser Lichttest ganzjährig',
      'Kompetente Fahrzeugberatung',
    ],
  },
];

export default function DekraStuetzpunktPage() {
  return (
    <main className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16 md:mb-20">
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
              Unser Service
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
              DEKRA Stützpunkt
            </h1>
            <p className="text-neutral-600 text-lg leading-relaxed">
              Autohaus Küppers ist offizieller DEKRA Stützpunkt in Goch. Hauptuntersuchung
              und Abgasuntersuchung führen wir direkt bei uns im Haus durch – alles aus einer
              Hand, ohne Umwege.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="/images/dekra/HUplakette.png"
              alt="DEKRA HU-Plakette"
              width={280}
              height={280}
              className="object-contain"
            />
          </div>
        </div>

        {/* Highlight Box */}
        <div className="bg-neutral-100 rounded-xl p-8 md:p-10 mb-16 md:mb-20 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-shrink-0">
            <ShieldCheck className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-neutral-900 mb-2">
              HU & AU direkt bei uns – kein Umweg nötig
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Als DEKRA Stützpunkt können wir die offizielle Hauptuntersuchung und Abgasuntersuchung
              in-house durchführen. Sie sparen Zeit, Wege und bekommen alles aus einer vertrauten Hand.
              Reparaturen im Anschluss erledigen wir direkt in unserer Werkstatt.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/kontakt?betreff=HU+AU+Termin"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-primary-dark transition-colors rounded whitespace-nowrap"
            >
              Termin vereinbaren
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* Gratis Vorabcheck */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16 md:mb-20">
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
              Unser Vorteil für Sie
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Gratis HU-Vorabcheck
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Dank unseres kostenlosen Vorab-Checks kommen Sie entspannt zu Ihrer neuen Plakette –
              und bekommen alles aus einer Hand. Wir stellen sicher, dass Sie bei eventuell vorhandenen
              Mängeln nicht ein zweites Mal zur Untersuchung müssen. Das spart Ihnen Zeit und
              unnötige Kosten.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Hauptuntersuchung (HU) inkl. kostenlosem Vorab-Check',
                'Abgasuntersuchung (AU)',
                'Eintragungen',
                'Gasprüfung auf Anfrage',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/kontakt?betreff=HU+AU+Termin"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors rounded text-sm"
            >
              Jetzt Termin anfragen
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="bg-neutral-50 rounded-xl p-8 border border-neutral-200">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-primary" strokeWidth={1.5} />
              <h3 className="font-semibold text-neutral-900">Ihr HU ist demnächst fällig?</h3>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed mb-4">
              Am besten vereinbaren Sie noch heute Ihren Wunschtermin. So verpassen Sie nicht
              den vorgeschriebenen Termin und riskieren keine Strafgebühr.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Sie möchten an den nächsten HU-/AU-Termin erinnert werden? Wir übernehmen das
              gerne für Sie – sprechen Sie uns einfach an.
            </p>
          </div>
        </div>

        {/* Leistungen Grid */}
        <div className="mb-16 md:mb-20">
          <div className="mb-10">
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-3">
              Leistungen
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Was wir für Sie prüfen
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {leistungen.map((leistung, index) => {
              const Icon = leistung.icon;
              return (
                <div key={index} className="flex flex-col bg-white border border-neutral-200 rounded-xl p-7">
                  <div className="mb-5">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {leistung.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {leistung.description}
                  </p>
                  <ul className="space-y-2.5 flex-1">
                    {leistung.items.map((item, i) => (
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
        </div>

        {/* Ablauf */}
        <div className="bg-neutral-50 rounded-xl p-8 md:p-12 mb-16 md:mb-20">
          <div className="mb-8">
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-3">
              So einfach geht's
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Ablauf der Hauptuntersuchung
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Termin vereinbaren', text: 'Rufen Sie uns an oder schreiben Sie uns – wir finden schnell einen passenden Termin.' },
              { step: '02', title: 'Fahrzeug abgeben', text: 'Bringen Sie Ihr Fahrzeug zu uns. Gerne stellen wir Ihnen ein Ersatzfahrzeug zur Verfügung.' },
              { step: '03', title: 'Prüfung & ggf. Reparatur', text: 'Wir prüfen Ihr Fahrzeug und beheben eventuelle Mängel direkt in unserer Werkstatt.' },
              { step: '04', title: 'DEKRA Plakette', text: 'Nach bestandener HU erhalten Sie die offizielle DEKRA Plakette – alles aus einer Hand.' },
            ].map((item) => (
              <div key={item.step}>
                <p className="text-3xl font-bold text-primary/20 mb-3">{item.step}</p>
                <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DEKRA Zeiten vor Ort */}
        <div className="mb-16 md:mb-20">
          <div className="mb-8">
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-3">
              DEKRA vor Ort
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              DEKRA-Prüfzeiten bei Autohaus Küppers
            </h2>
            <p className="text-neutral-600 mt-3 max-w-2xl text-sm">
              Sie können zu folgenden Zeiten spontan vorbeikommen und Ihr Fahrzeug prüfen lassen.
              Einen vorherigen Termin benötigen Sie nur, wenn wir Ihr Fahrzeug vorab durchchecken sollen.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { tag: 'Montag', zeit: '[Platzhalter]' },
              { tag: 'Dienstag', zeit: '[Platzhalter]' },
              { tag: 'Mittwoch', zeit: '[Platzhalter]' },
              { tag: 'Donnerstag', zeit: '[Platzhalter]' },
              { tag: 'Freitag', zeit: '[Platzhalter]' },
            ].map((d) => (
              <div key={d.tag} className="border border-neutral-200 rounded-xl p-5 text-center">
                <div className="flex justify-center mb-3">
                  <Clock className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <p className="font-semibold text-neutral-900 text-sm mb-1">{d.tag}</p>
                <p className="text-xs text-neutral-500">{d.zeit}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-400 mt-4">
            * Zeiten werden noch bekannt gegeben. Bitte bei Fragen telefonisch anfragen.
          </p>
        </div>

        {/* HU-Fristen Tabelle */}
        <div className="mb-16 md:mb-20">
          <div className="mb-8">
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-3">
              Übersicht
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Wann muss welches Fahrzeug zur HU?
            </h2>
            <p className="text-neutral-600 mt-3 max-w-2xl text-sm leading-relaxed">
              Die Fristen beginnen mit dem Monat und Jahr der letzten Hauptuntersuchung bzw. der
              Erstzulassung. Wer die HU um mehr als 2 Monate versäumt, zahlt 20 % Aufschlag auf
              die Prüfgebühr.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="text-left px-4 py-3 font-medium rounded-tl-lg">Fahrzeugart</th>
                  <th className="text-left px-4 py-3 font-medium">Zul. Gesamtgewicht</th>
                  <th className="text-left px-4 py-3 font-medium">Erste Untersuchung</th>
                  <th className="text-left px-4 py-3 font-medium rounded-tr-lg">Folgeuntersuchungen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {[
                  { art: 'Krafträder & Pkw', gwicht: '–', erst: 'nach 24 Monaten', folge: 'alle 24 Monate' },
                  { art: 'Wohnmobile', gwicht: 'bis 3.500 kg', erst: 'nach 36 Monaten', folge: 'alle 24 Monate' },
                  { art: 'Wohnmobile', gwicht: '3.500–7.500 kg', erst: 'nach 24 Monaten', folge: 'alle 24 Monate; ab 7. Jahr alle 12 Monate' },
                  { art: 'Wohnmobile', gwicht: 'über 7.500 kg', erst: 'nach 12 Monaten', folge: 'alle 12 Monate' },
                  { art: 'Anhänger (ungebremst)', gwicht: 'bis 750 kg', erst: 'nach 36 Monaten', folge: 'alle 24 Monate' },
                  { art: 'Anhänger', gwicht: '750–3.500 kg', erst: 'nach 36 Monaten', folge: 'alle 24 Monate' },
                  { art: 'Anhänger', gwicht: '3.500–10.000 kg', erst: 'nach 24 Monaten', folge: 'alle 24 Monate' },
                  { art: 'Lkw / Nutzfahrzeuge', gwicht: 'bis 3.500 kg', erst: 'nach 24 Monaten', folge: 'alle 24 Monate' },
                  { art: 'Lkw / Nutzfahrzeuge', gwicht: '3.500–7.500 kg', erst: 'nach 12 Monaten', folge: 'alle 12 Monate' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="px-4 py-3 text-neutral-900 font-medium">{row.art}</td>
                    <td className="px-4 py-3 text-neutral-600">{row.gwicht}</td>
                    <td className="px-4 py-3 text-neutral-600">{row.erst}</td>
                    <td className="px-4 py-3 text-neutral-600">{row.folge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-neutral-400 mt-3">
            Quelle: ADAC / StVZO. Angaben ohne Gewähr – bitte im Einzelfall prüfen.
          </p>
        </div>

        {/* Kontakt CTA */}
        <div className="bg-neutral-100 rounded-xl p-8 md:p-12">
          <div className="max-w-2xl">
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
              Termin
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              HU oder AU fällig? Wir kümmern uns.
            </h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              Unsere Werkstatt ist Mo.–Fr. von {CONTENT.hours.service.monFri} für Sie geöffnet.
              Vereinbaren Sie jetzt Ihren Termin für die Hauptuntersuchung.
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
                href="/kontakt?betreff=HU+AU+Termin"
                className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-900 px-6 py-3 font-medium hover:border-primary hover:text-primary transition-colors rounded"
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
