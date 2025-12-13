'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Car,
  Filter,
  Search,
  SlidersHorizontal,
  Euro,
  Gauge,
  Calendar,
  Fuel,
  Settings,
  X,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '@/lib/constants';

interface Vehicle {
  id: string;
  title: string;
  type: 'DEMO_CAR' | 'USED_CAR' | 'YEAR_CAR';
  brand: string;
  model: string;
  price: number;
  mileage: number;
  yearBuilt: number;
  fuelType: string;
  transmission: string;
  power?: number;
  images: { url: string; alt?: string; order: number }[];
  isActive: boolean;
}

export default function FahrzeugePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter States
  const [filterType, setFilterType] = useState<string>('all');
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [filterFuelType, setFilterFuelType] = useState<string>('all');
  const [filterTransmission, setFilterTransmission] = useState<string>('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [mileageRange, setMileageRange] = useState({ min: '', max: '' });
  const [yearRange, setYearRange] = useState({ min: '', max: '' });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      // Nur aktive Fahrzeuge abrufen
      const response = await fetch(`${API_URL}/api/vehicles?isActive=true`);
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
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

  const getVehicleTypeBadgeColor = (type: Vehicle['type']) => {
    const colors = {
      DEMO_CAR: 'bg-blue-100 text-blue-800',
      USED_CAR: 'bg-gray-100 text-gray-800',
      YEAR_CAR: 'bg-green-100 text-green-800',
    };
    return colors[type];
  };

  // Get unique values for filters
  const uniqueBrands = Array.from(new Set(vehicles.map((v) => v.brand))).sort();
  const uniqueFuelTypes = Array.from(new Set(vehicles.map((v) => v.fuelType))).sort();
  const uniqueTransmissions = Array.from(new Set(vehicles.map((v) => v.transmission))).sort();

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || vehicle.type === filterType;
    const matchesBrand = filterBrand === 'all' || vehicle.brand === filterBrand;
    const matchesFuelType = filterFuelType === 'all' || vehicle.fuelType === filterFuelType;
    const matchesTransmission =
      filterTransmission === 'all' || vehicle.transmission === filterTransmission;

    const matchesPrice =
      (!priceRange.min || vehicle.price >= parseInt(priceRange.min)) &&
      (!priceRange.max || vehicle.price <= parseInt(priceRange.max));
    const matchesMileage =
      (!mileageRange.min || vehicle.mileage >= parseInt(mileageRange.min)) &&
      (!mileageRange.max || vehicle.mileage <= parseInt(mileageRange.max));
    const matchesYear =
      (!yearRange.min || vehicle.yearBuilt >= parseInt(yearRange.min)) &&
      (!yearRange.max || vehicle.yearBuilt <= parseInt(yearRange.max));

    return (
      matchesSearch &&
      matchesType &&
      matchesBrand &&
      matchesFuelType &&
      matchesTransmission &&
      matchesPrice &&
      matchesMileage &&
      matchesYear
    );
  });

  const resetFilters = () => {
    setFilterType('all');
    setFilterBrand('all');
    setFilterFuelType('all');
    setFilterTransmission('all');
    setPriceRange({ min: '', max: '' });
    setMileageRange({ min: '', max: '' });
    setYearRange({ min: '', max: '' });
  };

  if (isLoading) {
    return (
      <main className="pt-24 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-12 bg-gray-200 rounded max-w-md mb-8 animate-pulse" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-white rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Unsere <span className="text-primary">Fahrzeuge</span>
          </h1>
          <p className="text-gray-600">
            {filteredVehicles.length} {filteredVehicles.length === 1 ? 'Fahrzeug' : 'Fahrzeuge'}{' '}
            verfügbar
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Marke, Modell oder Titel suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">Alle Filter</span>
            </button>

            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filterType === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Alle
            </button>
            <button
              onClick={() => setFilterType('DEMO_CAR')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filterType === 'DEMO_CAR'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Vorführwagen
            </button>
            <button
              onClick={() => setFilterType('USED_CAR')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filterType === 'USED_CAR'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Gebrauchtwagen
            </button>
            <button
              onClick={() => setFilterType('YEAR_CAR')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filterType === 'YEAR_CAR'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Jahreswagen
            </button>
          </div>
        </div>

        {/* Extended Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl p-4 md:p-6 mb-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Erweiterte Filter</h3>
              <button
                onClick={resetFilters}
                className="text-sm text-primary hover:underline font-medium"
              >
                Zurücksetzen
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marke</label>
                <select
                  value={filterBrand}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">Alle Marken</option>
                  {uniqueBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fuel Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kraftstoff</label>
                <select
                  value={filterFuelType}
                  onChange={(e) => setFilterFuelType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">Alle</option>
                  {uniqueFuelTypes.map((fuel) => (
                    <option key={fuel} value={fuel}>
                      {fuel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Transmission Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Getriebe</label>
                <select
                  value={filterTransmission}
                  onChange={(e) => setFilterTransmission(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">Alle</option>
                  {uniqueTransmissions.map((trans) => (
                    <option key={trans} value={trans}>
                      {trans}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preis (€)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Von"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Bis"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Mileage Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kilometerstand
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Von"
                    value={mileageRange.min}
                    onChange={(e) => setMileageRange({ ...mileageRange, min: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Bis"
                    value={mileageRange.max}
                    onChange={(e) => setMileageRange({ ...mileageRange, max: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Year Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Baujahr</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Von"
                    value={yearRange.min}
                    onChange={(e) => setYearRange({ ...yearRange, min: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Bis"
                    value={yearRange.max}
                    onChange={(e) => setYearRange({ ...yearRange, max: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Vehicle Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">
              Keine Fahrzeuge gefunden. Versuchen Sie andere Suchkriterien.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  href={`/fahrzeuge/${vehicle.id}`}
                  className="block bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow group border border-gray-200"
                >
                  {/* Image */}
                  <div className="relative h-48 md:h-56 bg-gray-200 overflow-hidden">
                    {vehicle.images.length > 0 ? (
                      <Image
                        src={
                          vehicle.images[0].url.startsWith('http')
                            ? vehicle.images[0].url
                            : `${API_URL}${vehicle.images[0].url}`
                        }
                        alt={vehicle.images[0].alt || vehicle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Car className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-semibold ${getVehicleTypeBadgeColor(
                          vehicle.type
                        )}`}
                      >
                        {getVehicleTypeLabel(vehicle.type)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {vehicle.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Gauge className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{vehicle.mileage.toLocaleString()} km</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{vehicle.yearBuilt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Fuel className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{vehicle.fuelType}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Settings className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{vehicle.transmission}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-baseline gap-1">
                        <Euro className="w-5 h-5 text-primary" />
                        <span className="text-2xl font-bold text-gray-900">
                          {vehicle.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}