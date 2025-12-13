'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Zap,
  Palette,
  DoorOpen,
  Users,
  CheckCircle,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
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
      <main className="pt-24 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-gray-200 rounded w-32 mb-8 animate-pulse" />
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded animate-pulse" />
              <div className="h-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!vehicle) {
    return null;
  }

  return (
    <main className="pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/fahrzeuge"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Zurück zur Übersicht</span>
        </Link>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Image Gallery */}
            <motion.div
              className="bg-white rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {vehicle.images.length > 0 ? (
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative h-64 md:h-96 bg-gray-200">
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
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                        >
                          <ChevronLeft className="w-6 h-6 text-gray-800" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                        >
                          <ChevronRight className="w-6 h-6 text-gray-800" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white rounded-full text-sm">
                      {currentImageIndex + 1} / {vehicle.images.length}
                    </div>
                  </div>

                  {/* Thumbnails */}
                  {vehicle.images.length > 1 && (
                    <div className="p-4 grid grid-cols-4 md:grid-cols-6 gap-2">
                      {vehicle.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative h-16 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            currentImageIndex === index
                              ? 'border-primary ring-2 ring-primary'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Image
                            src={
                              image.url.startsWith('http')
                                ? image.url
                                : `${API_URL}${image.url}`
                            }
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
              ) : (
                <div className="h-96 flex items-center justify-center bg-gray-100">
                  <p className="text-gray-400">Keine Bilder verfügbar</p>
                </div>
              )}
            </motion.div>

            {/* Specifications */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Technische Daten</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Gauge className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Kilometerstand</p>
                    <p className="font-semibold text-gray-900">
                      {vehicle.mileage.toLocaleString()} km
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Erstzulassung</p>
                    <p className="font-semibold text-gray-900">
                      {vehicle.firstRegistration
                        ? new Date(vehicle.firstRegistration).toLocaleDateString('de-DE')
                        : vehicle.yearBuilt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Fuel className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Kraftstoff</p>
                    <p className="font-semibold text-gray-900">{vehicle.fuelType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Settings className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Getriebe</p>
                    <p className="font-semibold text-gray-900">{vehicle.transmission}</p>
                  </div>
                </div>

                {vehicle.power && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Leistung</p>
                      <p className="font-semibold text-gray-900">
                        {vehicle.power} PS ({Math.round(vehicle.power * 0.735)} kW)
                      </p>
                    </div>
                  </div>
                )}

                {vehicle.color && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Palette className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Farbe</p>
                      <p className="font-semibold text-gray-900">{vehicle.color}</p>
                    </div>
                  </div>
                )}

                {vehicle.doors && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <DoorOpen className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Türen</p>
                      <p className="font-semibold text-gray-900">{vehicle.doors}</p>
                    </div>
                  </div>
                )}

                {vehicle.seats && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Sitzplätze</p>
                      <p className="font-semibold text-gray-900">{vehicle.seats}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Beschreibung</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {vehicle.description}
              </p>
            </motion.div>

            {/* Features */}
            {vehicle.features.length > 0 && (
              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ausstattung</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Price & Contact */}
          <div className="lg:col-span-2">
            <motion.div
              className="sticky top-24 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {/* Price Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">
                    {getVehicleTypeLabel(vehicle.type)}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {vehicle.title}
                  </h1>
                  <p className="text-gray-600">
                    {vehicle.brand} {vehicle.model}
                  </p>
                </div>

                <div className="py-4 border-t border-b border-gray-200 mb-4">
                  <p className="text-sm text-gray-500 mb-1">Preis</p>
                  <p className="text-4xl font-bold text-gray-900">
                    {vehicle.price.toLocaleString()} €
                  </p>
                  {vehicle.condition && (
                    <p className="text-sm text-gray-500 mt-2">Zustand: {vehicle.condition}</p>
                  )}
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  
                    <a href={`tel:+4928233143`}
                    className="flex items-center justify-center gap-2 w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Jetzt anrufen
                  </a>
                  <Link
                    href={`/kontakt?fahrzeug=${encodeURIComponent(vehicle.title)}`}
                    className="flex items-center justify-center gap-2 w-full border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Anfrage senden
                  </Link>
                </div>
              </div>

              {/* Dealer Info */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Ihr Ansprechpartner</h3>
                <div className="space-y-3 text-sm">
                  <p className="font-semibold text-gray-900">Autohaus Küppers GmbH</p>
                  <p className="text-gray-600">
                    Asperdener Straße 2-4
                    <br />
                    47574 Goch
                  </p>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-gray-600">
                      <strong>Telefon:</strong> +49 2823 3143
                    </p>
                    <p className="text-gray-600">
                      <strong>E-Mail:</strong> info@auto-kueppers.de
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}