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
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Diagonaler Hintergrund - von unten links nach oben rechts */}
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-0 bg-neutral-100"
        style={{
          clipPath: 'polygon(0 65%, 100% 35%, 100% 100%, 0 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <p className="text-neutral-500 text-sm tracking-[0.2em] uppercase mb-4">
            Team
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 max-w-lg">
            Die Menschen hinter <span className="text-primary">Küppers</span>
          </h2>
        </div>

        {/* Team Horizontal Scroll */}
        <div className="overflow-x-auto pb-4 -mx-6 px-6 lg:-mx-8 lg:px-8 scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
          <div className="flex gap-8 md:gap-12">
            {members.map((member) => (
              <div key={member.id} className="group text-center flex-shrink-0">
                {/* Image Container - Rund */}
                <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto mb-5 rounded-full overflow-hidden bg-neutral-200 shadow-lg">
                  <Image
                    src={member.url.startsWith('http') ? member.url : `${API_URL}${member.url}`}
                    alt={member.alt || member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                </div>

                {/* Name */}
                <h3 className="text-base font-semibold text-neutral-900 mb-1">
                  {member.name}
                </h3>

                {/* Title */}
                <p className="text-sm text-neutral-500 whitespace-nowrap">
                  {member.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
