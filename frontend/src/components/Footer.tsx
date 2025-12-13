import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Wrench } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Autohaus Küppers GmbH</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  Asperdener Straße 2-4
                  <br />
                  47574 Goch
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+4928233143" className="hover:underline">
                  +49 (0) 2823 3143
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+4928231263" className="hover:underline">
                  +49 (0) 2823 1263
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@auto-kueppers.de" className="hover:underline">
                  info@auto-kueppers.de
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours - Verkauf */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Öffnungszeiten
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold mb-1">Verkauf</p>
                <p className="text-white/90">Mo. - Fr.</p>
                <p className="text-white/90">9-13.00 Uhr</p>
                <p className="text-white/90">15-17.30 Uhr</p>
              </div>
            </div>
          </div>

          {/* Opening Hours - Service & Parts */}
          <div>
            <h3 className="text-lg font-bold mb-4 opacity-0 md:opacity-100">
              <Clock className="w-5 h-5 invisible" />
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold mb-1">Kundendienst, Werkstatt</p>
                <p className="text-white/90">Mo. - Fr.</p>
                <p className="text-white/90">7.30-12.00 Uhr</p>
                <p className="text-white/90">13-17.00 Uhr</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Ersatzteile</p>
                <p className="text-white/90">Mo. - Fr.</p>
                <p className="text-white/90">7.30-12.00 Uhr</p>
                <p className="text-white/90">13-16.30 Uhr</p>
              </div>
            </div>
          </div>

          {/* Emergency Service */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Pannenhilfe
            </h3>
            <div className="text-sm space-y-2">
              <p className="text-white/90 leading-relaxed">
                Sie sind irgendwo stehengeblieben? Kein Problem. Unser Pannenservice hilft Ihnen vor
                Ort.
              </p>
              
                <a href="tel:+4928233143"
                className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors mt-2"
              >
                <Phone className="w-4 h-4" />
                0 28 23 - 31 43
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-white/80 text-center sm:text-left">
            © {new Date().getFullYear()} Autohaus Küppers GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:underline text-white/90 hover:text-white">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:underline text-white/90 hover:text-white">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}