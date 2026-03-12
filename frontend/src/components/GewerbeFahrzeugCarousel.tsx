'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';

const fahrzeuge = [
  {
    name: 'Citroën Berlingo',
    typ: 'Kastenwagen',
    image: '/images/gewerbe/berlingo.png',
    electric: false,
  },
  {
    name: 'Citroën ë-Berlingo',
    typ: 'Elektrisch',
    image: '/images/gewerbe/eberlingo.png',
    electric: true,
  },
  {
    name: 'Citroën Jumpy',
    typ: 'Kastenwagen',
    image: '/images/gewerbe/jumpy.png',
    electric: false,
  },
  {
    name: 'Citroën ë-Jumpy',
    typ: 'Elektrisch',
    image: '/images/gewerbe/ejumpy.png',
    electric: true,
  },
  {
    name: 'Citroën Jumper',
    typ: 'Großraumtransporter',
    image: '/images/gewerbe/jumper.png',
    electric: false,
  },
  {
    name: 'Citroën ë-Jumper',
    typ: 'Elektrisch',
    image: '/images/gewerbe/ejumper.png',
    electric: true,
  },
];

const VISIBLE = 4;
const STEP = 2;
const MAX_START = fahrzeuge.length - VISIBLE; // = 2

export default function GewerbeFahrzeugCarousel() {
  const [start, setStart] = useState(0);

  const prev = () => setStart((s) => Math.max(0, s - STEP));
  const next = () => setStart((s) => Math.min(MAX_START, s + STEP));

  const visible = fahrzeuge.slice(start, start + VISIBLE);
  const page = start / STEP + 1;        // 1 or 2
  const totalPages = MAX_START / STEP + 1; // 2

  return (
    <div>
      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {visible.map((fz) => (
          <div key={fz.name}>
            <div className="relative aspect-[4/3] bg-neutral-100 rounded-xl overflow-hidden">
              <Image
                src={fz.image}
                alt={fz.name}
                fill
                className="object-contain p-4"
              />
              {fz.electric && (
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  <Zap className="w-3 h-3" strokeWidth={2} />
                  100% Elektrisch
                </div>
              )}
            </div>
            <div className="mt-3">
              <p className="text-xs text-neutral-500 uppercase tracking-widest">{fz.typ}</p>
              <p className="font-semibold text-neutral-900 mt-0.5">{fz.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          disabled={start === 0}
          aria-label="Zurück"
          className="p-2.5 border border-neutral-300 rounded-full hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setStart(i * STEP)}
              className={`w-2 h-2 rounded-full transition-colors ${
                page === i + 1 ? 'bg-primary' : 'bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Seite ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={start >= MAX_START}
          aria-label="Weiter"
          className="p-2.5 border border-neutral-300 rounded-full hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}