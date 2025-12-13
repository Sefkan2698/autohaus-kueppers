'use client';

import { motion } from 'framer-motion';
import {
  Wrench,
  Car,
  CheckCircle,
  Clock,
  Phone,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CONTENT } from '@/lib/constants';
import { useState } from 'react';

const serviceCategories = [
  {
    id: 'reparaturen',
    title: 'Reparaturen & Wartung',
    icon: Wrench,
    color: '#DC2626',
    services: [
      'KFZ-Reparaturen aller Art und Fabrikate',
      'Unfallinstandsetzung',
      'Scheibenreparatur und -erneuerung',
      'Digitale Achsvermessung',
      'DEKRA/Abgasuntersuchung im Haus',
      'Fahrzeugbewertung nach DAT',
    ],
  },
  {
    id: 'checks',
    title: 'Checks & Inspektionen',
    icon: CheckCircle,
    color: '#16A34A',
    services: [
      'Frühjahr- und Wintercheck',
      'Urlaubsdurchsicht',
      'Kostenloser Lichttest das ganze Jahr',
      'Reifen-Service',
      'Klimaanlagenservice',
    ],
  },
  {
    id: 'service',
    title: 'Service & Beratung',
    icon: Car,
    color: '#1E40AF',
    services: [
      'Kostenvoranschläge',
      'Finanzdienstleistung rund ums Auto',
      'Kundendienstersatzfahrzeug',
    ],
  },
];

export default function KundendienstPage() {
  const [openCategory, setOpenCategory] = useState<string | null>('reparaturen');

  const toggleCategory = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pb-16 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              <span className="text-primary">KUNDENDIENST</span> - WIR NEHMEN ES{' '}
              <span className="text-primary">PERSÖNLICH!</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Wir betreuen Sie <strong className="text-primary">individuell</strong>, denn Ihre
              persönlichen Anliegen sind unser Auftrag. Das Kundendienst-Team vom Autohaus Küppers
              steht Ihnen für alle Ihre großen und kleinen Fragen und Probleme zur Verfügung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Categories - Accordion */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {serviceCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-4 md:p-6 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <category.icon
                        className="w-5 h-5 md:w-6 md:h-6"
                        style={{ color: category.color }}
                      />
                    </div>
                    <h3 className="text-base md:text-xl font-bold text-gray-900 text-left">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex-shrink-0">
                    {openCategory === category.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                {/* Expandable Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: openCategory === category.id ? 'auto' : 0,
                    opacity: openCategory === category.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-4 md:p-6 pt-0">
                    <div className="space-y-3">
                      {category.services.map((service, serviceIndex) => (
                        <motion.div
                          key={serviceIndex}
                          className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100 hover:border-gray-200 transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: serviceIndex * 0.05 }}
                        >
                          <CheckCircle
                            className="w-4 h-4 mt-0.5 flex-shrink-0"
                            style={{ color: category.color }}
                          />
                          <span className="text-sm md:text-base text-gray-700 leading-relaxed">
                            {service}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-red-50 to-red-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
              Haben Sie <span className="text-primary">Fragen</span> zu unserem Service?
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
              Unser Kundendienst-Team ist{' '}
              <strong>Mo-Fr: {CONTENT.hours.service.weekdays}</strong> für Sie da.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
              
                <a href={`tel:${CONTENT.phone.replace(/\s/g, '')}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all"
              >
                <Phone className="w-4 h-4" />
                {CONTENT.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Hours */}
      <section className="py-8 md:py-12 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-gray-50">
              <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Verkauf</h4>
              <p className="text-xs text-gray-600">{CONTENT.hours.sales.weekdays}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-red-50">
              <Wrench className="w-6 h-6 mx-auto mb-2 text-primary" />
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Service</h4>
              <p className="text-xs text-gray-600">{CONTENT.hours.service.weekdays}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-50">
              <Car className="w-6 h-6 mx-auto mb-2 text-primary" />
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Teile</h4>
              <p className="text-xs text-gray-600">{CONTENT.hours.parts}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}