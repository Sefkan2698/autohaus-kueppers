import type { Metadata } from 'next';
import { API_URL } from '@/lib/constants';

interface Props {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await fetch(`${API_URL}/api/vehicles/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('not found');
    const v = await res.json();

    const typeLabel =
      v.type === 'DEMO_CAR' ? 'Vorführwagen' :
      v.type === 'YEAR_CAR' ? 'Jahreswagen' :
      'Gebrauchtwagen';

    const title = `${v.title} – ${typeLabel} bei Autohaus Küppers Goch`;
    const description = `${v.title} (${v.yearBuilt}, ${v.mileage.toLocaleString('de-DE')} km, ${v.fuelType}) für ${v.price.toLocaleString('de-DE')} €. ${typeLabel} direkt bei Autohaus Küppers in Goch.`;
    const imageUrl = v.images?.[0]?.url
      ? v.images[0].url.startsWith('http')
        ? v.images[0].url
        : `${API_URL}${v.images[0].url}`
      : undefined;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        ...(imageUrl ? { images: [{ url: imageUrl, alt: v.title }] } : {}),
      },
    };
  } catch {
    return {
      title: 'Fahrzeugdetails – Autohaus Küppers Goch',
      description: 'Fahrzeugdetails bei Autohaus Küppers in Goch.',
    };
  }
}

export default function FahrzeugDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}