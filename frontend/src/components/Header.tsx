'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const fahrzeugeSubItems = [
  { name: 'Alle Fahrzeuge', href: '/fahrzeuge' },
  { name: 'Vorführwagen', href: '/fahrzeuge?typ=DEMO_CAR' },
  { name: 'Gebrauchtwagen', href: '/fahrzeuge?typ=USED_CAR' },
  { name: 'Jahreswagen', href: '/fahrzeuge?typ=YEAR_CAR' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [fahrzeugeDropdownOpen, setFahrzeugeDropdownOpen] = useState(false);
  const [mobileFahrzeugeOpen, setMobileFahrzeugeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setFahrzeugeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Fahrzeuge', href: '/fahrzeuge', hasDropdown: true },
    { name: 'Kundendienst', href: '/kundendienst' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Kontakt', href: '/kontakt' },
  ];

  // Auf anderen Seiten immer "scrolled" Style (weiß)
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
          <Link href="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="Autohaus Küppers"
              className={`h-20 w-auto transition-all duration-300 ${isTransparent ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={() => setFahrzeugeDropdownOpen(true)}
                  onMouseLeave={() => setFahrzeugeDropdownOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                      isTransparent
                        ? 'text-white/80 hover:text-white'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        fahrzeugeDropdownOpen ? 'rotate-180' : ''
                      }`}
                      strokeWidth={1.5}
                    />
                  </Link>

                  {/* Dropdown */}
                  {fahrzeugeDropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 w-48">
                      <div className="bg-white border border-neutral-200 shadow-lg py-2">
                        {fahrzeugeSubItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-neutral-600 hover:text-primary hover:bg-neutral-50 transition-colors"
                            onClick={() => setFahrzeugeDropdownOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-colors ${
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
          <div className={`md:hidden py-6 space-y-4 ${isTransparent ? 'bg-black/80 backdrop-blur-sm -mx-6 px-6' : ''}`}>
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div key={item.name}>
                  <button
                    onClick={() => setMobileFahrzeugeOpen(!mobileFahrzeugeOpen)}
                    className={`flex items-center gap-1 w-full font-medium transition-colors ${
                      isTransparent
                        ? 'text-white/80 hover:text-white'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileFahrzeugeOpen ? 'rotate-180' : ''
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                  {mobileFahrzeugeOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      {fahrzeugeSubItems.map((subItem) => (
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
                    isTransparent
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
