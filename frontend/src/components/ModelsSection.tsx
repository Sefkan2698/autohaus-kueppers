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

interface Vehicle {
  id: string;
  title: string;
  type: string;
  price: number;
  mileage: number;
  yearBuilt: number;
  fuelType: string;
  images: { url: string; alt?: string; order: number }[];
}

export default function ModelsSection() {
  const [models, setModels] = useState<NewModel[]>([]);
  const [usedCars, setUsedCars] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modelsRes, vehiclesRes] = await Promise.all([
          fetch(`${API_URL}/api/new-models?isActive=true`),
          fetch(`${API_URL}/api/vehicles?isActive=true`),
        ]);
        const modelsData = await modelsRes.json();
        const vehiclesData = await vehiclesRes.json();
        setModels(modelsData);
        setUsedCars(
          vehiclesData
            .filter((v: Vehicle) => v.type === 'USED_CAR')
            .slice(0, 3)
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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

        {/* Gebrauchtwagen Section */}
        <div className="mt-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-2">
                Gebrauchtwagen
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900">
                <span className="text-primary">Haben Sie Interesse an Gebrauchtwagen?</span>
              </h3>
            </div>
            <Link
              href="/fahrzeuge?typ=USED_CAR"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors flex-shrink-0"
            >
              Alle ansehen
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>

          {usedCars.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {usedCars.map((vehicle) => (
                  <Link
                    key={vehicle.id}
                    href={`/fahrzeuge/${vehicle.id}`}
                    className="group bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] bg-neutral-100">
                      {vehicle.images.length > 0 ? (
                        <Image
                          src={
                            vehicle.images[0].url.startsWith('http')
                              ? vehicle.images[0].url
                              : `${API_URL}${vehicle.images[0].url}`
                          }
                          alt={vehicle.images[0].alt || vehicle.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-neutral-300 text-sm">Kein Bild</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-semibold text-neutral-900 line-clamp-1 mb-1">
                        {vehicle.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-neutral-500 mb-2">
                        <span>{vehicle.yearBuilt}</span>
                        <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                        <span>{vehicle.mileage.toLocaleString()} km</span>
                        <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                        <span>{vehicle.fuelType}</span>
                      </div>
                      <p className="text-base font-semibold text-primary">
                        {vehicle.price.toLocaleString()} €
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 sm:hidden">
                <Link
                  href="/fahrzeuge?typ=USED_CAR"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  Alle Gebrauchtwagen ansehen
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Link>
              </div>
            </>
          ) : (
            <Link
              href="/fahrzeuge?typ=USED_CAR"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Alle Gebrauchtwagen ansehen
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
