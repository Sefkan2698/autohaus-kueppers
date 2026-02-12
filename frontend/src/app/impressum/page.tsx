export default function ImpressumPage() {
  return (
    <main className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
            Rechtliches
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            Impressum
          </h1>
        </div>

        <div className="space-y-12">
          {/* Angaben gemäß § 5 TMG */}
          <section>
            <h2 className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
              Angaben gemäß § 5 TMG
            </h2>
            <div className="text-neutral-600 leading-relaxed space-y-4">
              <p>
                Autohaus Küppers GmbH<br />
                Asperdener Straße 2-4<br />
                47574 Goch
              </p>
              <p>
                <span className="text-neutral-900 font-medium">Handelsregister:</span> 1677<br />
                <span className="text-neutral-900 font-medium">Registergericht:</span> Amtsgericht Kleve
              </p>
              <p>
                <span className="text-neutral-900 font-medium">Vertreten durch die Geschäftsführer:</span> Hans-Theo Küppers
              </p>
            </div>
          </section>

          {/* Kontakt */}
          <section>
            <h2 className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
              Kontakt
            </h2>
            <div className="text-neutral-600 leading-relaxed">
              <p>
                <span className="text-neutral-900 font-medium">Telefon:</span> 0 28 23 - 31 43<br />
                <span className="text-neutral-900 font-medium">Telefax:</span> 0 28 23 - 12 63<br />
                <span className="text-neutral-900 font-medium">E-Mail:</span>{' '}
                <a href="mailto:info@auto-kueppers.de" className="text-neutral-900 hover:text-neutral-600 transition-colors">
                  info@auto-kueppers.de
                </a>
              </p>
            </div>
          </section>

          {/* Umsatzsteuer */}
          <section>
            <h2 className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
              Umsatzsteuer
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: DE 1777 93 709
            </p>
          </section>

          {/* Verantwortlich für den Inhalt */}
          <section>
            <h2 className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Autohaus Küppers GmbH<br />
              Hans-Theo Küppers<br />
              Asperdener Straße 2-4<br />
              47574 Goch
            </p>
          </section>

          {/* Streitschlichtung */}
          <section>
            <h2 className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
              Streitschlichtung
            </h2>
            <div className="text-neutral-600 leading-relaxed space-y-4">
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </section>

          {/* Haftung für Inhalte */}
          <section>
            <h2 className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
              Haftung für Inhalte
            </h2>
            <div className="text-neutral-600 leading-relaxed space-y-4">
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
                rechtswidrige Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
                allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
                erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
                Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
                entfernen.
              </p>
            </div>
          </section>

          {/* Haftung für Links */}
          <section>
            <h2 className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
              Haftung für Links
            </h2>
            <div className="text-neutral-600 leading-relaxed space-y-4">
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
                übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt
                der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
                Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p>
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
                Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
                Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </div>
          </section>

          {/* Urheberrecht */}
          <section>
            <h2 className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
              Urheberrecht
            </h2>
            <div className="text-neutral-600 leading-relaxed space-y-4">
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads
                und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch
                gestattet.
              </p>
              <p>
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
                Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
                gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
                werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
                Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
