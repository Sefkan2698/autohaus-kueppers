import Link from 'next/link';
import { Phone, ArrowRight, MapPin, Clock } from 'lucide-react';
import { CONTENT } from '@/lib/constants';

export default function KontaktCTA() {
  return (
    <section className="bg-neutral-50 border-t border-neutral-100 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Left: CTA */}
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
              Kontakt
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 leading-tight">
              Wir sind für Sie da
            </h2>
            <p className="text-neutral-600 text-base leading-relaxed mb-8 max-w-md">
              Ob Probefahrt, Kaufberatung oder Werkstatt-Termin –
              unser Team in Goch beantwortet alle Ihre Fragen persönlich.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${CONTENT.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-semibold hover:bg-primary-dark transition-colors rounded"
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                {CONTENT.phone}
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-900 px-6 py-3 font-medium hover:border-primary hover:text-primary transition-colors rounded"
              >
                Kontaktformular
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          {/* Right: Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-neutral-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
                <p className="text-neutral-500 text-xs uppercase tracking-wider">Verkauf</p>
              </div>
              <p className="text-neutral-900 text-sm font-medium mb-1">Mo.–Do.</p>
              <p className="text-neutral-500 text-xs mb-2">9:00–13:00 & 15:00–18:00 Uhr</p>
              <p className="text-neutral-900 text-sm font-medium mb-1">Fr.</p>
              <p className="text-neutral-500 text-xs">9:00–13:00 & 15:00–17:00 Uhr</p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
                <p className="text-neutral-500 text-xs uppercase tracking-wider">Werkstatt</p>
              </div>
              <p className="text-neutral-900 text-sm font-medium mb-1">Mo.–Fr.</p>
              <p className="text-neutral-500 text-xs">7:30–12:00 & 13:00–17:00 Uhr</p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl p-5 sm:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
                <p className="text-neutral-500 text-xs uppercase tracking-wider">Adresse</p>
              </div>
              <p className="text-neutral-900 text-sm">Asperdener Straße 2-4 · 47574 Goch</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}