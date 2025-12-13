'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { API_URL } from '@/lib/constants';

interface CarouselImage {
  id: string;
  url: string;
  alt?: string;
  title?: string;
  subtitle?: string;
}

interface HeroCarouselProps {
  images: CarouselImage[];
}

export default function HeroCarousel({ images }: HeroCarouselProps) {
  if (images.length === 0) {
    return (
      <div className="w-full h-[400px] md:h-[600px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Keine Bilder verfügbar</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] md:h-[600px]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          enabled: true,
        }}
        loop={images.length > 1}
        // Touch-Einstellungen für Mobile
        touchEventsTarget="container"
        touchRatio={1}
        touchAngle={45}
        grabCursor={true}
        simulateTouch={true}
        allowTouchMove={true}
        preventClicks={false}
        preventClicksPropagation={false}
        className="w-full h-full"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="relative w-full h-full">
              <Image
                src={image.url.startsWith('http') ? image.url : `${API_URL}${image.url}`}
                alt={image.alt || 'Autohaus Bild'}
                fill
                className="object-cover"
                priority={images[0].id === image.id}
                unoptimized
              />
              {(image.title || image.subtitle) && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                  <div className="text-center text-white px-4">
                    {image.title && (
                      <h2 className="text-3xl md:text-5xl font-bold mb-2">
                        {image.title}
                      </h2>
                    )}
                    {image.subtitle && (
                      <p className="text-lg md:text-2xl">
                        {image.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CTA Button über dem Carousel - unten */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center px-4 pointer-events-none">
        <Link
          href="/fahrzeuge"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-primary-dark transition-colors shadow-lg pointer-events-auto"
        >
          Unsere Fahrzeuge entdecken
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}