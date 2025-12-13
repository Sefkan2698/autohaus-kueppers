'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Prüfe, ob wir im Admin-Bereich sind
  const isAdminRoute = pathname?.startsWith('/admin');

  // Im Admin-Bereich: KEIN Header/Footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Auf normalen Seiten: MIT Header/Footer
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
