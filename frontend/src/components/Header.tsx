'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Fahrzeuge', href: '/fahrzeuge' },
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
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="Autohaus Küppers"
              className={`h-16 w-auto transition-all duration-300 ${isTransparent ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
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
            ))}

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
            {navigation.map((item) => (
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
            ))}

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