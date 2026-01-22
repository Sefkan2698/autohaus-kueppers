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
  title?: string;
  subtitle?: string;
  textPosition: string;
  order: number;
  isActive: boolean;
}

const POSITION_OPTIONS = [
  { value: 'top-left', label: 'Oben Links' },
  { value: 'top-center', label: 'Oben Mitte' },
  { value: 'top-right', label: 'Oben Rechts' },
  { value: 'middle-left', label: 'Mitte Links' },
  { value: 'middle-center', label: 'Mitte' },
  { value: 'middle-right', label: 'Mitte Rechts' },
  { value: 'bottom-left', label: 'Unten Links' },
  { value: 'bottom-center', label: 'Unten Mitte' },
  { value: 'bottom-right', label: 'Unten Rechts' },
] as const;

// 3x3 Grid Position Picker Component
function PositionPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (position: string) => void;
}) {
  const positions = [
    ['top-left', 'top-center', 'top-right'],
    ['middle-left', 'middle-center', 'middle-right'],
    ['bottom-left', 'bottom-center', 'bottom-right'],
  ];

  return (
    <div className="grid grid-cols-3 gap-1 w-32 h-20 bg-gray-200 rounded p-1">
      {positions.flat().map((pos) => (
        <button
          key={pos}
          type="button"
          onClick={() => onChange(pos)}
          className={`rounded transition-colors ${
            value === pos
              ? 'bg-primary'
              : 'bg-gray-100 hover:bg-gray-300'
          }`}
          title={POSITION_OPTIONS.find((p) => p.value === pos)?.label}
        />
      ))}
    </div>
  );
}

// Sortable Image Item Component
function SortableImageItem({
  image,
  onDelete,
  onUpdate,
}: {
  image: CarouselImage;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<CarouselImage>) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: image.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(image.title || '');
  const [subtitle, setSubtitle] = useState(image.subtitle || '');
  const [altText, setAltText] = useState(image.alt || '');
  const [textPosition, setTextPosition] = useState(image.textPosition || 'bottom-left');

  const handleSave = () => {
    onUpdate(image.id, { title, subtitle, alt: altText, textPosition });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(image.title || '');
    setSubtitle(image.subtitle || '');
    setAltText(image.alt || '');
    setTextPosition(image.textPosition || 'bottom-left');
    setIsEditing(false);
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
      {/* Mobile: Stack layout, Desktop: Flex layout */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
        {/* Top row on mobile: Drag handle + Image + Delete */}
        <div className="flex items-start gap-3">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-grab active:cursor-grabbing touch-none flex-shrink-0"
            style={{ touchAction: 'none' }}
          >
            <GripVertical className="w-5 h-5 text-gray-400" />
          </button>

          {/* Image Preview */}
          <div className="relative w-24 h-16 sm:w-32 sm:h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={image.url.startsWith('http') ? image.url : `${API_URL}${image.url}`}
              alt={image.alt || 'Carousel Bild'}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Position badge (mobile only) */}
          <div className="flex-1 sm:hidden">
            <span className="text-xs text-gray-500">Pos. {image.order}</span>
          </div>

          {/* Delete button */}
          <button
            onClick={() => onDelete(image.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
            title="Löschen"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>

        {/* Info & Actions */}
        <div className="flex-1 min-w-0">
          {/* Desktop position badge */}
          <div className="hidden sm:flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">Position: {image.order}</span>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              {/* Text fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Titel</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="z.B. Autohaus Küppers"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Untertitel</label>
                  <textarea
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="z.B. Qualität und Service..."
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Alt-Text (SEO)</label>
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="Bildbeschreibung"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Position Picker */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Text-Position</label>
                <div className="flex items-center gap-3">
                  <PositionPicker value={textPosition} onChange={setTextPosition} />
                  <span className="text-xs text-gray-500">
                    {POSITION_OPTIONS.find((p) => p.value === textPosition)?.label}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleSave}
                  className="flex-1 sm:flex-none px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark"
                >
                  Speichern
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {image.title || <span className="text-gray-400 italic">Kein Titel</span>}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                    {image.subtitle || <span className="text-gray-400 italic">Kein Untertitel</span>}
                  </p>
                </div>
                {/* Position picker - hidden on very small screens when not editing */}
                <div className="hidden sm:block flex-shrink-0">
                  <PositionPicker value={image.textPosition || 'bottom-left'} onChange={(pos) => onUpdate(image.id, { textPosition: pos })} />
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-primary hover:text-primary-dark font-medium"
              >
                Bearbeiten
              </button>
            </div>
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
      const response = await fetch(`${API_URL}/api/carousel`, {
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

        const response = await fetch(`${API_URL}/api/carousel`, {
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

  const handleUpdate = async (id: string, data: Partial<CarouselImage>) => {
    try {
      const token = localStorage.getItem('adminToken');
      const image = images.find((img) => img.id === id);
      if (!image) return;

      // Only send allowed fields (exclude id, createdAt, updatedAt)
      const updateData = {
        url: image.url,
        alt: image.alt,
        title: image.title,
        subtitle: image.subtitle,
        textPosition: image.textPosition,
        order: image.order,
        isActive: image.isActive,
        ...data,
      };

      const response = await fetch(`${API_URL}/api/carousel/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        setSuccessMessage('Änderungen gespeichert');
        fetchImages();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const errorData = await response.json();
        console.error('Update error:', errorData);
        setError('Fehler beim Speichern');
      }
    } catch (error) {
      console.error('Error updating carousel image:', error);
      setError('Fehler beim Speichern');
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
                <li><strong>Titel & Untertitel</strong> werden pro Bild in einer Box auf der Startseite angezeigt</li>
                <li>Ohne Titel/Untertitel wird ein Standard-Text angezeigt</li>
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
                    onUpdate={handleUpdate}
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