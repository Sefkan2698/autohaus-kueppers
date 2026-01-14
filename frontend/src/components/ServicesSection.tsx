import { Wrench, ClipboardCheck, Package } from 'lucide-react';

const services = [
  {
    icon: Wrench,
    title: 'Werkstatt',
    description: 'Moderne Hebebühnen und Diagnosegeräte für alle Reparaturen. Meisterbetrieb mit über 30 Jahren Erfahrung.',
  },
  {
    icon: ClipboardCheck,
    title: 'Service & Inspektion',
    description: 'HU/AU direkt vor Ort. Regelmäßige Wartung nach Citroën Serviceplänen hält Ihr Fahrzeug in Bestform.',
  },
  {
    icon: Package,
    title: 'Originalteile',
    description: 'Citroën Originalteile mit Herstellergarantie. Schnelle Bestellabwicklung und kompetente Beratung.',
  },
];

export default function ServicesSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Diagonaler Hintergrund */}
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-0 bg-neutral-100"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 85%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <p className="text-neutral-500 text-sm tracking-[0.2em] uppercase mb-4">
            Leistungen
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 max-w-lg">
            <span className="text-primary">Alles aus einer Hand</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="group">
                {/* Icon */}
                <div className="mb-6">
                  <Icon
                    className="w-6 h-6 text-neutral-400 group-hover:text-primary transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-primary mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}