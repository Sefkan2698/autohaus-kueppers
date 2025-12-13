'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Shield, Award, Star, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const trustElements = [
  {
    icon: Shield,
    title: 'Autorisierter Citroën Partner',
    description: 'Offizieller Händler und Servicepartner',
    highlight: 'Seit 1993',
  },
  {
    icon: Award,
    title: 'Meisterbetrieb',
    description: 'Qualifizierte Handwerksleistung',
    highlight: '30+ Jahre',
  },
  {
    icon: Star,
    title: 'Google Bewertungen',
    description: 'Echte Kundenmeinungen',
    highlight: '4.8★',
  },
  {
    icon: Users,
    title: 'Familienbetrieb',
    description: 'Persönliche Betreuung',
    highlight: '2. Generation',
  },
];

const reviews = [
  '/images/reviews/review1.png',
  '/images/reviews/review2.png',
  '/images/reviews/review3.png',
  '/images/reviews/review4.png',
  '/images/reviews/review5.png',
  '/images/reviews/review6.png',
  '/images/reviews/review7.png',
  '/images/reviews/review8.png',
];

export default function TrustSection() {
  const [currentReview, setCurrentReview] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToReview = (index: number) => {
    setCurrentReview(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full"></div>
        <div className="absolute bottom-20 right-16 w-24 h-24 bg-blue-800 rounded-full"></div>
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Warum uns <span className="text-primary">Kunden vertrauen</span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Über <strong className="text-primary">30 Jahre Erfahrung</strong> und
            <strong className="text-primary"> hunderte zufriedene Kunden</strong> sprechen für sich
          </p>
        </motion.div>

        {/* Trust Elements Grid - Mobile First */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16">
          {trustElements.map((element, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative mx-auto mb-3 md:mb-6 w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: '2px solid #e2e8f0',
                }}
                whileHover={{ scale: 1.05 }}
              >
                <element.icon className="w-6 h-6 md:w-10 md:h-10 text-primary" />

                {/* Highlight Badge */}
                <motion.div
                  className="absolute -top-1 -right-1 md:-top-2 md:-right-2 text-[10px] md:text-xs font-bold text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-full bg-primary"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {element.highlight}
                </motion.div>
              </motion.div>

              <h3 className="text-xs md:text-lg font-bold text-gray-900 mb-1 md:mb-2">
                {element.title}
              </h3>
              <p className="text-[10px] md:text-sm text-gray-600 leading-relaxed">
                {element.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Carousel */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
              Was unsere <span className="text-primary">Kunden sagen</span>
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Echte Bewertungen von echten Kunden auf Google
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Main Review Display */}
            <AnimatePresence mode="wait">
<motion.div
  key={currentReview}
  initial={{ opacity: 0, x: 100, scale: 0.95 }}
  animate={{ opacity: 1, x: 0, scale: 1 }}
  exit={{ opacity: 0, x: -100, scale: 0.95 }}
  transition={{ duration: 0.6, ease: 'easeInOut' }}
  className="flex items-center justify-center"
>
  <div className="relative w-full max-w-2xl">
    <Image
      src={reviews[currentReview]}
      alt={`Google Bewertung ${currentReview + 1}`}
      width={800}
      height={600}
      className="w-full h-auto rounded-xl"
      quality={100}
      priority={currentReview === 0}
      unoptimized
    />
  </div>
</motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevReview}
              className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all border-2 border-primary z-20"
              aria-label="Vorherige Bewertung"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </button>

            <button
              onClick={nextReview}
              className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all border-2 border-primary z-20"
              aria-label="Nächste Bewertung"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </button>

            {/* Auto-play indicator - Hidden on mobile */}
            {isAutoPlaying && (
              <motion.div
                className="hidden md:flex absolute top-4 right-4 items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-600 shadow-md z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                Auto-Wiedergabe
              </motion.div>
            )}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center items-center mt-6 md:mt-8 gap-2 md:gap-3">
            {reviews.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToReview(index)}
                className={`transition-all duration-300 rounded-full shadow-sm ${
                  currentReview === index ? 'w-8 md:w-10 h-2.5 md:h-3' : 'w-2.5 md:w-3 h-2.5 md:h-3'
                }`}
                style={{
                  backgroundColor: currentReview === index ? '#CB0F13' : '#D1D5DB',
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
                aria-label={`Zu Bewertung ${index + 1} gehen`}
              />
            ))}
          </div>

          {/* Review Counter */}
          <div className="text-center mt-3 md:mt-4">
            <p className="text-xs md:text-sm text-gray-500 font-medium">
              Bewertung {currentReview + 1} von {reviews.length}
            </p>
          </div>
        </motion.div>
        {/* Customer Promise */}
<motion.div
  className="mt-12 md:mt-16"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.6 }}
  viewport={{ once: true }}
>
  <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 md:p-8 border-2 border-red-200">
    <div className="max-w-2xl mx-auto text-center">
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
        Unser <span className="text-primary">Qualitätsversprechen</span>
      </h3>
      <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-6">
        "Bei uns erhalten Sie nicht nur ein Fahrzeug – Sie werden Teil der Familie.
        Persönlicher Service, faire Preise und langfristige Betreuung sind unser Anspruch
        an uns selbst, seit über 30 Jahren."
      </p>
      <div className="flex items-center justify-center gap-2 md:gap-3">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white shadow-lg flex-shrink-0">
          <Image
            src="/images/worker/gf.jpg"
            alt="Hans-Theo Küppers"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-left">
          <p className="text-sm md:text-base font-semibold text-gray-900">Hans-Theo Küppers</p>
          <p className="text-xs md:text-sm text-gray-600">Geschäftsführer</p>
        </div>
      </div>
    </div>
  </div>
</motion.div>
      </div>
    </section>
  );
}