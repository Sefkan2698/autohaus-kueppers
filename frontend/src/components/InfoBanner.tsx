'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell } from 'lucide-react';
import Link from 'next/link';
import { API_URL } from '@/lib/constants';

interface Banner {
  id: string;
  title: string;
  message: string;
  link?: string;
  linkText?: string;
}

export default function InfoBanner() {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActiveBanner();
  }, []);

  const fetchActiveBanner = async () => {
    try {
      // Ohne ?admin=true → holt nur aktive Banner
      const response = await fetch(`${API_URL}/api/infobanner`);
      const data = await response.json();
      
      // Get the first active banner
      if (data.length > 0) {
        const bannerId = data[0].id;
        // Check if user has closed this banner
        const wasClosed = localStorage.getItem(`banner-closed-${bannerId}`);
        
        if (!wasClosed) {
          setBanner(data[0]);
          setIsVisible(true);
        }
      }
    } catch (error) {
      console.error('Error fetching banner:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    if (banner) {
      localStorage.setItem(`banner-closed-${banner.id}`, 'true');
    }
  };

  if (isLoading || !banner || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="relative border-b-2 bg-primary border-primary"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex items-start gap-3 md:gap-4">
            {/* Icon */}
            <div className="mt-0.5 text-white">
              <Bell className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 text-white">
              <h3 className="text-sm md:text-base font-bold mb-1">{banner.title}</h3>
              <p className="text-xs md:text-sm leading-relaxed">{banner.message}</p>
              
              {banner.link && banner.linkText && (
                <Link
                  href={banner.link}
                  className="inline-block mt-2 text-xs md:text-sm font-semibold underline hover:no-underline"
                >
                  {banner.linkText} →
                </Link>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors text-white"
              aria-label="Banner schließen"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}