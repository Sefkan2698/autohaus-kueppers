'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  AlertCircle,
  Upload,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '@/lib/constants';

interface NewModel {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  alt?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
}

export default function AdminModellePage() {
  const router = useRouter();
  const [models, setModels] = useState<NewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<NewModel | null>(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [alt, setAlt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    } else {
      fetchModels();
    }
  }, [router]);

  const fetchModels = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/new-models`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error('Error fetching models:', error);
      setError('Fehler beim Laden der Modelle');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!title || !description) {
      setError('Titel und Beschreibung sind erforderlich');
      return;
    }

    if (!editingModel && !imageFile) {
      setError('Bitte ein Bild hochladen');
      return;
    }

    setIsSaving(true);

    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('isActive', 'true');
      if (alt) formData.append('alt', alt);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const url = editingModel
        ? `${API_URL}/api/new-models/${editingModel.id}`
        : `${API_URL}/api/new-models`;
      const method = editingModel ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage(
          editingModel ? 'Modell erfolgreich aktualisiert' : 'Modell erfolgreich erstellt'
        );
        fetchModels();
        resetForm();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Fehler beim Speichern');
      }
    } catch (error) {
      console.error('Error saving model:', error);
      setError('Verbindungsfehler');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (model: NewModel) => {
    setEditingModel(model);
    setTitle(model.title);
    setDescription(model.description);
    setAlt(model.alt || '');
    setImageFile(null);
    setImagePreview(
      model.imageUrl.startsWith('http') ? model.imageUrl : `${API_URL}${model.imageUrl}`
    );
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie dieses Modell wirklich löschen?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/new-models/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSuccessMessage('Modell erfolgreich gelöscht');
        fetchModels();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Fehler beim Löschen');
      }
    } catch (error) {
      console.error('Error deleting model:', error);
      setError('Verbindungsfehler');
    }
  };

  const toggleActive = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/new-models/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSuccessMessage('Status aktualisiert');
        fetchModels();
        setTimeout(() => setSuccessMessage(''), 2000);
      } else {
        setError('Fehler beim Umschalten');
      }
    } catch (error) {
      console.error('Error toggling model:', error);
      setError('Verbindungsfehler');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setAlt('');
    setImageFile(null);
    setImagePreview(null);
    setEditingModel(null);
    setShowForm(false);
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
                <h1 className="text-2xl font-bold text-gray-900">Neueste Modelle</h1>
                <p className="text-sm text-gray-500">Modelle für die Homepage verwalten</p>
              </div>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Neues Modell</span>
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
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => resetForm()}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingModel ? 'Modell bearbeiten' : 'Neues Modell'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Titel */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titel *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="z.B. Der neue C3"
                      required
                    />
                  </div>

                  {/* Beschreibung */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Beschreibung *
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Kurze Beschreibung des Modells..."
                      rows={4}
                      required
                    />
                  </div>

                  {/* Alt-Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alt-Text (SEO)
                    </label>
                    <input
                      type="text"
                      value={alt}
                      onChange={(e) => setAlt(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="z.B. Citroën C3 2026 in Weiß - Seitenansicht"
                    />
                  </div>

                  {/* Bild Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bild {editingModel ? '(optional, nur bei Änderung)' : '*'}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        {imagePreview ? (
                          <div className="relative aspect-[16/9] w-full">
                            <Image
                              src={imagePreview}
                              alt="Vorschau"
                              fill
                              className="object-cover rounded-lg"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="py-8">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">
                              Klicken Sie hier, um ein Bild hochzuladen
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              JPG, PNG oder WebP (max. 10MB)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
                    >
                      <Save className="w-5 h-5" />
                      {isSaving ? 'Speichert...' : editingModel ? 'Aktualisieren' : 'Erstellen'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Abbrechen
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Models List */}
        <div className="space-y-4">
          {models.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <p className="text-gray-500">Keine Modelle vorhanden. Erstellen Sie Ihr erstes Modell!</p>
            </div>
          ) : (
            models.map((model) => (
              <motion.div
                key={model.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Bild-Vorschau */}
                  <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                    <Image
                      src={
                        model.imageUrl.startsWith('http')
                          ? model.imageUrl
                          : `${API_URL}${model.imageUrl}`
                      }
                      alt={model.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {model.isActive ? (
                            <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
                              <Eye className="w-4 h-4" />
                              Aktiv
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-sm text-gray-500">
                              <EyeOff className="w-4 h-4" />
                              Inaktiv
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{model.title}</h3>
                        <p className="text-gray-700 text-sm line-clamp-3">{model.description}</p>
                      </div>

                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggleActive(model.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title={model.isActive ? 'Deaktivieren' : 'Aktivieren'}
                        >
                          {model.isActive ? (
                            <EyeOff className="w-5 h-5 text-gray-600" />
                          ) : (
                            <Eye className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEdit(model)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Bearbeiten"
                        >
                          <Edit2 className="w-5 h-5 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(model.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Löschen"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
