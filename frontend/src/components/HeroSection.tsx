'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { API_URL } from '@/lib/constants';

interface CarouselImage {
  id: string;
  url: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  order: number;
}

export default function HeroSection() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchCarouselImages();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  const fetchCarouselImages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/carousel`);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching carousel images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (isLoading) {
    return (
      <section className="relative w-full h-[85vh] min-h-[600px] bg-neutral-100">
        <div className="absolute inset-0 animate-pulse bg-neutral-200" />
      </section>
    );
  }

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
      {/* Background Images */}
      {images.length > 0 ? (
        images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.url.startsWith('http') ? image.url : `${API_URL}${image.url}`}
              alt={image.alt || 'Autohaus Küppers'}
              fill
              className="object-cover"
              priority={index === 0}
              unoptimized
            />
          </div>
        ))
      ) : (
        <div className="absolute inset-0 bg-neutral-800" />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-xl">
          {/* Tagline */}
          <p className="text-white/80 text-sm tracking-[0.2em] uppercase mb-4">
            Citroën Vertragshändler
          </p>

          {/* Main Headline */}
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Autohaus Küppers
          </h1>

          {/* Subtitle */}
          <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-10">
            Qualität und Service seit über 30 Jahren.
            Ihr Partner für Neuwagen, Vorführwagen und Gebrauchtwagen in Goch.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/fahrzeuge"
              className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 text-base font-medium hover:bg-primary-dark transition-colors"
            >
              Fahrzeuge entdecken
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center border border-white/40 text-white px-8 py-4 text-base font-medium hover:bg-white/10 transition-colors"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Vorheriges Bild"
          >
            <ChevronLeft size={32} strokeWidth={1.5} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Nächstes Bild"
          >
            <ChevronRight size={32} strokeWidth={1.5} />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-0.5 transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-4 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Gehe zu Bild ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
