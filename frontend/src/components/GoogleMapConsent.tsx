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
      <div className="w-full h-[400px] md:h-[500px] bg-neutral-100 animate-pulse" />
    );
  }

  if (!hasConsent) {
    return (
      <button
        onClick={handleConsent}
        className="relative w-full h-[400px] md:h-[500px] bg-neutral-200 overflow-hidden cursor-pointer hover:bg-neutral-300 transition-colors group"
      >
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center mb-6">
            <MapPin className="w-6 h-6 text-neutral-600" strokeWidth={1.5} />
          </div>

          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Google Maps laden
          </h3>

          <p className="text-sm text-neutral-600 max-w-md leading-relaxed">
            Durch Klicken werden Daten an Google übermittelt.
            <br />
            <span className="text-xs text-neutral-500">
              Sie akzeptieren die Datenschutzbestimmungen von Google.
            </span>
          </p>

          <span className="mt-6 px-6 py-2 bg-primary text-white text-sm font-medium group-hover:bg-primary-dark transition-colors">
            Karte anzeigen
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className="w-full h-[400px] md:h-[500px] overflow-hidden">
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
