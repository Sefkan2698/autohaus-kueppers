'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Plus,
  Trash2,
  AlertCircle,
  Users,
  Pencil,
  X,
  Shield,
  ShieldCheck,
  Mail,
  User,
  Lock,
} from 'lucide-react';
import Link from 'next/link';
import { API_URL } from '@/lib/constants';

interface UserData {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  createdAt: string;
}

// Modal Component
function UserModal({
  isOpen,
  onClose,
  onSave,
  user,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { email: string; name: string; role: string; password?: string }) => void;
  user: UserData | null;
  isLoading: boolean;
}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'SUPER_ADMIN'>('ADMIN');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
      setRole(user.role);
      setPassword('');
      setConfirmPassword('');
    } else {
      setEmail('');
      setName('');
      setRole('ADMIN');
      setPassword('');
      setConfirmPassword('');
    }
    setPasswordError('');
  }, [user, isOpen]);

  const validatePassword = (pw: string) => {
    if (pw.length < 8) return 'Passwort muss mindestens 8 Zeichen haben';
    if (!/[A-Z]/.test(pw)) return 'Passwort muss mindestens einen Großbuchstaben enthalten';
    if (!/[a-z]/.test(pw)) return 'Passwort muss mindestens einen Kleinbuchstaben enthalten';
    if (!/[0-9]/.test(pw)) return 'Passwort muss mindestens eine Zahl enthalten';
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    // Nur bei neuem Benutzer ist Passwort erforderlich
    if (!user && !password) {
      setPasswordError('Passwort ist erforderlich');
      return;
    }

    if (password) {
      const error = validatePassword(password);
      if (error) {
        setPasswordError(error);
        return;
      }
      if (password !== confirmPassword) {
        setPasswordError('Passwörter stimmen nicht überein');
        return;
      }
    }

    onSave({
      email,
      name,
      role,
      ...(password ? { password } : {}),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            {user ? 'Benutzer bearbeiten' : 'Neuer Benutzer'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Max Mustermann"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rolle <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('ADMIN')}
                className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                  role === 'ADMIN'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span className="font-medium">Admin</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('SUPER_ADMIN')}
                className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                  role === 'SUPER_ADMIN'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span className="font-medium">Superadmin</span>
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              {role === 'SUPER_ADMIN'
                ? 'Superadmins können Benutzer verwalten'
                : 'Admins können alle Inhalte verwalten außer Benutzer'}
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passwort {!user && <span className="text-red-500">*</span>}
              {user && <span className="text-gray-400 text-xs ml-1">(leer lassen um beizubehalten)</span>}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required={!user}
              />
            </div>
          </div>

          {/* Confirm Password */}
          {password && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passwort bestätigen <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          {/* Password Error */}
          {passwordError && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {passwordError}
            </div>
          )}

          {/* Password Requirements */}
          {!user && (
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
              <p className="font-medium mb-1">Passwortanforderungen:</p>
              <ul className="space-y-0.5 list-disc list-inside">
                <li>Mindestens 8 Zeichen</li>
                <li>Mindestens ein Großbuchstabe</li>
                <li>Mindestens ein Kleinbuchstabe</li>
                <li>Mindestens eine Zahl</li>
              </ul>
            </div>
          )}

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

export default function AdminBenutzerPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    } else {
      fetchCurrentUser();
      fetchUsers();
    }
  }, [router]);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);

        // Prüfe ob Benutzer Superadmin ist
        if (data.role !== 'SUPER_ADMIN') {
          router.push('/admin/dashboard');
        }
      } else if (response.status === 403) {
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else if (response.status === 403) {
        setError('Keine Berechtigung. Nur Superadmins können Benutzer verwalten.');
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Fehler beim Laden der Benutzer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: UserData) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSave = async (data: { email: string; name: string; role: string; password?: string }) => {
    setIsSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      let response;

      if (editingUser) {
        // Update
        response = await fetch(`${API_URL}/api/users/${editingUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
      } else {
        // Create
        response = await fetch(`${API_URL}/api/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Speichern fehlgeschlagen');
      }

      setSuccessMessage(
        editingUser ? 'Benutzer erfolgreich aktualisiert' : 'Benutzer erfolgreich erstellt'
      );
      setIsModalOpen(false);
      fetchUsers();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      console.error('Error saving user:', error);
      setError(error.message || 'Fehler beim Speichern');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    // Prüfe ob es der aktuelle Benutzer ist
    if (currentUser && id === currentUser.id) {
      setError('Sie können sich nicht selbst löschen');
      return;
    }

    if (!confirm('Möchten Sie diesen Benutzer wirklich löschen?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSuccessMessage('Benutzer erfolgreich gelöscht');
        fetchUsers();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Fehler beim Löschen');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
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
                <h1 className="text-2xl font-bold text-gray-900">Benutzerverwaltung</h1>
                <p className="text-sm text-gray-500">Admin-Benutzer verwalten</p>
              </div>
            </div>

            <button
              onClick={handleCreate}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Benutzer hinzufügen</span>
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
            <button onClick={() => setError('')} className="ml-auto">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Benutzerrollen:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li><strong>Admin:</strong> Kann alle Inhalte verwalten (Fahrzeuge, Jobs, etc.)</li>
                <li><strong>Superadmin:</strong> Kann zusätzlich Benutzer verwalten</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Users List */}
        {users.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Noch keine Benutzer vorhanden</p>
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Ersten Benutzer hinzufügen</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              {users.length} {users.length === 1 ? 'Benutzer' : 'Benutzer'} vorhanden
            </p>

            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    user.role === 'SUPER_ADMIN' ? 'bg-purple-100' : 'bg-blue-100'
                  }`}>
                    {user.role === 'SUPER_ADMIN' ? (
                      <ShieldCheck className="w-6 h-6 text-purple-600" />
                    ) : (
                      <Shield className="w-6 h-6 text-blue-600" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      {currentUser && user.id === currentUser.id && (
                        <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">
                          Sie
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded ${
                      user.role === 'SUPER_ADMIN'
                        ? 'text-purple-700 bg-purple-50'
                        : 'text-blue-700 bg-blue-50'
                    }`}>
                      {user.role === 'SUPER_ADMIN' ? 'Superadmin' : 'Admin'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Bearbeiten"
                    >
                      <Pencil className="w-4 h-4 text-blue-600" />
                    </button>
                    {currentUser && user.id !== currentUser.id && (
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Löschen"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        user={editingUser}
        isLoading={isSaving}
      />
    </div>
  );
}
