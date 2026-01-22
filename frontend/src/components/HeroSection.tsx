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
  textPosition?: string;
  link?: string;
  order: number;
}

// Helper function to get position classes
const getPositionClasses = (position: string = 'bottom-left') => {
  const positions: Record<string, string> = {
    'top-left': 'top-24 left-6 lg:left-8',
    'top-center': 'top-24 left-1/2 -translate-x-1/2',
    'top-right': 'top-24 right-6 lg:right-8',
    'middle-left': 'top-1/2 -translate-y-1/2 left-6 lg:left-8',
    'middle-center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'middle-right': 'top-1/2 -translate-y-1/2 right-6 lg:right-8',
    'bottom-left': 'bottom-20 left-6 lg:left-8',
    'bottom-center': 'bottom-20 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-20 right-6 lg:right-8',
  };
  return positions[position] || positions['bottom-left'];
};

// Helper function to get text alignment based on position
const getTextAlignment = (position: string = 'bottom-left') => {
  if (position.includes('center')) return 'text-center items-center';
  if (position.includes('right')) return 'text-right items-end';
  return 'text-left items-start';
};

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

      {/* Subtle Gradient Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      {/* Citroën Badge - Top Right */}
      <div className="absolute top-24 right-6 lg:right-8 z-10">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded">
          <p className="text-white text-sm font-medium tracking-wide">
            Citroën Vertragshändler
          </p>
        </div>
      </div>

      {/* Content Box - Dynamic Position with Blur */}
      {images.length > 0 && images[currentIndex] ? (
        <div
          className={`absolute z-10 w-[calc(100%-3rem)] sm:w-auto max-w-xl ${getPositionClasses(images[currentIndex].textPosition)}`}
        >
          <div className={`bg-black/30 backdrop-blur-md border border-white/10 p-5 md:p-7 rounded-lg flex flex-col ${getTextAlignment(images[currentIndex].textPosition)}`}>
            {/* Title */}
            {images[currentIndex].title && (
              <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-2">
                {images[currentIndex].title}
              </h1>
            )}

            {/* Subtitle */}
            {images[currentIndex].subtitle && (
              <p className="text-white/90 text-sm md:text-base leading-relaxed mb-5">
                {images[currentIndex].subtitle}
              </p>
            )}

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-3 ${images[currentIndex].textPosition?.includes('center') ? 'justify-center' : images[currentIndex].textPosition?.includes('right') ? 'justify-end' : 'justify-start'}`}>
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
      ) : (
        /* Fallback wenn keine Bilder vorhanden */
        <div className="absolute bottom-20 left-6 lg:left-8 z-10 max-w-xl">
          <div className="bg-black/30 backdrop-blur-md border border-white/10 p-5 md:p-7 rounded-lg">
            <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-2">
              Autohaus Küppers
            </h1>
            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-5">
              Qualität und Service seit über 30 Jahren. Ihr Partner für Neuwagen, Vorführwagen und Gebrauchtwagen in Goch.
            </p>
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
      )}

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
