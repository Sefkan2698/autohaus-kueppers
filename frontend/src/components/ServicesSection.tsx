import { Wrench, ClipboardCheck, Package } from 'lucide-react';

const services = [
  {
    icon: Wrench,
    title: 'Professionelle Werkstatt',
    description: 'Moderne Hebebühnen und Diagnosegeräte für alle Reparaturen',
    features: [
      'Meisterbetrieb seit über 30 Jahren',
      'Modernste Werkstattausstattung',
      'Schnelle Terminvergabe',
      'Faire und transparente Preise',
    ],
  },
  {
    icon: ClipboardCheck,
    title: 'Service & Inspektion',
    description: 'Regelmäßige Wartung hält Ihr Fahrzeug in Bestform',
    features: [
      'HU/AU direkt vor Ort',
      'Citroën Servicepläne',
      'Kostenlose Fahrzeugchecks',
      'Erinnerungsservice per E-Mail',
    ],
  },
  {
    icon: Package,
    title: 'Original Ersatzteile',
    description: 'Nur beste Qualität für maximale Sicherheit und Langlebigkeit',
    features: [
      'Citroën Originalteile',
      'Schnelle Bestellabwicklung',
      'Herstellergarantie inklusive',
      'Kompetente Beratung',
    ],
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Unsere Leistungen
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Von der Inspektion bis zur Reparatur – wir sind Ihr zuverlässiger Partner
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}