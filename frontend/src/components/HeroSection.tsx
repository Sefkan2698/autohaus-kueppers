'use client';

import { useState, useEffect } from 'react';
import HeroCarousel from './HeroCarousel';
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

  useEffect(() => {
    fetchCarouselImages();
  }, []);

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

  if (isLoading) {
    return (
      <section className="w-full">
        <div className="w-full h-[400px] md:h-[600px] bg-gray-200 animate-pulse" />
        <div className="bg-gray-50 py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="h-12 bg-gray-200 rounded max-w-2xl mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded max-w-3xl mx-auto animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      {/* Carousel */}
      <HeroCarousel images={images} />

      {/* Text Section */}
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Ihr Citroën Autohaus in Goch
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Vorführwagen, Gebrauchtwagen und Jahreswagen – Qualität und Service seit über 30 Jahren
          </p>
        </div>
      </div>
    </section>
  );
}