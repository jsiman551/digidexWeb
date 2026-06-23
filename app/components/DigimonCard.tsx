import Image from 'next/image';
import Link from 'next/link';

interface Digimon {
  id: number;
  name: string;
  image?: string;
  images?: { href: string }[];
}

export function DigimonCard({ digimon }: { digimon: Digimon }) {
  // El listado devuelve `image` plano, pero dejamos fallback por seguridad
  const image = digimon.image ?? digimon.images?.[0]?.href ?? '/placeholder.png';

  return (
    <Link
      href={`/digimon/${digimon.id}`}
      className="block bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg p-4 
                 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out text-center"
    >
      <Image
        src={image}
        alt={digimon.name || 'Imagen de Digimon'}
        width={150}
        height={150}
        className="mx-auto mb-2 rounded"
      />
      <h2 className="text-lg font-semibold text-yellow-300">{digimon.name}</h2>
      <p className="text-sm text-gray-400 mt-1">Ver detalles</p>
    </Link>
  );
}
