'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Bell,
  Car,
  Briefcase,
  Image as ImageIcon,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Lädt...</div>
      </div>
    );
  }

  const adminSections = [
    {
      title: 'Infobanner',
      description: 'Banner auf der Startseite verwalten',
      icon: Bell,
      href: '/admin/dashboard/infobanner',
      color: 'bg-blue-500',
    },
    {
      title: 'Fahrzeuge',
      description: 'Vorführwagen, Gebrauchtwagen & Jahreswagen',
      icon: Car,
      href: '/admin/dashboard/fahrzeuge',
      color: 'bg-red-500',
    },
    {
      title: 'Jobs',
      description: 'Stellenangebote verwalten',
      icon: Briefcase,
      href: '/admin/dashboard/jobs',
      color: 'bg-green-500',
    },
    {
      title: 'Carousel',
      description: 'Bilder der Hero-Section verwalten',
      icon: ImageIcon,
      href: '/admin/dashboard/carousel',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Autohaus Küppers</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Abmelden</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Verwaltungsbereiche</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {adminSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={section.href}
                  className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200 group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-sm text-gray-600">{section.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Info */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-2">Willkommen im Admin-Bereich</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Hier können Sie alle Inhalte Ihrer Website verwalten. Wählen Sie einen Bereich aus, um
            zu beginnen. Alle Änderungen werden sofort auf der öffentlichen Website sichtbar.
          </p>
        </motion.div>
      </main>
    </div>
  );
}