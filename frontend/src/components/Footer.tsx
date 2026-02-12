import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div>
            <p className="text-white font-semibold mb-6">Autohaus Küppers GmbH</p>
            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <span>
                  Asperdener Straße 2-4
                  <br />
                  47574 Goch
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                <a href="tel:+4928233143" className="hover:text-white transition-colors">
                  +49 (0) 2823 3143
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                <a href="mailto:info@auto-kueppers.de" className="hover:text-white transition-colors">
                  info@auto-kueppers.de
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours - Verkauf */}
          <div>
            <p className="text-white font-semibold mb-6">Verkauf</p>
            <div className="text-sm text-neutral-400 space-y-2">
              <div className="flex justify-between gap-4">
                <span>Mo. – Do.</span>
                <span className="text-right">9:00 – 13:00 Uhr<br />15:00 – 18:00 Uhr</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Fr.</span>
                <span className="text-right">9:00 – 13:00 Uhr<br />15:00 – 17:00 Uhr</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Sa.</span>
                <span className="text-right">9:00 – 12:30 Uhr</span>
              </div>
            </div>
          </div>

          {/* Opening Hours - Werkstatt */}
          <div>
            <p className="text-white font-semibold mb-6">Werkstatt</p>
            <div className="text-sm text-neutral-400 space-y-2">
              <div className="flex justify-between gap-4">
                <span>Mo. – Fr.</span>
                <span className="text-right">7:30 – 12:00 Uhr<br />13:00 – 17:00 Uhr</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Sa.</span>
                <span className="text-right">9:00 – 12:30 Uhr</span>
              </div>
            </div>
          </div>

          {/* Emergency Service */}
          <div>
            <p className="text-white font-semibold mb-6">Pannenhilfe</p>
            <p className="text-sm text-neutral-400 mb-4">
              Liegengeblieben? Wir helfen vor Ort.
            </p>
            <a
              href="tel:+4928233143"
              className="inline-flex items-center gap-2 bg-white text-neutral-900 px-5 py-2.5 text-sm font-medium hover:bg-neutral-100 transition-colors"
            >
              <Phone className="w-4 h-4" strokeWidth={1.5} />
              Jetzt anrufen
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>
            © {new Date().getFullYear()} Autohaus Küppers GmbH
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
