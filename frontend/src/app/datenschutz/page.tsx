export default function DatenschutzPage() {
  return (
    <main className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
            Rechtliches
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            Datenschutzerklärung
          </h1>
        </div>

        <div className="space-y-16">
          {/* 1. Datenschutz auf einen Blick */}
          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-6 pb-4 border-b border-neutral-200">
              1. Datenschutz auf einen Blick
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Allgemeine Hinweise
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                  personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene
                  Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                  Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem
                  Text aufgeführten Datenschutzerklärung.
                </p>
              </div>

              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Datenerfassung auf unserer Website
                </h3>

                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <div>
                    <p className="text-neutral-900 font-medium text-sm mb-1">
                      Wer ist verantwortlich für die Datenerfassung auf dieser Website?
                    </p>
                    <p>
                      Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
                      Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                    </p>
                  </div>

                  <div>
                    <p className="text-neutral-900 font-medium text-sm mb-1">
                      Wie erfassen wir Ihre Daten?
                    </p>
                    <p>
                      Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei
                      kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                    </p>
                    <p className="mt-2">
                      Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme
                      erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem
                      oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch,
                      sobald Sie unsere Website betreten.
                    </p>
                  </div>

                  <div>
                    <p className="text-neutral-900 font-medium text-sm mb-1">
                      Wofür nutzen wir Ihre Daten?
                    </p>
                    <p>
                      Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
                      gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet
                      werden.
                    </p>
                  </div>

                  <div>
                    <p className="text-neutral-900 font-medium text-sm mb-1">
                      Welche Rechte haben Sie bezüglich Ihrer Daten?
                    </p>
                    <p>
                      Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und
                      Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein
                      Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu
                      sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im
                      Impressum angegebenen Adresse an uns wenden.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Analyse-Tools und Tools von Drittanbietern
                </h3>
                <div className="text-neutral-600 leading-relaxed space-y-4">
                  <p>
                    Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden.
                    Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen. Die Analyse
                    Ihres Surf-Verhaltens erfolgt in der Regel anonym; das Surf-Verhalten kann nicht zu
                    Ihnen zurückverfolgt werden.
                  </p>
                  <p>
                    Sie können dieser Analyse widersprechen. Über die Widerspruchsmöglichkeiten werden wir
                    Sie in dieser Datenschutzerklärung informieren.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Allgemeine Hinweise und Pflichtinformationen */}
          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-6 pb-4 border-b border-neutral-200">
              2. Allgemeine Hinweise und Pflichtinformationen
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Datenschutz
                </h3>
                <div className="text-neutral-600 leading-relaxed space-y-4">
                  <p>
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir
                    behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
                    Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                  </p>
                  <p>
                    Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
                    Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden
                    können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und
                    wofür wir sie nutzen.
                  </p>
                  <p>
                    Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der
                    Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der
                    Daten vor dem Zugriff durch Dritte ist nicht möglich.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Hinweis zur verantwortlichen Stelle
                </h3>
                <div className="text-neutral-600 leading-relaxed space-y-4">
                  <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                  <p>
                    Imfrigo KG<br />
                    Josef van Sambeck<br />
                    Tichelweg 5<br />
                    47574 Goch
                  </p>
                  <p>
                    Telefon: +49 2823 2530<br />
                    E-Mail: info@imfrigo.de
                  </p>
                  <p>
                    Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
                    gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von
                    personenbezogenen Daten entscheidet.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Widerruf Ihrer Einwilligung zur Datenverarbeitung
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung
                  möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu
                  reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum
                  Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
                </p>
              </div>

              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Widerspruchsrecht gegen die Datenerhebung (Art. 21 DSGVO)
                </h3>
                <div className="text-neutral-600 leading-relaxed space-y-4">
                  <p>
                    Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO
                    erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen
                    Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch
                    einzulegen.
                  </p>
                  <p>
                    Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, so
                    haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung einzulegen.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Beschwerderecht bei der zuständigen Aufsichtsbehörde
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei
                  einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen
                  Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu.
                </p>
              </div>

              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Recht auf Datenübertragbarkeit
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in
                  Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in
                  einem gängigen, maschinenlesbaren Format aushändigen zu lassen.
                </p>
              </div>

              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  SSL- bzw. TLS-Verschlüsselung
                </h3>
                <div className="text-neutral-600 leading-relaxed space-y-4">
                  <p>
                    Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
                    Inhalte eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
                    daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt.
                  </p>
                  <p>
                    Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns
                    übermitteln, nicht von Dritten mitgelesen werden.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Auskunft, Sperrung, Löschung und Berichtigung
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf
                  unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren
                  Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf
                  Berichtigung, Sperrung oder Löschung dieser Daten.
                </p>
              </div>

              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Recht auf Einschränkung der Verarbeitung
                </h3>
                <div className="text-neutral-600 leading-relaxed space-y-4">
                  <p>
                    Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
                    zu verlangen. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
                  </p>
                  <ul className="list-none space-y-2 pl-4 border-l-2 border-neutral-200">
                    <li>Wenn Sie die Richtigkeit Ihrer Daten bestreiten</li>
                    <li>Wenn die Verarbeitung Ihrer Daten unrechtmäßig geschah</li>
                    <li>Wenn wir Ihre Daten nicht mehr benötigen, Sie sie jedoch zur Geltendmachung von Rechtsansprüchen benötigen</li>
                    <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Widerspruch gegen Werbe-E-Mails
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur
                  Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien
                  wird hiermit widersprochen.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Datenerfassung auf unserer Website */}
          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-6 pb-4 border-b border-neutral-200">
              3. Datenerfassung auf unserer Website
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Cookies
                </h3>
                <div className="text-neutral-600 leading-relaxed space-y-4">
                  <p>
                    Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem
                    Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser
                    Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
                  </p>
                  <p>
                    Die meisten der von uns verwendeten Cookies sind so genannte &quot;Session-Cookies&quot;. Sie
                    werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem
                    Endgerät gespeichert bis Sie diese löschen.
                  </p>
                  <p>
                    Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies
                    informiert werden und Cookies nur im Einzelfall erlauben.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Server-Log-Dateien
                </h3>
                <div className="text-neutral-600 leading-relaxed space-y-4">
                  <p>
                    Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
                    Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                  </p>
                  <ul className="list-none space-y-1 pl-4 border-l-2 border-neutral-200">
                    <li>Browsertyp und Browserversion</li>
                    <li>verwendetes Betriebssystem</li>
                    <li>Referrer URL</li>
                    <li>Hostname des zugreifenden Rechners</li>
                    <li>Uhrzeit der Serveranfrage</li>
                    <li>IP-Adresse</li>
                  </ul>
                  <p>Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Anfrage per E-Mail, Telefon oder Telefax
                </h3>
                <div className="text-neutral-600 leading-relaxed space-y-4">
                  <p>
                    Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage
                    inklusive aller daraus hervorgehenden personenbezogenen Daten zum Zwecke der
                    Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
                  </p>
                  <p>
                    Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis
                    Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der
                    Zweck für die Datenspeicherung entfällt.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Plugins und Tools */}
          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-6 pb-4 border-b border-neutral-200">
              4. Plugins und Tools
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  YouTube mit erweitertem Datenschutz
                </h3>
                <div className="text-neutral-600 leading-relaxed space-y-4">
                  <p>
                    Unsere Website nutzt Plugins der Website YouTube. Betreiber der Seiten ist die
                    YouTube, LLC, 901 Cherry Ave., San Bruno, CA 94066, USA.
                  </p>
                  <p>
                    Wir nutzen YouTube im erweiterten Datenschutzmodus. Dieser Modus bewirkt laut YouTube,
                    dass YouTube keine Informationen über die Besucher auf dieser Website speichert, bevor
                    diese sich das Video ansehen.
                  </p>
                  <p>
                    Weitere Informationen über Datenschutz bei YouTube finden Sie in deren
                    Datenschutzerklärung unter:{' '}
                    <a
                      href="https://policies.google.com/privacy?hl=de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-900 hover:text-neutral-600 transition-colors"
                    >
                      https://policies.google.com/privacy?hl=de
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Google Maps
                </h3>
                <div className="text-neutral-600 leading-relaxed space-y-4">
                  <p>
                    Diese Seite nutzt über eine API den Kartendienst Google Maps. Anbieter ist die Google
                    Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
                  </p>
                  <p>
                    Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP Adresse zu
                    speichern. Diese Informationen werden in der Regel an einen Server von Google in den
                    USA übertragen und dort gespeichert.
                  </p>
                  <p>
                    Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung
                    von Google:{' '}
                    <a
                      href="https://policies.google.com/privacy?hl=de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-900 hover:text-neutral-600 transition-colors"
                    >
                      https://policies.google.com/privacy?hl=de
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Zahlungsanbieter und Reseller */}
          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-6 pb-4 border-b border-neutral-200">
              5. Zahlungsanbieter und Reseller
            </h2>

            <div>
              <h3 className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                PayPal
              </h3>
              <div className="text-neutral-600 leading-relaxed space-y-4">
                <p>
                  Auf unserer Website bieten wir u.a. die Bezahlung via PayPal an. Anbieter dieses
                  Zahlungsdienstes ist die PayPal (Europe) S.à.r.l. et Cie, S.C.A., 22-24 Boulevard
                  Royal, L-2449 Luxembourg.
                </p>
                <p>
                  Wenn Sie die Bezahlung via PayPal auswählen, werden die von Ihnen eingegebenen
                  Zahlungsdaten an PayPal übermittelt.
                </p>
                <p>
                  Die Übermittlung Ihrer Daten an PayPal erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a
                  DSGVO (Einwilligung) und Art. 6 Abs. 1 lit. b DSGVO (Verarbeitung zur Erfüllung eines
                  Vertrags).
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
