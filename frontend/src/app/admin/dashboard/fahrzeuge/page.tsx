'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  Upload,
  Image as ImageIcon,
  AlertCircle,
  Car,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '@/lib/constants';

interface VehicleImage {
  id?: string;
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
  isActive: boolean;
  createdAt: string;
}

const initialFormData = {
  title: '',
  type: 'USED_CAR' as Vehicle['type'],
  brand: 'Citroen',
  model: '',
  price: '',
  mileage: '',
  yearBuilt: new Date().getFullYear().toString(),
  firstRegistration: '',
  fuelType: 'Diesel',
  transmission: 'Manuell',
  power: '',
  color: '',
  doors: '5',
  seats: '5',
  features: '',
  description: '',
  condition: 'Gut',
};

export default function AdminFahrzeugePage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    } else {
      fetchVehicles();
    }
  }, [router]);

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/vehicles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setError('Fehler beim Laden der Fahrzeuge');
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
      USED_CAR: 'bg-green-100 text-green-800',
      YEAR_CAR: 'bg-purple-100 text-purple-800',
    };
    return colors[type];
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFiles]);

    // Create previews
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const openCreateModal = () => {
    setEditingVehicle(null);
    setFormData(initialFormData);
    setImageFiles([]);
    setImagePreviews([]);
    setIsModalOpen(true);
    setError('');
  };

  const openEditModal = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      title: vehicle.title,
      type: vehicle.type,
      brand: vehicle.brand,
      model: vehicle.model,
      price: vehicle.price.toString(),
      mileage: vehicle.mileage.toString(),
      yearBuilt: vehicle.yearBuilt.toString(),
      firstRegistration: vehicle.firstRegistration
        ? new Date(vehicle.firstRegistration).toISOString().split('T')[0]
        : '',
      fuelType: vehicle.fuelType,
      transmission: vehicle.transmission,
      power: vehicle.power?.toString() || '',
      color: vehicle.color || '',
      doors: vehicle.doors?.toString() || '',
      seats: vehicle.seats?.toString() || '',
      features: vehicle.features.join('\n'),
      description: vehicle.description,
      condition: vehicle.condition || '',
    });
    setImageFiles([]);
    setImagePreviews([]);
    setIsModalOpen(true);
    setError('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingVehicle(null);
    setFormData(initialFormData);
    setImageFiles([]);
    setImagePreviews([]);
    setError('');
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verhindere doppeltes Absenden
    if (isSubmitting) return;

    setError('');
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('adminToken');

      // Parse features from textarea (split by newlines)
      const featuresArray = formData.features
        .split('\n')
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      // Create FormData (like carousel)
      const submitData = new FormData();

      // Add all form fields
      submitData.append('title', formData.title);
      submitData.append('type', formData.type);
      submitData.append('brand', formData.brand);
      submitData.append('model', formData.model);
      submitData.append('price', formData.price);
      submitData.append('mileage', formData.mileage);
      submitData.append('yearBuilt', formData.yearBuilt);
      if (formData.firstRegistration) {
        submitData.append('firstRegistration', formData.firstRegistration);
      }
      submitData.append('fuelType', formData.fuelType);
      submitData.append('transmission', formData.transmission);
      if (formData.power) submitData.append('power', formData.power);
      if (formData.color) submitData.append('color', formData.color);
      if (formData.doors) submitData.append('doors', formData.doors);
      if (formData.seats) submitData.append('seats', formData.seats);
      submitData.append('features', JSON.stringify(featuresArray));
      submitData.append('description', formData.description);
      if (formData.condition) submitData.append('condition', formData.condition);

      // Add images
      imageFiles.forEach((file) => {
        submitData.append('images', file);
      });

      const url = editingVehicle
        ? `${API_URL}/api/vehicles/${editingVehicle.id}`
        : `${API_URL}/api/vehicles`;

      const method = editingVehicle ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submitData,
      });

      if (response.ok) {
        setSuccessMessage(
          editingVehicle
            ? 'Fahrzeug erfolgreich aktualisiert'
            : 'Fahrzeug erfolgreich erstellt'
        );
        fetchVehicles();
        closeModal();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Ein Fehler ist aufgetreten');
      }
    } catch (error) {
      console.error('Error saving vehicle:', error);
      setError('Verbindungsfehler');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie dieses Fahrzeug wirklich löschen?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/vehicles/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSuccessMessage('Fahrzeug erfolgreich gelöscht');
        fetchVehicles();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Fehler beim Löschen');
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      setError('Verbindungsfehler');
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/vehicles/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchVehicles();
      } else {
        setError('Fehler beim Umschalten des Status');
      }
    } catch (error) {
      console.error('Error toggling active:', error);
      setError('Verbindungsfehler');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Lädt...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Fahrzeuge verwalten</h1>
                <p className="text-sm text-gray-500">
                  Fahrzeuge erstellen, bearbeiten und veröffentlichen
                </p>
              </div>
            </div>

            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Neues Fahrzeug</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}
        {error && !isModalOpen && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Vehicles List */}
        {vehicles.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
            <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Noch keine Fahrzeuge vorhanden</p>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="w-5 h-5" />
              Erstes Fahrzeug erstellen
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {vehicles.length} {vehicles.length === 1 ? 'Fahrzeug' : 'Fahrzeuge'}
            </p>

            {vehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {/* Vehicle Image Thumbnail */}
                  <div className="relative w-full sm:w-32 h-32 sm:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {vehicle.images.length > 0 ? (
                      <Image
                        src={
                          vehicle.images[0].url.startsWith('http')
                            ? vehicle.images[0].url
                            : `${API_URL}${vehicle.images[0].url}`
                        }
                        alt={vehicle.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Car className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Vehicle Info */}
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900">{vehicle.title}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getVehicleTypeBadgeColor(
                              vehicle.type
                            )}`}
                          >
                            {getVehicleTypeLabel(vehicle.type)}
                          </span>
                          {!vehicle.isActive && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                              Inaktiv
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {vehicle.brand} {vehicle.model} • {vehicle.yearBuilt} •{' '}
                          {vehicle.mileage.toLocaleString()} km
                        </p>
                      </div>

                      <p className="text-lg sm:text-xl font-bold text-primary">
                        {vehicle.price.toLocaleString()} €
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                      <span>{vehicle.fuelType}</span>
                      <span>•</span>
                      <span>{vehicle.transmission}</span>
                      {vehicle.power && (
                        <>
                          <span>•</span>
                          <span>{vehicle.power} PS</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <button
                      onClick={() => handleToggleActive(vehicle.id)}
                      className={`flex-1 sm:flex-none p-2 rounded-lg transition-colors ${
                        vehicle.isActive
                          ? 'bg-green-50 text-green-600 hover:bg-green-100'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                      title={vehicle.isActive ? 'Aktiv' : 'Inaktiv'}
                    >
                      {vehicle.isActive ? (
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5 mx-auto" />
                      ) : (
                        <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 mx-auto" />
                      )}
                    </button>
                    <button
                      onClick={() => openEditModal(vehicle)}
                      className="flex-1 sm:flex-none p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Bearbeiten"
                    >
                      <Edit2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto" />
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      className="flex-1 sm:flex-none p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Löschen"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mx-auto" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <motion.div
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingVehicle ? 'Fahrzeug bearbeiten' : 'Neues Fahrzeug'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                  </div>
                )}

                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Grundinformationen</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Titel *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="z.B. Citroen C3 1.2 PureTech"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fahrzeugtyp *
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) =>
                          setFormData({ ...formData, type: e.target.value as Vehicle['type'] })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      >
                        <option value="USED_CAR">Gebrauchtwagen</option>
                        <option value="DEMO_CAR">Vorführwagen</option>
                        <option value="YEAR_CAR">Jahreswagen</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Marke *
                      </label>
                      <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="z.B. Citroen"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Modell *
                      </label>
                      <input
                        type="text"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="z.B. C3"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preis (€) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="z.B. 15990.00"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kilometerstand *
                      </label>
                      <input
                        type="number"
                        value={formData.mileage}
                        onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="z.B. 45000"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Baujahr *
                      </label>
                      <input
                        type="number"
                        value={formData.yearBuilt}
                        onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="z.B. 2020"
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Erstzulassung
                      </label>
                      <input
                        type="date"
                        value={formData.firstRegistration}
                        onChange={(e) =>
                          setFormData({ ...formData, firstRegistration: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kraftstoff *
                      </label>
                      <select
                        value={formData.fuelType}
                        onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      >
                        <option value="Diesel">Diesel</option>
                        <option value="Benzin">Benzin</option>
                        <option value="Elektro">Elektro</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Plug-in-Hybrid">Plug-in-Hybrid</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Getriebe *
                      </label>
                      <select
                        value={formData.transmission}
                        onChange={(e) =>
                          setFormData({ ...formData, transmission: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      >
                        <option value="Manuell">Manuell</option>
                        <option value="Automatik">Automatik</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Leistung (PS)
                      </label>
                      <input
                        type="number"
                        value={formData.power}
                        onChange={(e) => setFormData({ ...formData, power: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="z.B. 110"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Farbe</label>
                      <input
                        type="text"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="z.B. Schwarz Metallic"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Türen</label>
                      <input
                        type="number"
                        value={formData.doors}
                        onChange={(e) => setFormData({ ...formData, doors: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        min="2"
                        max="6"
                        placeholder="z.B. 5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sitzplätze
                      </label>
                      <input
                        type="number"
                        value={formData.seats}
                        onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        min="1"
                        max="9"
                        placeholder="z.B. 5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Zustand
                      </label>
                      <input
                        type="text"
                        value={formData.condition}
                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="z.B. Gut, Neuwertig"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Beschreibung *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={4}
                    placeholder="Beschreiben Sie das Fahrzeug..."
                    required
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ausstattung
                  </label>
                  <p className="text-sm text-gray-500 mb-2">
                    Kopieren Sie die Ausstattung aus DAT. Eine Zeile pro Feature.
                  </p>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                    rows={8}
                    placeholder={'Klimaanlage\nNavigationssystem\nLED-Scheinwerfer\nRückfahrkamera\n...'}
                  />
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bilder hochladen
                  </label>

                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="relative w-full h-24 bg-gray-100 rounded-lg overflow-hidden">
                            <Image src={preview} alt={`Preview ${index + 1}`} fill className="object-cover" />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  <label className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Bilder auswählen</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={isSubmitting}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Speichert...' : editingVehicle ? 'Aktualisieren' : 'Erstellen'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
