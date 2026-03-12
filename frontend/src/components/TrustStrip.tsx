import Image from 'next/image';

const logos = [
  { src: '/images/icons/citroen.svg', alt: 'Citroën', className: 'h-14 w-auto' },
  { src: '/images/icons/kia.svg', alt: 'Kia', className: 'h-20 w-auto' },
  { src: '/images/icons/DEKRA.svg', alt: 'DEKRA', className: 'h-8 w-auto' },
    { src: '/images/icons/hu.svg', alt: 'Hauptunsersuchugsplakette', className: 'h-30 w-auto' },

];

export default function TrustStrip() {
  return (
    <div className="bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-12 overflow-x-auto py-6 scrollbar-none">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={56}
                className={`${logo.className} object-contain opacity-60 hover:opacity-100 transition-opacity`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}