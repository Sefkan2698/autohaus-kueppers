'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

type SubItem = { name: string; href: string };
type NavItem = {
  name: string;
  href: string;
  subItems?: SubItem[];
  highlight?: boolean;
};

const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'Fahrzeuge',
    href: '/fahrzeuge',
    subItems: [
      { name: 'Alle Fahrzeuge', href: '/fahrzeuge' },
      { name: 'Vorführwagen', href: '/fahrzeuge?typ=DEMO_CAR' },
      { name: 'Gebrauchtwagen', href: '/fahrzeuge?typ=USED_CAR' },
      { name: 'Jahreswagen', href: '/fahrzeuge?typ=YEAR_CAR' },
    ],
  },
  {
    name: 'Kundendienst',
    href: '/kundendienst',
    subItems: [
      { name: 'Kundendienst', href: '/kundendienst' },
      { name: 'DEKRA Stützpunkt', href: '/dekra-stuetzpunkt' },
    ],
  },
  { name: 'Gewerbebereich', href: '/gewerbe' },
  {
    name: 'Elektromobilität',
    href: '/aktionen/citroen-foerderung',
    highlight: true,
    subItems: [
      { name: 'Elektrofahrzeuge & Förderung', href: '/aktionen/citroen-foerderung' },
      { name: 'Sofort verfügbare E- & Hybridmodelle', href: '/fahrzeuge?kraftstoff=Elektro,Hybrid' },
      { name: 'Elektro FAQ', href: '/elektro-faq' },
    ],
  },
  {
    name: 'Karriere',
    href: '/jobs',
    subItems: [
      { name: 'Offene Stellenangebote', href: '/jobs' },
      { name: 'Online Bewerbungsformular', href: '/karriere/bewerbungsformular' },
    ],
  },
  { name: 'Kontakt', href: '/kontakt' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isTransparent = isHomePage && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img src="/logo.svg" alt="Autohaus Küppers" className="h-28 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6 lg:gap-8 md:ml-12 lg:ml-16" ref={navRef}>
            {navigation.map((item) =>
              item.subItems ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-sm transition-colors whitespace-nowrap ${
                      item.highlight
                        ? isTransparent
                          ? 'font-semibold text-primary bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded'
                          : 'font-semibold text-primary hover:text-primary-dark'
                        : isTransparent
                        ? 'font-medium text-white/80 hover:text-white'
                        : 'font-medium text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      }`}
                      strokeWidth={1.5}
                    />
                  </Link>

                  {openDropdown === item.name && (
                    <div className="absolute top-full left-0 pt-2 w-64 z-50">
                      <div className="bg-white border border-neutral-200 shadow-lg py-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-neutral-600 hover:text-primary hover:bg-neutral-50 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : item.highlight ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold transition-colors whitespace-nowrap ${
                    isTransparent
                      ? 'text-primary bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded'
                      : 'text-primary hover:text-primary-dark'
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isTransparent
                      ? 'text-white/80 hover:text-white'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}

            {/* Call Button Desktop */}
            <a
              href="tel:+49 2823 3143"
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-colors flex-shrink-0 ${
                isTransparent
                  ? 'bg-white text-neutral-900 hover:bg-white/90'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              <Phone size={16} strokeWidth={1.5} />
              <span>Anrufen</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} className={isTransparent ? 'text-white' : 'text-neutral-900'} />
            ) : (
              <Menu size={24} className={isTransparent ? 'text-white' : 'text-neutral-900'} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden py-6 space-y-4 ${
              isTransparent ? 'bg-black/80 backdrop-blur-sm -mx-6 px-6' : ''
            }`}
          >
            {navigation.map((item) =>
              item.subItems ? (
                <div key={item.name}>
                  <button
                    onClick={() =>
                      setMobileOpen(mobileOpen === item.name ? null : item.name)
                    }
                    className={`flex items-center gap-1 w-full font-medium transition-colors ${
                      item.highlight
                        ? 'text-primary font-semibold'
                        : isTransparent
                        ? 'text-white/80 hover:text-white'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileOpen === item.name ? 'rotate-180' : ''
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                  {mobileOpen === item.name && (
                    <div className="mt-2 ml-4 space-y-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block text-sm transition-colors ${
                            isTransparent
                              ? 'text-white/60 hover:text-white'
                              : 'text-neutral-500 hover:text-neutral-900'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block font-medium transition-colors ${
                    item.highlight
                      ? 'text-primary font-semibold'
                      : isTransparent
                      ? 'text-white/80 hover:text-white'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}

            {/* Call Button Mobile */}
            <a
              href="tel:+49 2823 3143"
              className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 font-medium w-full"
            >
              <Phone size={16} strokeWidth={1.5} />
              <span>Jetzt anrufen</span>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
