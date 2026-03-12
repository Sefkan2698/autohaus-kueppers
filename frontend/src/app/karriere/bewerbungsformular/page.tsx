'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Upload, X, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { API_URL } from '@/lib/constants';

interface Job {
  id: string;
  title: string;
  isActive: boolean;
}

type FormData = {
  anrede: string;
  vorname: string;
  nachname: string;
  wohnort: string;
  telefon: string;
  email: string;
  geburtsdatum: string;
  stelle: string;
  berufserfahrung: string;
  sprachkenntnisse: string;
  fuehrerschein: string;
  inAnstellung: string;
  eintrittsdatum: string;
  motivation: string;
};

const initialForm: FormData = {
  anrede: '',
  vorname: '',
  nachname: '',
  wohnort: '',
  telefon: '',
  email: '',
  geburtsdatum: '',
  stelle: '',
  berufserfahrung: '',
  sprachkenntnisse: '',
  fuehrerschein: '',
  inAnstellung: '',
  eintrittsdatum: '',
  motivation: '',
};

const MAX_FILE_SIZE_MB = 10;
const MAX_FILES = 5;

export default function BewerbungsformularPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/jobs?isActive=true`)
      .then((r) => r.json())
      .then((data: Job[]) => setJobs(data))
      .catch(() => {});
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setFileError('');
    const added: File[] = [];
    for (const file of Array.from(newFiles)) {
      if (file.type !== 'application/pdf') {
        setFileError('Nur PDF-Dateien sind erlaubt.');
        return;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setFileError(`Maximale Dateigröße pro Datei: ${MAX_FILE_SIZE_MB} MB.`);
        return;
      }
      added.push(file);
    }
    const combined = [...files, ...added];
    if (combined.length > MAX_FILES) {
      setFileError(`Maximal ${MAX_FILES} Dateien erlaubt.`);
      return;
    }
    setFiles(combined);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!form.anrede) { setSubmitError('Bitte wählen Sie eine Anrede.'); return; }
    if (!form.stelle) { setSubmitError('Bitte wählen Sie eine Stelle.'); return; }

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      files.forEach((f) => fd.append('dokumente', f));

      const res = await fetch(`${API_URL}/api/bewerbung/submit`, {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Fehler beim Senden.');
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Fehler beim Senden der Bewerbung.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center py-20">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" strokeWidth={1.5} />
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Bewerbung eingegangen!</h1>
          <p className="text-neutral-600 leading-relaxed mb-8">
            Vielen Dank für deine Bewerbung. Wir werden uns so schnell wie möglich bei dir melden.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors rounded"
          >
            Zurück zu den Stellenangeboten
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </main>
    );
  }

  const inputClass =
    'w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors text-sm';
  const labelClass = 'block text-xs text-neutral-500 uppercase tracking-wider mb-2';

  return (
    <main className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4">
            Karriere
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Online Bewerbungsformular
          </h1>
          <p className="text-neutral-600 leading-relaxed mb-2">
            Jetzt mit nur ein paar Klicks bewerben.
          </p>
          <p className="text-neutral-600 leading-relaxed mb-2">
            Egal ob 20 Jahre Erfahrung, frisch aus der Ausbildung oder Quereinsteiger –
            bei uns im Autohaus Küppers ist jeder willkommen! Die Hauptsache ist, du hast Spaß
            am Job und Lust dich weiterzubilden.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            Du suchst einen Ausbildungsplatz? Perfekt, wir bilden aus!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Anrede */}
          <div>
            <p className={labelClass}>Anrede <span className="text-primary">*</span></p>
            <div className="flex flex-wrap gap-6">
              {['Herr', 'Frau', 'Sonstige/Divers'].map((a) => (
                <label key={a} className="flex items-center gap-2 cursor-pointer text-sm text-neutral-700">
                  <input
                    type="radio"
                    name="anrede"
                    value={a}
                    checked={form.anrede === a}
                    onChange={handleChange}
                    className="accent-primary"
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Vorname <span className="text-primary">*</span></label>
              <input
                type="text"
                name="vorname"
                value={form.vorname}
                onChange={handleChange}
                placeholder="Vorname"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Nachname <span className="text-primary">*</span></label>
              <input
                type="text"
                name="nachname"
                value={form.nachname}
                onChange={handleChange}
                placeholder="Nachname"
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Wohnort & Telefon */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Wohnort <span className="text-primary">*</span></label>
              <input
                type="text"
                name="wohnort"
                value={form.wohnort}
                onChange={handleChange}
                placeholder="Wohnort"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Telefonnummer <span className="text-primary">*</span></label>
              <input
                type="tel"
                name="telefon"
                value={form.telefon}
                onChange={handleChange}
                placeholder="Telefonnummer"
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* E-Mail & Geburtsdatum */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>E-Mail <span className="text-primary">*</span></label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="E-Mail"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Geburtsdatum</label>
              <input
                type="date"
                name="geburtsdatum"
                value={form.geburtsdatum}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Stelle */}
          <div>
            <label className={labelClass}>Für welche Stelle bewirbst du dich? <span className="text-primary">*</span></label>
            <select
              name="stelle"
              value={form.stelle}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Bitte Auswahl treffen</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.title}>{job.title}</option>
              ))}
              <option value="Initiativbewerbung (m/w/d)">Initiativbewerbung (m/w/d)</option>
            </select>
          </div>

          {/* Berufserfahrung */}
          <div>
            <label className={labelClass}>Berufserfahrung im ausgewählten Bereich</label>
            <select
              name="berufserfahrung"
              value={form.berufserfahrung}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Bitte Auswahl treffen</option>
              <option value="Keine Erfahrung / Berufseinsteiger">Keine Erfahrung / Berufseinsteiger</option>
              <option value="Weniger als 1 Jahr">Weniger als 1 Jahr</option>
              <option value="1–3 Jahre">1–3 Jahre</option>
              <option value="3–5 Jahre">3–5 Jahre</option>
              <option value="5–10 Jahre">5–10 Jahre</option>
              <option value="Mehr als 10 Jahre">Mehr als 10 Jahre</option>
            </select>
          </div>

          {/* Sprachkenntnisse */}
          <div>
            <label className={labelClass}>Sprachkenntnisse</label>
            <input
              type="text"
              name="sprachkenntnisse"
              value={form.sprachkenntnisse}
              onChange={handleChange}
              placeholder="z.B. Deutsch (fließend), Englisch (Grundkenntnisse)"
              className={inputClass}
            />
          </div>

          {/* Führerschein & Anstellung */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Führerschein Klasse B vorhanden</label>
              <select
                name="fuehrerschein"
                value={form.fuehrerschein}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Bitte Auswahl treffen</option>
                <option value="Ja">Ja</option>
                <option value="Nein">Nein</option>
                <option value="In Vorbereitung">In Vorbereitung</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Aktuell in einer Anstellung?</label>
              <select
                name="inAnstellung"
                value={form.inAnstellung}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Bitte Auswahl treffen</option>
                <option value="Ja">Ja</option>
                <option value="Nein">Nein</option>
              </select>
            </div>
          </div>

          {/* Eintrittsdatum */}
          <div>
            <label className={labelClass}>Mögliches Eintrittsdatum</label>
            <input
              type="date"
              name="eintrittsdatum"
              value={form.eintrittsdatum}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Motivation */}
          <div>
            <label className={labelClass}>Wieso sollten wir uns für dich entscheiden?</label>
            <textarea
              name="motivation"
              value={form.motivation}
              onChange={handleChange}
              rows={5}
              placeholder="Bitte erzähl uns kurz, warum du perfekt in unser Autohaus passt."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* PDF Upload */}
          <div>
            <label className={labelClass}>
              Dokumente anhängen (PDF, max. {MAX_FILE_SIZE_MB} MB pro Datei, max. {MAX_FILES} Dateien)
            </label>
            <div
              className="border-2 border-dashed border-neutral-200 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
            >
              <Upload className="w-8 h-8 text-neutral-300 mx-auto mb-3" strokeWidth={1.5} />
              <p className="text-sm text-neutral-500">
                Klicken oder Dateien hierher ziehen
              </p>
              <p className="text-xs text-neutral-400 mt-1">Nur PDF-Dateien</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {fileError && (
              <p className="text-sm text-red-600 mt-2">{fileError}</p>
            )}

            {files.length > 0 && (
              <ul className="mt-3 space-y-2">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded px-4 py-2">
                    <div className="flex items-center gap-2 text-sm text-neutral-700 min-w-0">
                      <FileText className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={1.5} />
                      <span className="truncate">{f.name}</span>
                      <span className="text-xs text-neutral-400 flex-shrink-0">
                        ({(f.size / 1024 / 1024).toFixed(1)} MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="ml-3 text-neutral-400 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Error */}
          {submitError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-4 py-3">
              {submitError}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 font-medium hover:bg-primary-dark transition-colors rounded disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Wird gesendet...' : 'Bewerbung absenden'}
            {!isSubmitting && <ArrowRight className="w-4 h-4" strokeWidth={1.5} />}
          </button>

        </form>
      </div>
    </main>
  );
}