'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';
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

  if (isLoading) {
    return (
      <main className="pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="h-6 bg-neutral-100 w-32 mb-8 animate-pulse" />
          <div className="h-10 bg-neutral-100 w-2/3 mb-4 animate-pulse" />
          <div className="h-6 bg-neutral-100 w-1/3 mb-8 animate-pulse" />
          <div className="space-y-4">
            <div className="h-32 bg-neutral-100 animate-pulse" />
            <div className="h-48 bg-neutral-100 animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <main className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-sm">Zurück</span>
        </Link>

        {/* Job Header */}
        <div className="mb-12">
          <p className="text-neutral-500 text-sm tracking-[0.2em] uppercase mb-4">
            {getJobTypeLabel(job.type)}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-neutral-500">
            {job.department && <span>{job.department}</span>}
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              <span>{job.location}</span>
            </div>
            {job.salary && <span>{job.salary}</span>}
          </div>
        </div>

        {/* Job Content */}
        <div className="space-y-12">
          {/* Description */}
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
              Stellenbeschreibung
            </p>
            <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Two Column Layout for Requirements & Benefits */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Requirements */}
            {job.requirements.length > 0 && (
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
                  Das bringen Sie mit
                </p>
                <ul className="space-y-3">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="text-neutral-600 text-sm leading-relaxed pl-4 border-l-2 border-neutral-200">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits.length > 0 && (
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
                  Das bieten wir Ihnen
                </p>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-neutral-600 text-sm leading-relaxed pl-4 border-l-2 border-neutral-900">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Apply CTA */}
          <div className="bg-neutral-100 p-8 md:p-12">
            <p className="text-neutral-500 text-sm tracking-[0.2em] uppercase mb-4">
              Interesse geweckt?
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Jetzt bewerben
            </h2>
            <p className="text-neutral-600 mb-8 max-w-xl">
              Senden Sie uns Ihre Bewerbungsunterlagen per E-Mail oder rufen Sie uns an.
              Wir freuen uns auf Ihre Bewerbung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/kontakt?betreff=Bewerbung: ${encodeURIComponent(job.title)}`}
                className="inline-flex items-center justify-center gap-2 bg-white border border-neutral-200 text-neutral-900 px-6 py-3 font-medium hover:border-neutral-400 transition-colors"
              >
                <Mail className="w-4 h-4" strokeWidth={1.5} />
                Online bewerben
              </Link>
              <a
                href="tel:+4928233143"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors"
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                +49 (0) 2823 3143
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
