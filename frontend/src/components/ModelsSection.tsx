'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { API_URL } from '@/lib/constants';

interface NewModel {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  alt?: string;
  order: number;
}

export default function ModelsSection() {
  const [models, setModels] = useState<NewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await fetch(`${API_URL}/api/new-models?isActive=true`);
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error('Error fetching models:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + models.length) % models.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % models.length);
  };

  if (isLoading || models.length === 0) {
    return null;
  }

  const current = models[currentIndex];

  return (
    <section className="pt-12 md:pt-16 pb-24 md:pb-32 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
            Neuheiten
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 max-w-lg">
            <span className="text-primary">Unsere neuesten Modelle</span>
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="relative border border-neutral-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Text - 1/3 */}
            <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
                {current.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {current.description}
              </p>

              {/* Navigation */}
              {models.length > 1 && (
                <div className="flex items-center gap-4 mt-8">
                  <button
                    onClick={goToPrevious}
                    className="w-10 h-10 flex items-center justify-center border border-neutral-300 text-neutral-500 hover:border-primary hover:text-primary transition-colors"
                    aria-label="Vorheriges Modell"
                  >
                    <ChevronLeft size={20} strokeWidth={1.5} />
                  </button>
                  <span className="text-sm text-neutral-400">
                    {currentIndex + 1} / {models.length}
                  </span>
                  <button
                    onClick={goToNext}
                    className="w-10 h-10 flex items-center justify-center border border-neutral-300 text-neutral-500 hover:border-primary hover:text-primary transition-colors"
                    aria-label="Nächstes Modell"
                  >
                    <ChevronRight size={20} strokeWidth={1.5} />
                  </button>
                </div>
              )}
            </div>

            {/* Bild - 2/3 */}
            <div className="relative md:col-span-2 min-h-[300px] md:min-h-[500px]">
              {models.map((model, index) => (
                <div
                  key={model.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={model.imageUrl.startsWith('http') ? model.imageUrl : `${API_URL}${model.imageUrl}`}
                    alt={model.alt || model.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gebrauchtwagen CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-neutral-200 pt-8">
          <p className="text-lg md:text-xl font-semibold text-neutral-900">
            An Gebrauchtwagen interessiert?
          </p>
          <Link
            href="/fahrzeuge"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Mehr erfahren
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
