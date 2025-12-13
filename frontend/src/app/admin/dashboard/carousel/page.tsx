'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Upload,
  Trash2,
  GripVertical,
  AlertCircle,
  Image as ImageIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { API_URL } from '@/lib/constants';

interface CarouselImage {
  id: string;
  url: string;
  alt?: string;
  order: number;
  isActive: boolean;
}

// Sortable Image Item Component
function SortableImageItem({
  image,
  onDelete,
  onUpdateAlt,
}: {
  image: CarouselImage;
  onDelete: (id: string) => void;
  onUpdateAlt: (id: string, alt: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: image.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [editingAlt, setEditingAlt] = useState(false);
  const [altText, setAltText] = useState(image.alt || '');

  const handleSaveAlt = () => {
    onUpdateAlt(image.id, altText);
    setEditingAlt(false);
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <div className="flex items-start gap-4">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="mt-2 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-grab active:cursor-grabbing touch-none"
          style={{ touchAction: 'none' }}
        >
          <GripVertical className="w-5 h-5 text-gray-400" />
        </button>

        {/* Image Preview */}
        <div className="relative w-32 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={image.url.startsWith('http') ? image.url : `${API_URL}${image.url}`}
            alt={image.alt || 'Carousel Bild'}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Info & Actions */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-sm font-medium text-gray-900">Position: {image.order}</span>
            <button
              onClick={() => onDelete(image.id)}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              title="Löschen"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>

          {/* Alt Text */}
          {editingAlt ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Alt-Text (optional)"
                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
              <button
                onClick={handleSaveAlt}
                className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark"
              >
                Speichern
              </button>
              <button
                onClick={() => {
                  setAltText(image.alt || '');
                  setEditingAlt(false);
                }}
                className="px-3 py-1 border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
              >
                Abbrechen
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingAlt(true)}
              className="text-sm text-gray-600 hover:text-primary"
            >
              {image.alt ? `Alt-Text: ${image.alt}` : 'Alt-Text hinzufügen'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminCarouselPage() {
  const router = useRouter();
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px Bewegung bevor Drag startet (funktioniert besser auf Touch)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    } else {
      fetchImages();
    }
  }, [router]);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('${API_URL}/api/carousel', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setImages(data.sort((a: CarouselImage, b: CarouselImage) => a.order - b.order));
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Fehler beim Laden der Bilder');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('order', String(images.length + 1));
        formData.append('isActive', 'true');

        const response = await fetch('${API_URL}/api/carousel', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload fehlgeschlagen');
        }
      }

      setSuccessMessage('Bilder erfolgreich hochgeladen');
      fetchImages();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error uploading images:', error);
      setError('Fehler beim Hochladen der Bilder');
    } finally {
      setIsUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie dieses Bild wirklich löschen?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/carousel/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSuccessMessage('Bild erfolgreich gelöscht');
        fetchImages();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Fehler beim Löschen');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      setError('Verbindungsfehler');
    }
  };

  const handleUpdateAlt = async (id: string, alt: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const image = images.find((img) => img.id === id);
      if (!image) return;

      const response = await fetch(`${API_URL}/api/carousel/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...image,
          alt,
        }),
      });

      if (response.ok) {
        fetchImages();
      }
    } catch (error) {
      console.error('Error updating alt text:', error);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((img) => img.id === active.id);
    const newIndex = images.findIndex((img) => img.id === over.id);

    const newImages = arrayMove(images, oldIndex, newIndex);
    
    // Update order numbers
    const updatedImages = newImages.map((img, index) => ({
      ...img,
      order: index + 1,
    }));

    setImages(updatedImages);

    // Save new order to backend
    try {
      const token = localStorage.getItem('adminToken');

      for (const image of updatedImages) {
        await fetch(`${API_URL}/api/carousel/${image.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(image),
        });
      }

      setSuccessMessage('Reihenfolge aktualisiert');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating order:', error);
      setError('Fehler beim Speichern der Reihenfolge');
      fetchImages(); // Reload on error
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
                <h1 className="text-2xl font-bold text-gray-900">Carousel-Bilder verwalten</h1>
                <p className="text-sm text-gray-500">
                  Bilder hochladen und Reihenfolge per Drag & Drop ändern
                </p>
              </div>
            </div>

            {/* Upload Button */}
            <label className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors cursor-pointer">
              <Upload className="w-5 h-5" />
              <span>{isUploading ? 'Lädt hoch...' : 'Bilder hochladen'}</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex gap-3">
            <ImageIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">So funktioniert's:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Laden Sie Bilder hoch - sie werden automatisch am Ende hinzugefügt</li>
                <li>Ziehen Sie die Bilder mit dem Griff-Symbol, um die Reihenfolge zu ändern</li>
                <li>Das erste Bild wird als erstes im Carousel angezeigt</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Images List with Drag & Drop */}
        {images.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Keine Bilder vorhanden</p>
            <label className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors cursor-pointer">
              <Upload className="w-5 h-5" />
              <span>Erste Bilder hochladen</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              {images.length} {images.length === 1 ? 'Bild' : 'Bilder'} im Carousel
            </p>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={images.map((img) => img.id)} strategy={verticalListSortingStrategy}>
                {images.map((image) => (
                  <SortableImageItem
                    key={image.id}
                    image={image}
                    onDelete={handleDelete}
                    onUpdateAlt={handleUpdateAlt}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        )}
      </main>
    </div>
  );
}