'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: React.ReactNode;
}

const faqs: FaqItem[] = [
  {
    q: 'Was ist der Unterschied zwischen einem Hybrid und einem Plug-in-Hybrid?',
    a: (
      <>
        <p>Ein Hybridfahrzeug fährt mit einer Kombination aus Verbrenner- und Elektromotor. Bei jedem Hybriden lädt sich der Elektromotor während der Fahrt durch Energierückgewinnung auf (z.B. beim Bremsen). Beim Plug-in-Hybrid besteht zudem noch die Möglichkeit des Aufladens per Steckdose.</p>
        <p className="mt-3">Ein weiterer großer Unterschied ist, dass Plug-in-Hybride staatlich gefördert werden können. Außerdem ist die elektrische Reichweite bei Plug-in-Hybriden deutlich größer.</p>
      </>
    ),
  },
  {
    q: 'Was sind Besonderheiten eines Plug-in-Hybriden?',
    a: (
      <p>Plug-in-Hybridfahrzeuge bieten einige Vorteile gegenüber Verbrennern: emissionsfreies Fahren im reinen Elektromodus, geräuscharmes Fahren und niedrige Betriebskosten. Dazu kommt die Flexibilität des herkömmlichen Verbrennungsmotors für längere Fahrten, der das Aufladen der Batterie ohne externe Stromquelle gewährleistet.</p>
    ),
  },
  {
    q: 'Wie viele Ladestationen gibt es in Deutschland?',
    a: (
      <p>In Deutschland verbessert sich die Infrastruktur täglich und es kommen immer mehr Ladestationen für E-Fahrzeuge hinzu. Die Bundesnetzagentur veröffentlicht regelmäßig aktuelle Zahlen unter bundesnetzagentur.de – aktuell sind es bereits deutlich über 100.000 öffentlich zugängliche Ladepunkte.</p>
    ),
  },
  {
    q: 'Sind Elektrofahrzeuge bei einem Unfall gefährlicher als konventionelle Fahrzeuge?',
    a: (
      <p>Grundsätzlich gilt: Alle Autos, die eine Zulassung bekommen, müssen gesetzliche Anforderungen erfüllen, die ein Höchstmaß an Sicherheit garantieren – egal ob mit Benzin, Diesel oder Batterie. Bei Elektroautos sind die elektrischen Komponenten „eigensicher" ausgelegt: Kommt es zu einem Unfall, wird die Batterie sofort automatisch von allen Hochvoltkomponenten getrennt, so dass keine Spannung mehr anliegt.</p>
    ),
  },
  {
    q: 'Wie lange dauert das Aufladen der Batterie?',
    a: (
      <p>Die Ladezeiten von Elektroautos variieren je nach Fahrzeug und Ladeeinrichtung. An einer Wallbox (11 kW) dauert das Laden eines typischen E-Autos 4–8 Stunden. An einem Schnelllader (DC, 50–150 kW) können 80 % Ladestand in 30–60 Minuten erreicht werden. Citroën liefert Ladekabel mit, die das Aufladen an einer haushaltsüblichen Steckdose ermöglichen.</p>
    ),
  },
  {
    q: 'Wie stelle ich einen Förderantrag?',
    a: (
      <p>Unser Team steht Ihnen mit Rat und Tat zur Seite und hilft Ihnen bei allen Fragen zur Förderung. Sprechen Sie uns gerne an – telefonisch unter <strong>+49 (0) 2823 3143</strong> oder persönlich in unserem Autohaus in Goch.</p>
    ),
  },
  {
    q: 'Wie weit komme ich mit einem reinen Elektrofahrzeug?',
    a: (
      <p>Die Reichweite lässt sich nicht verallgemeinern – sie hängt von Außentemperatur, Fahrweise, Klimaanlage und weiteren Faktoren ab. Der Citroën ë-C3 erreicht im WLTP-Zyklus bis zu 326 km, der ë-C3 Aircross bis zu 306 km. Das WLTP-Protokoll ermöglicht eine realistischere Einschätzung unter realen Fahrbedingungen.</p>
    ),
  },
  {
    q: 'Was passiert, wenn ich mein Elektrofahrzeug „leer" fahre?',
    a: (
      <p>Bevor der Akku ganz leer ist, warnt der Bordcomputer mit deutlichen Hinweisen. Das Fahrzeug nimmt keinen Schaden durch eine leere Batterie – es bleibt, wie beim Verbrenner, einfach stehen. Solange die 8-jährige Batteriegarantie von Citroën läuft, schleppt der Hersteller Sie kostenfrei ab. Alternativ ist der ADAC mit geschultem Personal auch bei Elektroauto-Pannen hilfreich.</p>
    ),
  },
  {
    q: 'Hat die Außentemperatur einen Einfluss auf die Batterie?',
    a: (
      <p>Die Batterien sind für alle Jahreszeiten konzipiert. In extremen Situationen kann die Reichweite jedoch sinken: Bei großer Hitze wird Energie zur Kühlung der Batterie verwendet, bei Kälte zur Erwärmung. Die Batterien sind für Temperaturen bis zu −40 °C ausgelegt und funktionieren zuverlässig.</p>
    ),
  },
  {
    q: 'Wie weit komme ich rein elektrisch mit einem Hybrid-Fahrzeug?',
    a: (
      <p>Die meisten Plug-in-Hybride schaffen 40–80 km im reinen Elektromodus. Ein „normaler" Hybrid nutzt den Elektromotor hauptsächlich zur Unterstützung beim Beschleunigen und zum „Segeln" bei höheren Geschwindigkeiten. Der Citroën C5 Aircross Plug-in-Hybrid zum Beispiel bietet eine rein elektrische Reichweite von bis zu 55 km (WLTP).</p>
    ),
  },
  {
    q: 'Kann es passieren, dass ich mein Heimnetz beim Laden überlaste?',
    a: (
      <p>Bei einer normalen Haushaltssteckdose ist die Gefahr gering, sollte aber von einem Elektriker geprüft werden. Empfehlenswert ist die Installation einer Wallbox – sie überwacht den Hausverbrauch und passt die Ladeleistung automatisch an, um eine Überlastung zu vermeiden. Citroën bietet sichere Heimladelösungen an.</p>
    ),
  },
  {
    q: 'Was kostet ein Elektroauto im Unterhalt?',
    a: (
      <>
        <p>Der Unterhalt eines Elektroautos ist in der Regel günstiger als der eines vergleichbaren Verbrenners:</p>
        <ul className="mt-3 space-y-1 list-disc list-inside text-neutral-600">
          <li>10 Jahre von der KFZ-Steuer befreit</li>
          <li>Stromkosten liegen deutlich unter Benzinkosten</li>
          <li>Wartungskosten durchschnittlich 35 % niedriger als beim Benziner</li>
        </ul>
      </>
    ),
  },
  {
    q: 'Brauche ich einen besonderen Führerschein für Elektroautos?',
    a: (
      <p>Nein, für das Fahren eines Elektroautos braucht man keine besondere Fahrerlaubnis. Es reicht der gesetzlich geltende Führerschein der entsprechenden Fahrzeugklasse.</p>
    ),
  },
  {
    q: 'Kann ein Elektroauto überladen werden?',
    a: (
      <p>Nein, ein Elektroauto kann nicht überladen werden. Die Ladetechnik begrenzt automatisch auf 100 % und verlangsamt den Ladevorgang ab ca. 80 %, um die Batterie zu schonen. Das Fahrzeug stoppt den Ladevorgang selbstständig, wenn der Akku voll ist.</p>
    ),
  },
  {
    q: 'Können Elektrofahrzeuge Anhänger ziehen?',
    a: (
      <p>Das ist modellabhängig. Wer beim Kauf weiß, dass er einen Anhänger ziehen möchte, sollte das im Beratungsgespräch ansprechen. Der Citroën C5 Aircross Plug-in-Hybrid zum Beispiel kann eine Anhängelast von 1.300 kg (gebremst) und 750 kg (ungebremst) ziehen.</p>
    ),
  },
  {
    q: 'Können Elektroautos bei Regen aufgeladen werden?',
    a: (
      <p>Ja, das Laden bei Regen ist vollkommen sicher. Alle Ladestecker und Fahrzeuganschlüsse sind nach IP-Schutzklassen zertifiziert und für den Außenbereich geeignet. Es besteht kein Risiko eines Stromschlags bei normalem Gebrauch.</p>
    ),
  },
  {
    q: 'Wie bezahle ich an öffentlichen Ladestationen?',
    a: (
      <p>Zum Bezahlen an öffentlichen Ladestationen gibt es verschiedene Möglichkeiten: Ladekarten (z.B. ADAC, EnBW, Ionity), Apps oder gelegentlich auch Kreditkarte direkt an der Säule. Citroën-Kunden können zudem die <strong>Free2Move App</strong> nutzen, die Zugang zu über 220.000 Ladestationen in ganz Europa bietet und die Planung und Zahlung vereinfacht.</p>
    ),
  },
  {
    q: 'Ist ein Diebstahl des Ladekabels beim Laden möglich?',
    a: (
      <p>Nein, beim Ladevorgang verriegelt das Fahrzeug das Ladekabel automatisch über die Zentralverriegelung. Auch öffentliche Ladesäulen sichern das Kabel beidseitig. Abstöpseln und weglaufen ist für Kabeldiebe somit keine Option.</p>
    ),
  },
  {
    q: 'Wie lange ist die Lebensdauer der Batterie?',
    a: (
      <p>Die Lebensdauer liegt in der Regel bei acht bis zehn Jahren, abhängig von Ladehäufigkeit und Fahrstil. Citroën gibt eine Garantie von <strong>8 Jahren oder 160.000 km</strong> auf die Hochvoltbatterie. Die genauen Garantiebedingungen sind im Serviceheft des jeweiligen Fahrzeugs nachzulesen.</p>
    ),
  },
  {
    q: 'Passen die Ladestecker in jedes Elektroauto?',
    a: (
      <p>In Europa hat sich der <strong>Typ-2-Stecker</strong> (AC) als Standard durchgesetzt. Für Schnellladung (DC) wird in Europa CCS (Combined Charging System) verwendet. Alle Citroën Elektrofahrzeuge sind mit diesen Standardanschlüssen ausgestattet und kompatibel mit dem europäischen Ladenetz.</p>
    ),
  },
];

export default function ElektroFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-neutral-200 border-t border-neutral-200">
      {faqs.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 py-5 text-left"
          >
            <span className={`text-sm md:text-base font-medium ${openIndex === i ? 'text-primary' : 'text-neutral-900'}`}>
              {item.q}
            </span>
            <ChevronDown
              className={`w-5 h-5 flex-shrink-0 text-neutral-400 transition-transform duration-200 ${openIndex === i ? 'rotate-180 text-primary' : ''}`}
              strokeWidth={1.5}
            />
          </button>
          {openIndex === i && (
            <div className="pb-5 text-sm text-neutral-600 leading-relaxed space-y-2">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}