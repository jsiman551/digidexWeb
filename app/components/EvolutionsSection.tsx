import Image from 'next/image';
import Link from 'next/link';

interface Evolution {
  id: number;
  digimon: string;
  image: string;
  url: string;
}

export function EvolutionsSection({
  title,
  evolutions,
}: {
  title: string;
  evolutions: Evolution[];
}) {
  if (!evolutions || evolutions.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {evolutions.map((evo) => (
          <Link
            key={evo.id}
            href={`/digimon/${evo.id}`}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4 text-center 
                       hover:shadow-xl hover:scale-105 transition"
          >
            <Image
              src={evo.image}
              alt={evo.digimon}
              width={150}
              height={150}
              className="mx-auto mb-2 rounded"
            />
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{evo.digimon}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
