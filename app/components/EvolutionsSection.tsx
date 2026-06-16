import Image from "next/image"

interface Evolution {
  id: number
  digimon: string
  image: string
  url: string
}

export function EvolutionsSection({ 
  title, 
  evolutions 
}: { 
  title: string; 
  evolutions: Evolution[] 
}) {
  if (!evolutions || evolutions.length === 0) return null

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {evolutions.map((evo) => (
          <a
            key={evo.id}
            href={`/digimon/${evo.id}`}
            className="block text-center hover:scale-105 transition"
          >
            <Image
              src={evo.image}
              alt={evo.digimon}
              width={150}
              height={150}
              className="mx-auto mb-2"
            />
            <p className="text-lg">{evo.digimon}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
