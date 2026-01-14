'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Phone, Mail } from 'lucide-react';
import { CONTENT, API_URL } from '@/lib/constants';
import GoogleMapConsent from '@/components/GoogleMapConsent';

function ContactFormInner() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const betreff = searchParams.get('betreff');
    const fahrzeug = searchParams.get('fahrzeug');
    const job = searchParams.get('job');

    if (betreff) {
      setFormData(prev => ({ ...prev, subject: betreff }));
    } else if (fahrzeug) {
      setFormData(prev => ({ ...prev, subject: `Anfrage: ${fahrzeug}` }));
    } else if (job) {
      setFormData(prev => ({ ...prev, subject: `Bewerbung: ${job}` }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`${API_URL}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Senden der Nachricht');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', subject: '' });
    } catch (error) {
      console.error('Fehler beim Senden:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm text-neutral-600 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-neutral-200 text-neutral-900 focus:outline-none focus:border-neutral-400 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-neutral-600 mb-2">
            E-Mail *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-neutral-200 text-neutral-900 focus:outline-none focus:border-neutral-400 transition-colors"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm text-neutral-600 mb-2">
            Telefon
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-neutral-200 text-neutral-900 focus:outline-none focus:border-neutral-400 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm text-neutral-600 mb-2">
            Betreff
          </label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-neutral-200 text-neutral-900 focus:outline-none focus:border-neutral-400 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-neutral-600 mb-2">
          Nachricht *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-neutral-200 text-neutral-900 focus:outline-none focus:border-neutral-400 transition-colors resize-none"
        />
      </div>

      {submitStatus === 'success' && (
        <div className="bg-neutral-900 text-white px-4 py-3 text-sm">
          Vielen Dank! Ihre Nachricht wurde erfolgreich versendet.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-neutral-900 text-white px-6 py-3 font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
      </button>
    </form>
  );
}

function ContactFormFallback() {
  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="h-[74px] bg-neutral-100 animate-pulse" />
        <div className="h-[74px] bg-neutral-100 animate-pulse" />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="h-[74px] bg-neutral-100 animate-pulse" />
        <div className="h-[74px] bg-neutral-100 animate-pulse" />
      </div>
      <div className="h-[138px] bg-neutral-100 animate-pulse" />
      <div className="h-[50px] bg-neutral-100 animate-pulse" />
    </div>
  );
}

export default function KontaktPage() {
  return (
    <main className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="text-neutral-500 text-sm tracking-[0.2em] uppercase mb-4">
            Kontakt
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            <span className="text-primary">Wir sind für Sie da</span>
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed">
            Haben Sie Fragen zu unseren Fahrzeugen oder Services? Vereinbaren Sie einen Termin
            oder besuchen Sie uns direkt vor Ort in Goch.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Contact Information */}
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-6">
              Kontaktinformationen
            </p>

            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-neutral-600" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-medium text-primary mb-1">Adresse</p>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {CONTENT.address.street}<br />
                    {CONTENT.address.city}<br />
                    {CONTENT.address.country}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-neutral-600" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-medium text-primary mb-1">Telefon</p>
                  <a
                    href={`tel:${CONTENT.phone.replace(/\s/g, '')}`}
                    className="text-neutral-600 text-sm hover:text-neutral-900 transition-colors"
                  >
                    {CONTENT.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-neutral-600" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-medium text-primary mb-1">E-Mail</p>
                  <a
                    href={`mailto:${CONTENT.email}`}
                    className="text-neutral-600 text-sm hover:text-neutral-900 transition-colors"
                  >
                    {CONTENT.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="mt-12 pt-12 border-t border-neutral-200">
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-6">
                Öffnungszeiten
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-primary font-medium mb-1">Verkauf</p>
                  <p className="text-neutral-900 font-medium text-sm">{CONTENT.hours.sales.weekdays}</p>
                </div>
                <div>
                  <p className="text-sm text-primary font-medium mb-1">Service</p>
                  <p className="text-neutral-900 font-medium text-sm">{CONTENT.hours.service.weekdays}</p>
                </div>
                <div>
                  <p className="text-sm text-primary font-medium mb-1">Teile</p>
                  <p className="text-neutral-900 font-medium text-sm">{CONTENT.hours.parts}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-neutral-50 p-8 md:p-10">
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
              Nachricht senden
            </p>
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">
              Schreiben Sie uns
            </h2>

            <Suspense fallback={<ContactFormFallback />}>
              <ContactFormInner />
            </Suspense>
          </div>
        </div>

        {/* Google Maps */}
        <div>
          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-6">
            Anfahrt
          </p>
          <GoogleMapConsent />
        </div>
      </div>
    </main>
  );
}
