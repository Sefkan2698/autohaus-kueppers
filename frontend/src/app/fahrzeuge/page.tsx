'use client';

import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
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

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
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

    return (
      matchesSearch &&
      matchesType &&
      matchesBrand &&
      matchesFuelType &&
      matchesTransmission &&
      matchesPrice
    );
  });

  const resetFilters = () => {
    setFilterType('all');
    setFilterBrand('all');
    setFilterFuelType('all');
    setFilterTransmission('all');
    setPriceRange({ min: '', max: '' });
  };

  const activeFiltersCount = [
    filterType !== 'all',
    filterBrand !== 'all',
    filterFuelType !== 'all',
    filterTransmission !== 'all',
    priceRange.min !== '',
    priceRange.max !== '',
  ].filter(Boolean).length;

  if (isLoading) {
    return (
      <main className="pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-8 bg-neutral-100 w-48 mb-12 animate-pulse" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[4/5] bg-neutral-100 animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-neutral-500 text-sm tracking-[0.2em] uppercase mb-4">
            Fahrzeuge
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
              <span className="text-primary">{filteredVehicles.length}</span> {filteredVehicles.length === 1 ? 'Fahrzeug' : 'Fahrzeuge'}
            </h1>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-6 py-3 border transition-colors ${
                showFilters || activeFiltersCount > 0
                  ? 'bg-neutral-900 border-neutral-900 text-white'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-400'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm font-medium">Filter</span>
              {activeFiltersCount > 0 && (
                <span className="ml-1 text-xs">({activeFiltersCount})</span>
              )}
            </button>
          </div>

          {/* Type Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {['all', 'DEMO_CAR', 'USED_CAR', 'YEAR_CAR'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  filterType === type
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {type === 'all' ? 'Alle' : getVehicleTypeLabel(type as Vehicle['type'])}
              </button>
            ))}
          </div>
        </div>

        {/* Extended Filters Panel */}
        {showFilters && (
          <div className="bg-neutral-50 p-6 mb-8 border border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm font-medium text-neutral-900">Erweiterte Filter</p>
              <button
                onClick={resetFilters}
                className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                Zurücksetzen
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Brand Filter */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                  Marke
                </label>
                <select
                  value={filterBrand}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-neutral-400"
                >
                  <option value="all">Alle Marken</option>
                  {uniqueBrands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Fuel Type Filter */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                  Kraftstoff
                </label>
                <select
                  value={filterFuelType}
                  onChange={(e) => setFilterFuelType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-neutral-400"
                >
                  <option value="all">Alle</option>
                  {uniqueFuelTypes.map((fuel) => (
                    <option key={fuel} value={fuel}>{fuel}</option>
                  ))}
                </select>
              </div>

              {/* Transmission Filter */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                  Getriebe
                </label>
                <select
                  value={filterTransmission}
                  onChange={(e) => setFilterTransmission(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-neutral-400"
                >
                  <option value="all">Alle</option>
                  {uniqueTransmissions.map((trans) => (
                    <option key={trans} value={trans}>{trans}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                  Preis (€)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Von"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-neutral-400"
                  />
                  <input
                    type="number"
                    placeholder="Bis"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-neutral-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vehicle Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500">
              Keine Fahrzeuge gefunden.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <Link
                key={vehicle.id}
                href={`/fahrzeuge/${vehicle.id}`}
                className="group block"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden mb-4">
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
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-neutral-900 text-xs font-medium">
                      {getVehicleTypeLabel(vehicle.type)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-1">
                    {vehicle.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                    <span>{vehicle.yearBuilt}</span>
                    <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                    <span>{vehicle.mileage.toLocaleString()} km</span>
                    <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                    <span>{vehicle.fuelType}</span>
                  </div>

                  <p className="text-xl font-semibold text-primary">
                    {vehicle.price.toLocaleString()} €
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
