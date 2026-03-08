import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
      {/* Festes Hintergrundbild */}
      <Image
        src="/images/homebg/homebg.jpg"
        alt="Autohaus Küppers"
        fill
        className="object-cover"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      {/* Citroën Badge - Top Right */}
      <div className="absolute top-24 right-6 lg:right-8 z-10">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded">
          <p className="text-white text-sm font-medium tracking-wide">
            Citroën Vertragshändler
          </p>
        </div>
      </div>

      {/* Content Box - Mittig Links */}
      <div className="absolute z-10 top-1/2 -translate-y-1/2 left-6 lg:left-8 w-[calc(100%-3rem)] sm:w-auto max-w-xl">
        <div className="bg-black/30 backdrop-blur-md border border-white/10 p-5 md:p-7 rounded-lg flex flex-col text-left items-start">
          <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-2">
            Autohaus Küppers
          </h1>
          <p className="text-white/90 text-sm md:text-base leading-relaxed mb-5">
            Qualität und Service seit über 30 Jahren. Ihr Partner für Neuwagen, Vorführwagen und Gebrauchtwagen in Goch.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/fahrzeuge"
              className="inline-flex items-center justify-center bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors rounded"
            >
              Fahrzeuge entdecken
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 text-sm font-medium hover:bg-white/20 transition-colors rounded"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
