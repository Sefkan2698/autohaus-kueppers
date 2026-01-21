'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/team?isActive=true`);
        if (response.ok) {
          const data = await response.json();
          setMembers(data);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Don't render section if no members or still loading
  if (isLoading || members.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <p className="text-neutral-500 text-sm tracking-[0.2em] uppercase mb-4">
            Team
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 max-w-lg">
            <span className="text-primary">Unser Team</span>
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {members.map((member) => (
            <div key={member.id} className="group text-center">
              {/* Image Container */}
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-neutral-100">
                <Image
                  src={member.url.startsWith('http') ? member.url : `${API_URL}${member.url}`}
                  alt={member.alt || member.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                {member.name}
              </h3>

              {/* Title */}
              <p className="text-sm text-neutral-600">
                {member.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
