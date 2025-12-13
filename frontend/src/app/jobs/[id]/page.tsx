'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { API_URL } from '@/lib/constants';

interface Job {
  id: string;
  title: string;
  department?: string;
  location: string;
  type: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'APPRENTICESHIP';
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: string;
  createdAt: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchJob(params.id as string);
    }
  }, [params.id]);

  const fetchJob = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/jobs/${id}`);
      if (response.ok) {
        const data = await response.json();
        setJob(data);
      } else {
        router.push('/jobs');
      }
    } catch (error) {
      console.error('Error fetching job:', error);
      router.push('/jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const getJobTypeLabel = (type: Job['type']) => {
    const labels = {
      FULL_TIME: 'Vollzeit',
      PART_TIME: 'Teilzeit',
      INTERNSHIP: 'Praktikum',
      APPRENTICESHIP: 'Ausbildung',
    };
    return labels[type];
  };

  const getJobTypeBadgeColor = (type: Job['type']) => {
    const colors = {
      FULL_TIME: 'bg-green-100 text-green-800',
      PART_TIME: 'bg-blue-100 text-blue-800',
      INTERNSHIP: 'bg-yellow-100 text-yellow-800',
      APPRENTICESHIP: 'bg-purple-100 text-purple-800',
    };
    return colors[type];
  };

  if (isLoading) {
    return (
      <main className="pt-24 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-gray-200 rounded w-32 mb-8 animate-pulse" />
          <div className="h-12 bg-gray-200 rounded max-w-2xl mb-4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded max-w-md mb-8 animate-pulse" />
          <div className="space-y-4">
            <div className="h-32 bg-gray-100 rounded animate-pulse" />
            <div className="h-48 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <main className="pt-24 pb-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Zurück zur Übersicht</span>
        </Link>

        {/* Job Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{job.title}</h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeBadgeColor(
                  job.type
                )}`}
              >
                {getJobTypeLabel(job.type)}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              {job.department && (
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span>{job.department}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{job.location}</span>
              </div>
              {job.salary && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{job.salary}</span>
                </div>
              )}
            </div>
          </div>

          {/* Job Content */}
          <div className="space-y-8">
            {/* Description */}
            <div className="bg-gray-50 rounded-xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Stellenbeschreibung
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            {job.requirements.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Das bringen Sie mit
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <span className="text-primary text-xl mt-0.5">•</span>
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Das bieten wir Ihnen
                </h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <span className="text-primary text-xl mt-0.5">✓</span>
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Apply CTA */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 md:p-8 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Interesse geweckt?
              </h2>
              <p className="text-gray-700 mb-6">
                Senden Sie uns Ihre Bewerbungsunterlagen oder rufen Sie uns an!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/kontakt?job=${encodeURIComponent(job.title)}`}
                  className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  Jetzt bewerben
                </Link>
                
                  <a href="tel:+4928233143"
                  className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Telefonisch bewerben
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}