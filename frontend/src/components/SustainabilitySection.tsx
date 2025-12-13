'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Leaf, Award, TreePine, Zap } from 'lucide-react';

const sustainabilityStats = [
  {
    icon: TreePine,
    number: '3.000+',
    unit: 'kg CO₂',
    label: 'eingespart 2021',
    description: 'Dank CleanAdvantage™',
  },
  {
    icon: Leaf,
    number: '30+',
    unit: 'Jahre',
    label: 'Umweltbewusstsein',
    description: 'Nachhaltiges Handeln',
  },
  {
    icon: Zap,
    number: '100%',
    unit: '',
    label: 'E-Mobilität',
    description: 'Citroën Elektrofahrzeuge',
  },
  {
    icon: Award,
    number: '2021',
    unit: '',
    label: 'Zertifiziert',
    description: 'FLEETCOR Partner',
  },
];

export default function SustainabilitySection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-green-500"></div>
        <div className="absolute bottom-20 right-16 w-24 h-24 rounded-full bg-green-600"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-green-400"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-4">
            <span className="text-green-600">Nachhaltigkeit</span> wird bei uns{' '}
            <span className="text-primary">GROSS</span> geschrieben!
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Über <strong className="text-primary">3.000 kg CO₂</strong> konnten wir zusammen mit{' '}
            <strong className="text-green-600">FLEETCOR</strong> und dem{' '}
            <strong className="text-green-600">CleanAdvantage™ Program</strong> im Jahr 2021 einsparen.
          </p>
        </motion.div>

        {/* Stats Grid - Mobile First */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16">
          {sustainabilityStats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 bg-green-100">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
              <div className="text-xl md:text-3xl font-bold mb-1 md:mb-2 text-green-600">
                {stat.number}
                <span className="text-sm md:text-lg ml-1">{stat.unit}</span>
              </div>
              <div className="text-xs md:text-base font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-[10px] md:text-sm text-gray-600">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                Unser Beitrag zur <span className="text-green-600">grünen Zukunft</span>
              </h3>

              <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-green-600">Nachhaltigkeit</strong> und{' '}
                  <strong className="text-primary">Umweltschutz</strong> sind uns sehr wichtige
                  Anliegen.
                </p>

                <p>
                  Die Autoindustrie arbeitet durch die Weiterentwicklung der{' '}
                  <strong className="text-primary">E-Mobilität</strong> und anderen{' '}
                  <strong className="text-green-600">nachhaltigen Antriebsmethoden</strong> an einem
                  grünen Weg in die Zukunft.
                </p>

                <p>
                  <strong className="text-primary">Wir beteiligen uns daran!</strong> Zusammen mit
                  unserem Engagement und besonders dank Ihrer Unterstützung leisten wir unseren
                  Beitrag in eine <strong className="text-green-600">GRÜNE Zukunft</strong>.
                </p>
              </div>

              {/* Action Items */}
              <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                  <span className="text-xs md:text-sm text-gray-700">
                    <strong className="text-primary">Citroën Elektrofahrzeuge</strong> im Angebot
                  </span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                  <span className="text-xs md:text-sm text-gray-700">
                    <strong className="text-primary">CO₂-neutrale Serviceprozesse</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                  <span className="text-xs md:text-sm text-gray-700">
                    <strong className="text-primary">Recycling</strong> von Altteilen
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Certificate */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl">
              <div className="text-center mb-3 md:mb-4">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">
                  <span className="text-green-600">Green Certificate</span> 2021
                </h4>
                <p className="text-xs md:text-sm text-gray-600">
                  FLEETCOR CleanAdvantage™ Program
                </p>
              </div>

              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/images/sustainability/greencertif.jpg"
                  alt="Green Certificate - FLEETCOR CleanAdvantage Program 2021"
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain"
                  quality={100}
                />
              </div>

              {/* Certificate Badge */}
              <motion.div
                className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                2021
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}