'use client';

import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FoerderungPopup() {
  const [visible, setVisible] = useState(true);

  const close = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={close}
    >
      <div
        className="relative max-w-2xl w-full rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={close}
          aria-label="Schließen"
          className="absolute top-1.5 right-1.5 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Banner image */}
        <Image
          src="/images/banner/foerderung.png"
          alt="Citroën Förderprämie – Jetzt bis zu 12.000 € sichern"
          width={1200}
          height={600}
          className="w-full h-auto block"
          priority
        />

        {/* Button bar */}
        <div className="bg-white px-6 py-4 flex items-center justify-between gap-4">
          <p className="text-sm text-neutral-600">Citroën Förderprämie 2026</p>
          <Link
            href="/aktionen/citroen-foerderung"
            onClick={close}
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors rounded-lg whitespace-nowrap"
          >
            Jetzt E-Autos & Prämien entdecken
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
