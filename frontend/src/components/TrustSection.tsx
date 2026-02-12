'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const stats = [
  { value: '30+', label: 'Jahre Erfahrung' },
  { value: '4.8', label: 'Sterne bei Google' },
  { value: '1993', label: 'Gegründet' },
  { value: '2.', label: 'Generation' },
];

const reviews = [
  '/images/reviews/review1.png',
  '/images/reviews/review2.png',
  '/images/reviews/review3.png',
  '/images/reviews/review4.png',
  '/images/reviews/review5.png',
  '/images/reviews/review6.png',
  '/images/reviews/review7.png',
  '/images/reviews/review8.png',
];

export default function TrustSection() {
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-24 md:py-32 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
            Vertrauen
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 max-w-lg text-primary">
            Warum uns Kunden vertrauen
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center md:text-left">
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-neutral-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Quote Section */}
          <div className="flex flex-col justify-center">
            <blockquote className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-8">
              „Bei uns erhalten Sie nicht nur ein Fahrzeug – Sie werden Teil der Familie.
              Persönlicher Service, faire Preise und langfristige Betreuung sind unser Anspruch."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-neutral-200 overflow-hidden">
                <Image
                  src="/images/worker/gf.jpg"
                  alt="Hans-Theo Küppers"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-neutral-900">Hans-Theo Küppers</p>
                <p className="text-sm text-neutral-500">Geschäftsführer</p>
              </div>
            </div>
          </div>

          {/* Reviews Carousel */}
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
              Google Bewertungen
            </p>

            <div className="relative bg-white">
              <Image
                src={reviews[currentReview]}
                alt={`Google Bewertung ${currentReview + 1}`}
                width={800}
                height={600}
                className="w-full h-auto"
                unoptimized
              />

              {/* Navigation */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={prevReview}
                  className="w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
                  aria-label="Vorherige Bewertung"
                >
                  <ChevronLeft className="w-5 h-5 text-neutral-900" strokeWidth={1.5} />
                </button>
                <button
                  onClick={nextReview}
                  className="w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
                  aria-label="Nächste Bewertung"
                >
                  <ChevronRight className="w-5 h-5 text-neutral-900" strokeWidth={1.5} />
                </button>
              </div>

              {/* Counter */}
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 text-white text-sm">
                {currentReview + 1} / {reviews.length}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-2 h-2 transition-colors ${
                    currentReview === index ? 'bg-primary' : 'bg-neutral-300'
                  }`}
                  aria-label={`Zu Bewertung ${index + 1} gehen`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
