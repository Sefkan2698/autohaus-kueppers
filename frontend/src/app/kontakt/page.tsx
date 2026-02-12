'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Phone, Mail } from 'lucide-react';
import { CONTENT, API_URL } from '@/lib/constants';
import GoogleMapConsent from '@/components/GoogleMapConsent';

// Betreff-Optionen
const SUBJECT_OPTIONS = [
  { value: '', label: 'Bitte wählen...' },
  { value: 'Kaufanfrage', label: 'Kaufanfrage' },
  { value: 'Probefahrt', label: 'Probefahrt vereinbaren' },
  { value: 'Service', label: 'Service & Werkstatt' },
  { value: 'Finanzierung', label: 'Finanzierung & Leasing' },
  { value: 'Sonstiges', label: 'Sonstiges' },
];

// Service-Optionen
const SERVICE_OPTIONS = [
  { value: '', label: 'Bitte wählen...' },
  { value: 'Kleine Inspektion', label: 'Kleine Inspektion' },
  { value: 'Große Inspektion', label: 'Große Inspektion' },
  { value: 'Ölwechsel', label: 'Ölwechsel' },
  { value: 'Reifenwechsel', label: 'Reifenwechsel / Einlagerung' },
  { value: 'HU/AU', label: 'HU/AU (TÜV)' },
  { value: 'Klimaanlagen-Service', label: 'Klimaanlagen-Service' },
  { value: 'Bremsen-Service', label: 'Bremsen-Service' },
  { value: 'Reparatur', label: 'Reparatur' },
  { value: 'Sonstiger Service', label: 'Sonstiger Service' },
];

// Wochentage für Terminauswahl
const WEEKDAYS = [
  { value: 'Montag', label: 'M' },
  { value: 'Dienstag', label: 'D' },
  { value: 'Mittwoch', label: 'M' },
  { value: 'Donnerstag', label: 'D' },
  { value: 'Freitag', label: 'F' },
];

// Zeitfenster für Terminauswahl
const TIME_SLOTS = [
  { value: 'morgens', label: 'Morgens (8-11 Uhr)' },
  { value: 'mittags', label: 'Mittags (11-13 Uhr)' },
  { value: 'nachmittags', label: 'Nachmittags (13-17 Uhr)' },
];

