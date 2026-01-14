'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';
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

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/api/jobs?isActive=true`);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
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

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || job.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <main className="pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="h-8 bg-neutral-100 w-48 mb-12 animate-pulse" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-neutral-100 animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-neutral-500 text-sm tracking-[0.2em] uppercase mb-4">
            Karriere
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Werden Sie Teil unseres Teams
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed max-w-2xl">
            Wir suchen motivierte Mitarbeiter für unser traditionsreiches Autohaus in Goch.
            Entdecken Sie unsere aktuellen Stellenangebote.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-10 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Jobs durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {['all', 'FULL_TIME', 'PART_TIME', 'APPRENTICESHIP', 'INTERNSHIP'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  filterType === type
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {type === 'all'
                  ? 'Alle'
                  : getJobTypeLabel(type as Job['type'])}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500">
              {searchTerm || filterType !== 'all'
                ? 'Keine Jobs gefunden. Versuchen Sie andere Suchkriterien.'
                : 'Aktuell keine offenen Stellen verfügbar.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="block bg-white border border-neutral-200 p-6 md:p-8 hover:border-neutral-400 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h3 className="text-lg md:text-xl font-semibold text-neutral-900 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium">
                        {getJobTypeLabel(job.type)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-4">
                      {job.department && (
                        <span>{job.department}</span>
                      )}
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" strokeWidth={1.5} />
                        <span>{job.location}</span>
                      </div>
                      {job.salary && (
                        <span>{job.salary}</span>
                      )}
                    </div>

                    <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2">
                      {job.description}
                    </p>
                  </div>

                  <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" strokeWidth={1.5} />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* General Application CTA */}
        <div className="mt-16 bg-neutral-100 p-8 md:p-12">
          <div className="max-w-xl">
            <p className="text-neutral-500 text-sm tracking-[0.2em] uppercase mb-4">
              Initiativbewerbung
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Keine passende Stelle dabei?
            </h2>
            <p className="text-neutral-600 mb-8">
              Bewerben Sie sich initiativ. Wir freuen uns, von Ihnen zu hören.
            </p>
            <Link
              href="/kontakt?betreff=Initiativbewerbung"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors"
            >
              Initiativ bewerben
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
