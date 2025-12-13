'use client';

import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { CONTENT } from '@/lib/constants';

export default function GoogleMapConsent() {
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('googleMapsConsent');
    if (consent === 'true') {
      setHasConsent(true);
    }
    setIsLoading(false);
  }, []);

  const handleConsent = () => {
    localStorage.setItem('googleMapsConsent', 'true');
    setHasConsent(true);
  };

  if (isLoading) {
    return (
      <div className="w-full h-[400px] md:h-[500px] bg-gray-100 rounded-xl animate-pulse" />
    );
  }

  if (!hasConsent) {
    return (
      <button
        onClick={handleConsent}
        className="relative w-full h-[400px] md:h-[500px] bg-gray-300 rounded-xl overflow-hidden cursor-pointer hover:bg-gray-400 transition-colors group"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-gray-500 rounded-full" />
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border-2 border-gray-500 rounded-full" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <MapPin className="w-12 h-12 md:w-16 md:h-16 text-gray-600 mb-4 group-hover:text-gray-700 transition-colors" />
          
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
            Google Maps laden
          </h3>
          
          <p className="text-sm md:text-base text-gray-700 max-w-md leading-relaxed">
            Durch Klicken werden Daten an Google übermittelt.
            <br />
            <span className="text-xs md:text-sm opacity-75">
              Sie akzeptieren die Datenschutzbestimmungen von Google.
            </span>
          </p>
        </div>
      </button>
    );
  }

  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
      <iframe
        src={CONTENT.googleMapsEmbed}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Autohaus Küppers Standort"
      />
    </div>
  );
}