function ContactFormInner() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subjectCategory: '',
    serviceType: '',
    preferredDays: [] as string[],
    preferredTime: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Check if service type is required
  const isServiceSelected = formData.subjectCategory === 'Service';

  // Check if appointment selection should be shown
  const showAppointmentSelection = formData.subjectCategory === 'Service' || formData.subjectCategory === 'Probefahrt';

  useEffect(() => {
    const betreff = searchParams.get('betreff');
    const fahrzeug = searchParams.get('fahrzeug');
    const job = searchParams.get('job');

    if (betreff) {
      // Try to match to a category
      const matchedCategory = SUBJECT_OPTIONS.find(opt =>
        opt.value.toLowerCase() === betreff.toLowerCase()
      );
      if (matchedCategory) {
        setFormData(prev => ({ ...prev, subjectCategory: matchedCategory.value }));
      } else {
        setFormData(prev => ({ ...prev, subjectCategory: 'Sonstiges' }));
      }
    } else if (fahrzeug) {
      setFormData(prev => ({
        ...prev,
        subjectCategory: 'Kaufanfrage',
        message: `Anfrage zu: ${fahrzeug}\n\n`
      }));
    } else if (job) {
      setFormData(prev => ({
        ...prev,
        subjectCategory: 'Sonstiges',
        message: `Bewerbung für: ${job}\n\n`
      }));
    }
  }, [searchParams]);

  // Build the final subject line
  const buildSubject = () => {
    if (formData.subjectCategory === 'Service' && formData.serviceType) {
      return `Service - ${formData.serviceType}`;
    }
    return formData.subjectCategory || 'Kontaktanfrage';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (isServiceSelected && !formData.serviceType) {
      alert('Bitte wählen Sie eine Service-Art aus.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Build the message with service type and appointment preferences
      let finalMessage = formData.message;

      // Add appointment preferences if selected
      if (showAppointmentSelection && (formData.preferredDays.length > 0 || formData.preferredTime)) {
        let appointmentInfo = '\n\n--- Terminwunsch ---';
        if (formData.preferredDays.length > 0) {
          appointmentInfo += `\nBevorzugte Tage: ${formData.preferredDays.join(', ')}`;
        }
        if (formData.preferredTime) {
          const timeLabel = TIME_SLOTS.find(t => t.value === formData.preferredTime)?.label || formData.preferredTime;
          appointmentInfo += `\nBevorzugte Zeit: ${timeLabel}`;
        }
        finalMessage = finalMessage + appointmentInfo;
      }

      // Add service type at the top if applicable
      if (isServiceSelected && formData.serviceType) {
        finalMessage = `Gewünschter Service: ${formData.serviceType}\n\n${finalMessage}`;
      }

      const response = await fetch(`${API_URL}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: buildSubject(),
          message: finalMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Senden der Nachricht');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', subjectCategory: '', serviceType: '', preferredDays: [], preferredTime: '' });
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
            Betreff *
          </label>
          <select
            id="subject"
            required
            value={formData.subjectCategory}
            onChange={(e) => setFormData({ ...formData, subjectCategory: e.target.value, serviceType: '' })}
            className="w-full px-4 py-3 bg-white border border-neutral-200 text-neutral-900 focus:outline-none focus:border-neutral-400 transition-colors"
          >
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Service-Art Dropdown - nur sichtbar wenn "Service" ausgewählt */}
      {isServiceSelected && (
        <div>
          <label htmlFor="serviceType" className="block text-sm text-neutral-600 mb-2">
            Service-Art *
          </label>
          <select
            id="serviceType"
            required
            value={formData.serviceType}
            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-neutral-200 text-neutral-900 focus:outline-none focus:border-neutral-400 transition-colors"
          >
            {SERVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Terminwunsch - nur sichtbar bei Service oder Probefahrt */}
      {showAppointmentSelection && (
        <div className="space-y-4 p-4 bg-neutral-100 border border-neutral-200">
          <p className="text-sm font-medium text-neutral-700">
            Wann können wir Sie am besten erreichen?
          </p>

          {/* Wochentage */}
          <div>
            <label className="block text-sm text-neutral-600 mb-2">
              Bevorzugte Tage
            </label>
            <div className="flex gap-2">
              {WEEKDAYS.map((day) => {
                const isSelected = formData.preferredDays.includes(day.value);
                return (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        preferredDays: isSelected
                          ? prev.preferredDays.filter(d => d !== day.value)
                          : [...prev.preferredDays, day.value]
                      }));
                    }}
                    className={`w-10 h-10 flex items-center justify-center text-sm font-medium border transition-colors ${
                      isSelected
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary hover:text-primary'
                    }`}
                    title={day.value}
                  >
                    {day.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Zeitfenster */}
          <div>
            <label className="block text-sm text-neutral-600 mb-2">
              Bevorzugte Uhrzeit
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              {TIME_SLOTS.map((slot) => {
                const isSelected = formData.preferredTime === slot.value;
                return (
                  <button
                    key={slot.value}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        preferredTime: isSelected ? '' : slot.value
                      }));
                    }}
                    className={`px-4 py-2 text-sm font-medium border transition-colors ${
                      isSelected
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

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
        <div className="bg-primary text-white px-4 py-3 text-sm">
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
        className="w-full bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
          <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
            Kontakt
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Wir sind für Sie da
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
              <div className="space-y-5">
                <div>
                  <p className="text-sm text-primary font-medium mb-3">Verkauf</p>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Mo. – Do.</span>
                      <span className="text-neutral-900 text-right">9:00 – 13:00 &amp; 15:00 – 18:00 Uhr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Fr.</span>
                      <span className="text-neutral-900 text-right">9:00 – 13:00 &amp; 15:00 – 17:00 Uhr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Sa.</span>
                      <span className="text-neutral-900 text-right">9:00 – 12:30 Uhr</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-primary font-medium mb-3">Werkstatt</p>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Mo. – Fr.</span>
                      <span className="text-neutral-900 text-right">7:30 – 12:00 &amp; 13:00 – 17:00 Uhr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Sa.</span>
                      <span className="text-neutral-900 text-right">9:00 – 12:30 Uhr</span>
                    </div>
                  </div>
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
