import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Company Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col">
            <p className="text-primary font-semibold mb-5">Autohaus Küppers GmbH</p>
            <div className="space-y-3 text-sm text-neutral-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-neutral-400" strokeWidth={1.5} />
                <span>
                  Asperdener Straße 2-4
                  <br />
                  47574 Goch
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 text-neutral-400" strokeWidth={1.5} />
                <a href="tel:+4928233143" className="hover:text-neutral-900 transition-colors">
                  +49 (0) 2823 3143
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 overflow-hidden mt-auto pt-3">
              <Mail className="w-4 h-4 flex-shrink-0 text-neutral-400" strokeWidth={1.5} />
              <a href="mailto:info@auto-kueppers.de" className="hover:text-neutral-900 transition-colors text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                info@auto-kueppers.de
              </a>
            </div>
          </div>

          {/* Opening Hours - Verkauf */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col">
            <p className="text-primary font-semibold mb-5">Verkauf</p>
            <div className="text-sm text-neutral-600 space-y-1.5">
              <p><span className="font-medium">Mo.–Do.:</span> 9:00–13:00 & 15:00–17:30 Uhr</p>
              <p><span className="font-medium">Fr.:</span> 9:00–13:00 & 15:00–17:00 Uhr</p>
            </div>
            <div className="flex items-center gap-2 overflow-hidden mt-auto pt-3">
              <Mail className="w-4 h-4 flex-shrink-0 text-neutral-400" strokeWidth={1.5} />
              <a href="mailto:ht.kueppers@auto-kueppers.de" className="hover:text-neutral-900 transition-colors text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                ht.kueppers@auto-kueppers.de
              </a>
            </div>
          </div>

          {/* Opening Hours - Werkstatt */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col">
            <p className="text-primary font-semibold mb-5">Werkstatt</p>
            <div className="text-sm text-neutral-600 space-y-1.5">
              <p><span className="font-medium">Mo.–Fr.:</span> 7:30–12:00 & 13:00–17:00 Uhr</p>
            </div>
            <div className="flex items-center gap-2 overflow-hidden mt-auto pt-3">
              <Mail className="w-4 h-4 flex-shrink-0 text-neutral-400" strokeWidth={1.5} />
              <a href="mailto:info@auto-kueppers.de" className="hover:text-neutral-900 transition-colors text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                info@auto-kueppers.de
              </a>
            </div>
          </div>

          {/* Emergency Service */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-primary font-semibold mb-5">Pannenhilfe</p>
            <p className="text-sm text-neutral-600 mb-5">
              Liegengeblieben? Wir helfen vor Ort.
            </p>
            <a
              href="tel:+4928233143"
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors rounded-lg"
            >
              <Phone className="w-4 h-4" strokeWidth={1.5} />
              Jetzt anrufen
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-neutral-700">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-300 mb-8">
            <Link href="/gewerbe" className="hover:text-white transition-colors">
              Gewerbebereich
            </Link>
            <Link href="/dekra-stuetzpunkt" className="hover:text-white transition-colors">
              DEKRA Stützpunkt
            </Link>
            <Link href="/aktionen/citroen-foerderung" className="hover:text-white transition-colors text-primary font-medium">
              E-Fahrzeuge & Förderung
            </Link>
            <Link href="/jobs" className="hover:text-white transition-colors">
              Karriere
            </Link>
            <Link href="/elektro-faq" className="hover:text-white transition-colors">
              Elektro FAQ
            </Link>
            <Link href="/karriere/bewerbungsformular" className="hover:text-white transition-colors">
              Bewerbungsformular
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-neutral-700 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-neutral-400">
          <p>
            © {new Date().getFullYear()} Autohaus Küppers GmbH
          </p>
          <p className="text-neutral-500 text-xs">
            Created by{' '}
            <a
              href="https://sakaits.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-white transition-colors"
            >
              Saka IT-Solutions
            </a>
          </p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
