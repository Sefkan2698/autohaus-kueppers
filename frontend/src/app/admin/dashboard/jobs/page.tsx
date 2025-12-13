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
  Briefcase,
} from 'lucide-react';
import Link from 'next/link';
import { API_URL } from '@/lib/constants';

type JobType = 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'APPRENTICESHIP';

interface Job {
  id: string;
  title: string;
  department?: string;
  location: string;
  type: JobType;
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'FULL_TIME' as JobType,
    description: '',
    requirements: [''],
    benefits: [''],
    salary: '',
    isActive: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    } else {
      fetchJobs();
    }
  }, [router]);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Fehler beim Laden der Jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Filter leere Requirements und Benefits
    const cleanedData = {
      ...formData,
      requirements: formData.requirements.filter(r => r.trim() !== ''),
      benefits: formData.benefits.filter(b => b.trim() !== ''),
    };

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingJob
        ? `${API_URL}/api/jobs/${editingJob.id}`
        : `${API_URL}/api/jobs`;
      const method = editingJob ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cleanedData),
      });

      if (response.ok) {
        setSuccessMessage(
          editingJob ? 'Job erfolgreich aktualisiert' : 'Job erfolgreich erstellt'
        );
        fetchJobs();
        resetForm();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Fehler beim Speichern');
      }
    } catch (error) {
      console.error('Error saving job:', error);
      setError('Verbindungsfehler');
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department || '',
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements.length > 0 ? job.requirements : [''],
      benefits: job.benefits.length > 0 ? job.benefits : [''],
      salary: job.salary || '',
      isActive: job.isActive,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diesen Job wirklich löschen?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSuccessMessage('Job erfolgreich gelöscht');
        fetchJobs();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Fehler beim Löschen');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      setError('Verbindungsfehler');
    }
  };

  const toggleActive = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/jobs/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSuccessMessage('Job-Status aktualisiert');
        fetchJobs();
        setTimeout(() => setSuccessMessage(''), 2000);
      } else {
        setError('Fehler beim Umschalten');
      }
    } catch (error) {
      console.error('Error toggling job:', error);
      setError('Verbindungsfehler');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      location: '',
      type: 'FULL_TIME',
      description: '',
      requirements: [''],
      benefits: [''],
      salary: '',
      isActive: true,
    });
    setEditingJob(null);
    setShowForm(false);
  };

  const addRequirement = () => {
    setFormData({ ...formData, requirements: [...formData.requirements, ''] });
  };

  const removeRequirement = (index: number) => {
    const newReqs = formData.requirements.filter((_, i) => i !== index);
    setFormData({ ...formData, requirements: newReqs.length > 0 ? newReqs : [''] });
  };

  const updateRequirement = (index: number, value: string) => {
    const newReqs = [...formData.requirements];
    newReqs[index] = value;
    setFormData({ ...formData, requirements: newReqs });
  };

  const addBenefit = () => {
    setFormData({ ...formData, benefits: [...formData.benefits, ''] });
  };

  const removeBenefit = (index: number) => {
    const newBens = formData.benefits.filter((_, i) => i !== index);
    setFormData({ ...formData, benefits: newBens.length > 0 ? newBens : [''] });
  };

  const updateBenefit = (index: number, value: string) => {
    const newBens = [...formData.benefits];
    newBens[index] = value;
    setFormData({ ...formData, benefits: newBens });
  };

  const getJobTypeLabel = (type: JobType) => {
    const labels = {
      FULL_TIME: 'Vollzeit',
      PART_TIME: 'Teilzeit',
      INTERNSHIP: 'Praktikum',
      APPRENTICESHIP: 'Ausbildung',
    };
    return labels[type];
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
                <h1 className="text-2xl font-bold text-gray-900">Stellenangebote verwalten</h1>
                <p className="text-sm text-gray-500">Jobs erstellen, bearbeiten und verwalten</p>
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
              <span>Neuer Job</span>
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
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => resetForm()}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto my-8"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingJob ? 'Job bearbeiten' : 'Neuer Job'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Titel & Abteilung */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jobtitel *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="z.B. Kfz-Mechatroniker (m/w/d)"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Abteilung (optional)
                      </label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="z.B. Werkstatt"
                      />
                    </div>
                  </div>

                  {/* Standort, Typ & Gehalt */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Standort *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="z.B. Goch"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Art der Stelle *
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as JobType })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="FULL_TIME">Vollzeit</option>
                        <option value="PART_TIME">Teilzeit</option>
                        <option value="INTERNSHIP">Praktikum</option>
                        <option value="APPRENTICESHIP">Ausbildung</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gehalt (optional)
                      </label>
                      <input
                        type="text"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="z.B. nach Vereinbarung"
                      />
                    </div>
                  </div>

                  {/* Beschreibung */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Beschreibung *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Beschreiben Sie die Position..."
                      rows={4}
                      required
                    />
                  </div>

                  {/* Anforderungen */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Anforderungen
                    </label>
                    {formData.requirements.map((req, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={req}
                          onChange={(e) => updateRequirement(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="z.B. Führerschein Klasse B"
                        />
                        {formData.requirements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRequirement(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addRequirement}
                      className="text-sm text-primary hover:underline"
                    >
                      + Anforderung hinzufügen
                    </button>
                  </div>

                  {/* Benefits */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Benefits / Was wir bieten
                    </label>
                    {formData.benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => updateBenefit(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="z.B. Firmenwagen"
                        />
                        {formData.benefits.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBenefit(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addBenefit}
                      className="text-sm text-primary hover:underline"
                    >
                      + Benefit hinzufügen
                    </button>
                  </div>

                  {/* Active Toggle */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                      Job ist aktiv (wird auf der Website angezeigt)
                    </label>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                    >
                      <Save className="w-5 h-5" />
                      {editingJob ? 'Aktualisieren' : 'Erstellen'}
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

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Keine Stellenangebote vorhanden. Erstellen Sie Ihr erstes Angebot!</p>
            </div>
          ) : (
            jobs.map((job) => (
              <motion.div
                key={job.id}
                className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 flex-wrap">
                      {job.isActive ? (
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
                      <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {getJobTypeLabel(job.type)}
                      </span>
                      {job.department && (
                        <span className="text-sm text-gray-600">· {job.department}</span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{job.location}</p>
                    <p className="text-gray-700 mb-3 line-clamp-2">{job.description}</p>
                    {job.requirements.length > 0 && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Anforderungen:</span> {job.requirements.length} Punkte
                      </div>
                    )}
                  </div>

                  <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => toggleActive(job.id)}
                      className="flex-1 sm:flex-none p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title={job.isActive ? 'Deaktivieren' : 'Aktivieren'}
                    >
                      {job.isActive ? (
                        <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mx-auto" />
                      ) : (
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mx-auto" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(job)}
                      className="flex-1 sm:flex-none p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Bearbeiten"
                    >
                      <Edit2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto" />
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="flex-1 sm:flex-none p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Löschen"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mx-auto" />
                    </button>
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
