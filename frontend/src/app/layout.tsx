import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://www.auto-kueppers.de";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Autohaus Küppers – Citroën Händler Goch | Neuwagen, Service & DEKRA",
    template: "%s | Autohaus Küppers Goch",
  },
  description:
    "Ihr Citroën Vertragshändler in Goch am Niederrhein. Neuwagen, Vorführwagen, Gebrauchtwagen, Werkstatt, DEKRA Hauptuntersuchung & E-Auto Förderung bis 12.000 €. Seit über 65 Jahren.",
  keywords: [
    "Autohaus Goch",
    "Citroën Händler Goch",
    "Citroën Goch",
    "Neuwagen Goch",
    "Gebrauchtwagen Goch",
    "Vorführwagen Goch",
    "Werkstatt Goch",
    "DEKRA Goch",
    "E-Auto Goch",
    "Autohaus Niederrhein",
    "Autohaus Küppers",
  ],
  authors: [{ name: "Autohaus Küppers GmbH" }],
  creator: "Autohaus Küppers GmbH",
  publisher: "Autohaus Küppers GmbH",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: BASE_URL,
    siteName: "Autohaus Küppers GmbH",
    title: "Autohaus Küppers – Citroën Händler in Goch",
    description:
      "Neuwagen, Vorführwagen, Gebrauchtwagen & Werkstatt in Goch. Offizieller Citroën Vertragshändler seit über 65 Jahren. DEKRA Stützpunkt & E-Auto Förderung.",
    images: [
      {
        url: "/images/homebg/homebg.jpg",
        width: 1200,
        height: 630,
        alt: "Autohaus Küppers Goch – Citroën Vertragshändler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autohaus Küppers – Citroën Händler Goch",
    description:
      "Neuwagen, Gebrauchtwagen & Werkstatt in Goch. Offizieller Citroën Vertragshändler seit über 65 Jahren.",
    images: ["/images/homebg/homebg.jpg"],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Autohaus Küppers GmbH",
  description:
    "Offizieller Citroën Vertragshändler in Goch. Neuwagen, Gebrauchtwagen, Werkstatt, DEKRA Hauptuntersuchung und E-Auto Förderung.",
  url: BASE_URL,
  telephone: "+492823 3143",
  email: "info@auto-kueppers.de",
  logo: `${BASE_URL}/logo.svg`,
  image: `${BASE_URL}/images/homebg/homebg.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Asperdener Straße 2-4",
    addressLocality: "Goch",
    postalCode: "47574",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.6833,
    longitude: 6.1583,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "17:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    ratingCount: "80",
  },
  priceRange: "€€",
  brand: {
    "@type": "Brand",
    name: "Citroën",
  },
  sameAs: [
    "https://maps.google.com/?q=Autohaus+Küppers+Goch",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={inter.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}