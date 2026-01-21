'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  AlertCircle,
  Users,
  Pencil,
  Eye,
  EyeOff,
  X,
  Upload,
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

interface TeamMember {
  id: string;
  name: string;
  title: string;
  url: string;
  alt?: string;
  order: number;
  isActive: boolean;
}

// Sortable Team Member Item Component
function SortableTeamItem({
  member,
  onEdit,
  onDelete,
  onToggleActive,
}: {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: member.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-xl p-4 shadow-sm border border-gray-200 ${
        !member.isActive ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-grab active:cursor-grabbing touch-none"
          style={{ touchAction: 'none' }}
        >
          <GripVertical className="w-5 h-5 text-gray-400" />
        </button>

        {/* Image Preview */}
        <div className="relative w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={member.url.startsWith('http') ? member.url : `${API_URL}${member.url}`}
            alt={member.alt || member.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900">{member.name}</h3>
          <p className="text-sm text-gray-600">{member.title}</p>
          {!member.isActive && (
            <span className="inline-block mt-1 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded">
              Versteckt
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleActive(member.id)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={member.isActive ? 'Verstecken' : 'Anzeigen'}
          >
            {member.isActive ? (
              <Eye className="w-4 h-4 text-gray-600" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-400" />
            )}
          </button>
          <button
            onClick={() => onEdit(member)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
            title="Bearbeiten"
          >
            <Pencil className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={() => onDelete(member.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Löschen"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal Component
function TeamMemberModal({
  isOpen,
  onClose,
  onSave,
  member,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  member: TeamMember | null;
  isLoading: boolean;
}) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [alt, setAlt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (member) {
      setName(member.name);
      setTitle(member.title);
      setAlt(member.alt || '');
      setImagePreview(member.url.startsWith('http') ? member.url : `${API_URL}${member.url}`);
    } else {
      setName('');
      setTitle('');
      setAlt('');
      setImagePreview(null);
    }
    setImageFile(null);
  }, [member, isOpen]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('alt', alt);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            {member ? 'Mitarbeiter bearbeiten' : 'Neuer Mitarbeiter'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto {!member && <span className="text-red-500">*</span>}
            </label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative w-24 h-24 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={imagePreview}
                    alt="Vorschau"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
              )}
              <label className="flex-1 flex items-center justify-center gap-2 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors">
                <Upload className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {imageFile ? imageFile.name : 'Bild auswählen'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required={!member}
                />
              </label>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="z.B. Max Mustermann"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="z.B. Geschäftsführer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Alt Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alt-Text (optional)
            </label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Bildbeschreibung für SEO"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Speichert...' : 'Speichern'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminMitarbeiterPage() {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
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
      fetchMembers();
    }
  }, [router]);

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/team`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMembers(data.sort((a: TeamMember, b: TeamMember) => a.order - b.order));
    } catch (error) {
      console.error('Error fetching team members:', error);
      setError('Fehler beim Laden der Mitarbeiter');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleSave = async (formData: FormData) => {
    setIsSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      let url: string;
      let method: string;

      if (editingMember) {
        // Check if there's a new image
        const hasNewImage = formData.get('image');
        if (hasNewImage) {
          url = `${API_URL}/api/team/${editingMember.id}/image`;
          method = 'PUT';
        } else {
          // Update without image
          url = `${API_URL}/api/team/${editingMember.id}`;
          method = 'PUT';
          // Convert FormData to JSON for non-image update
          const jsonData = {
            name: formData.get('name'),
            title: formData.get('title'),
            alt: formData.get('alt'),
          };
          const response = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(jsonData),
          });

          if (!response.ok) {
            throw new Error('Speichern fehlgeschlagen');
          }

          setSuccessMessage('Mitarbeiter erfolgreich aktualisiert');
          setIsModalOpen(false);
          fetchMembers();
          setTimeout(() => setSuccessMessage(''), 3000);
          return;
        }
      } else {
        url = `${API_URL}/api/team`;
        method = 'POST';
        formData.append('order', String(members.length));
        formData.append('isActive', 'true');
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Speichern fehlgeschlagen');
      }

      setSuccessMessage(
        editingMember ? 'Mitarbeiter erfolgreich aktualisiert' : 'Mitarbeiter erfolgreich erstellt'
      );
      setIsModalOpen(false);
      fetchMembers();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving team member:', error);
      setError('Fehler beim Speichern');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diesen Mitarbeiter wirklich löschen?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/team/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSuccessMessage('Mitarbeiter erfolgreich gelöscht');
        fetchMembers();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Fehler beim Löschen');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      setError('Verbindungsfehler');
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/team/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchMembers();
      } else {
        setError('Fehler beim Umschalten des Status');
      }
    } catch (error) {
      console.error('Error toggling team member:', error);
      setError('Verbindungsfehler');
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = members.findIndex((m) => m.id === active.id);
    const newIndex = members.findIndex((m) => m.id === over.id);

    const newMembers = arrayMove(members, oldIndex, newIndex);

    // Update order numbers
    const updatedMembers = newMembers.map((m, index) => ({
      ...m,
      order: index,
    }));

    setMembers(updatedMembers);

    // Save new order to backend
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/team/reorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          members: updatedMembers.map((m) => ({ id: m.id, order: m.order })),
        }),
      });

      if (response.ok) {
        setSuccessMessage('Reihenfolge aktualisiert');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Fehler beim Speichern der Reihenfolge');
        fetchMembers();
      }
    } catch (error) {
      console.error('Error updating order:', error);
      setError('Fehler beim Speichern der Reihenfolge');
      fetchMembers();
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
                <h1 className="text-2xl font-bold text-gray-900">Mitarbeiter verwalten</h1>
                <p className="text-sm text-gray-500">
                  Team-Mitglieder für die &quot;Unser Team&quot; Section verwalten
                </p>
              </div>
            </div>

            <button
              onClick={handleCreate}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Mitarbeiter hinzufügen</span>
            </button>
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
            <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">So funktioniert&apos;s:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Fügen Sie Mitarbeiter mit Foto, Name und Position hinzu</li>
                <li>Ziehen Sie die Einträge, um die Reihenfolge zu ändern</li>
                <li>Mit dem Auge-Symbol können Sie Mitarbeiter ein-/ausblenden</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Members List with Drag & Drop */}
        {members.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Noch keine Mitarbeiter vorhanden</p>
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Ersten Mitarbeiter hinzufügen</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              {members.length} {members.length === 1 ? 'Mitarbeiter' : 'Mitarbeiter'} im Team
            </p>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={members.map((m) => m.id)} strategy={verticalListSortingStrategy}>
                {members.map((member) => (
                  <SortableTeamItem
                    key={member.id}
                    member={member}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleActive={handleToggleActive}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        )}
      </main>

      {/* Modal */}
      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        member={editingMember}
        isLoading={isSaving}
      />
    </div>
  );
}
