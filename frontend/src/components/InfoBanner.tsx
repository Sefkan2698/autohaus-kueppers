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
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActiveBanner();
  }, []);

  const fetchActiveBanner = async () => {
    try {
      const response = await fetch(`${API_URL}/api/infobanner`);
      const data = await response.json();

      if (data.length > 0) {
        const bannerId = data[0].id;
        const wasClosed = sessionStorage.getItem(`banner-closed-${bannerId}`);

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
      sessionStorage.setItem(`banner-closed-${banner.id}`, 'true');
    }
  };

  if (isLoading || !banner || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25 }}
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header mit Primary Color */}
            <div className="bg-primary px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-white flex-1">
                  {banner.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-5">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {banner.message}
              </p>

              {banner.link && banner.linkText && (
                <Link
                  href={banner.link}
                  className="inline-flex items-center gap-2 mt-4 text-primary font-semibold hover:underline text-sm md:text-base"
                  onClick={handleClose}
                >
                  {banner.linkText}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
            </div>

            {/* Footer mit Button */}
            <div className="px-6 pb-6">
              <button
                onClick={handleClose}
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                <span>Verstanden</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
