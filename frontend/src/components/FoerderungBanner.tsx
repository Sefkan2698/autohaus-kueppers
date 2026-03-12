import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function FoerderungBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      <Link href="/aktionen/citroen-foerderung" className="block group">
        <div className="relative w-full aspect-[16/7] md:aspect-[21/7]">
          <Image
            src="/images/banner/foerderung.png"
            alt="Citroën Förderprämie 2026 – bis zu 12.000 € Ersparnis"
            fill
            className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
          />
          {/* Subtle overlay for button readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* CTA Button */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-8">
            <span className="inline-flex items-center gap-2 bg-primary/80 backdrop-blur-md border border-primary/40 text-white px-6 py-3 font-medium text-sm md:text-base hover:bg-primary/95 transition-colors rounded shadow-lg whitespace-nowrap">
              Jetzt E-Autos &amp; Prämien entdecken
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}