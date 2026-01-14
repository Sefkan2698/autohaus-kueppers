'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '@/lib/constants';

interface VehicleImage {
  url: string;
  alt?: string;
  order: number;
}

interface Vehicle {
  id: string;
  title: string;
  type: 'DEMO_CAR' | 'USED_CAR' | 'YEAR_CAR';
  brand: string;
  model: string;
  price: number;
  mileage: number;
  yearBuilt: number;
  firstRegistration?: string;
  fuelType: string;
  transmission: string;
  power?: number;
  color?: string;
  doors?: number;
  seats?: number;
  features: string[];
  description: string;
  condition?: string;
  images: VehicleImage[];
}

export default function FahrzeugDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchVehicle(params.id as string);
    }
  }, [params.id]);

  const fetchVehicle = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/vehicles/${id}`);
      if (response.ok) {
        const data = await response.json();
        setVehicle(data);
      } else {
        router.push('/fahrzeuge');
      }
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      router.push('/fahrzeuge');
    } finally {
      setIsLoading(false);
    }
  };

  const getVehicleTypeLabel = (type: Vehicle['type']) => {
    const labels = {
      DEMO_CAR: 'Vorführwagen',
      USED_CAR: 'Gebrauchtwagen',
      YEAR_CAR: 'Jahreswagen',
    };
    return labels[type];
  };

  const nextImage = () => {
    if (vehicle && vehicle.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
    }
  };

  const prevImage = () => {
    if (vehicle && vehicle.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
    }
  };

  if (isLoading) {
    return (
      <main className="pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-6 bg-neutral-100 w-32 mb-8 animate-pulse" />
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="aspect-[4/3] bg-neutral-100 animate-pulse" />
            <div className="space-y-4">
              <div className="h-10 bg-neutral-100 animate-pulse" />
              <div className="h-24 bg-neutral-100 animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!vehicle) {
    return null;
  }

  const specs = [
    { label: 'Kilometerstand', value: `${vehicle.mileage.toLocaleString()} km` },
    { label: 'Erstzulassung', value: vehicle.firstRegistration ? new Date(vehicle.firstRegistration).toLocaleDateString('de-DE') : vehicle.yearBuilt.toString() },
    { label: 'Kraftstoff', value: vehicle.fuelType },
    { label: 'Getriebe', value: vehicle.transmission },
    vehicle.power ? { label: 'Leistung', value: `${vehicle.power} PS (${Math.round(vehicle.power * 0.735)} kW)` } : null,
    vehicle.color ? { label: 'Farbe', value: vehicle.color } : null,
    vehicle.doors ? { label: 'Türen', value: vehicle.doors.toString() } : null,
    vehicle.seats ? { label: 'Sitzplätze', value: vehicle.seats.toString() } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <main className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/fahrzeuge"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-sm">Zurück</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-[4/3] bg-neutral-100 mb-4">
              {vehicle.images.length > 0 ? (
                <>
                  <Image
                    src={
                      vehicle.images[currentImageIndex].url.startsWith('http')
                        ? vehicle.images[currentImageIndex].url
                        : `${API_URL}${vehicle.images[currentImageIndex].url}`
                    }
                    alt={vehicle.images[currentImageIndex].alt || vehicle.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />

                  {/* Navigation Arrows */}
                  {vehicle.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-neutral-900" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-neutral-900" strokeWidth={1.5} />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white text-sm">
                    {currentImageIndex + 1} / {vehicle.images.length}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-neutral-400">Keine Bilder verfügbar</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {vehicle.images.length > 1 && (
              <div className="grid grid-cols-6 gap-2">
                {vehicle.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square overflow-hidden transition-opacity ${
                      currentImageIndex === index ? 'ring-2 ring-neutral-900' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image.url.startsWith('http') ? image.url : `${API_URL}${image.url}`}
                      alt={image.alt || `${vehicle.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Info */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <p className="text-neutral-500 text-sm tracking-[0.2em] uppercase mb-2">
                {getVehicleTypeLabel(vehicle.type)}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                {vehicle.title}
              </h1>
              <p className="text-neutral-500">
                {vehicle.brand} {vehicle.model}
              </p>
            </div>

            {/* Price */}
            <div className="mb-8 pb-8 border-b border-neutral-200">
              <p className="text-4xl font-bold text-neutral-900">
                {vehicle.price.toLocaleString()} €
              </p>
              {vehicle.condition && (
                <p className="text-sm text-neutral-500 mt-1">Zustand: {vehicle.condition}</p>
              )}
            </div>

            {/* Contact Buttons */}
            <div className="flex gap-4 mb-12">
              <a
                href="tel:+4928233143"
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors"
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                Anrufen
              </a>
              <Link
                href={`/kontakt?fahrzeug=${encodeURIComponent(vehicle.title)}`}
                className="flex-1 flex items-center justify-center gap-2 border border-neutral-200 text-neutral-900 px-6 py-3 font-medium hover:border-neutral-400 transition-colors"
              >
                <Mail className="w-4 h-4" strokeWidth={1.5} />
                Anfrage
              </Link>
            </div>

            {/* Specifications */}
            <div className="mb-12">
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
                Technische Daten
              </p>
              <div className="grid grid-cols-2 gap-4">
                {specs.map((spec, index) => (
                  <div key={index}>
                    <p className="text-sm text-neutral-500">{spec.label}</p>
                    <p className="font-medium text-neutral-900">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {vehicle.description && (
              <div className="mb-12">
                <p className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
                  Beschreibung
                </p>
                <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                  {vehicle.description}
                </p>
              </div>
            )}

            {/* Features */}
            {vehicle.features.length > 0 && (
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
                  Ausstattung
                </p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {vehicle.features.map((feature, index) => (
                    <p key={index} className="text-neutral-600 text-sm">
                      {feature}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
