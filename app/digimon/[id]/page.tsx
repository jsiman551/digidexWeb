import { getDigimonById } from "@/lib/api"
import Image from "next/image"

interface DigimonSkill {
  id: number
  skill: string
  translation: string
  description: string
}

export default async function DigimonDetail({ params }: { params: Promise<{ id: string }> }) {
  // 👇 En Next.js 16 los params pueden ser una Promise
  const { id } = await params

  const digimon = await getDigimonById(Number(id))

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">{digimon.name}</h1>

      {/* Imagen */}
      {digimon.images?.[0] && (
        <Image
          src={digimon.images[0].href}
          alt={digimon.name}
          width={200}
          height={200}
          className="mx-auto mb-6"
        />
      )}

      {/* Nivel, Tipo, Atributo */}
      <p className="text-lg">Nivel: {digimon.levels?.[0]?.level ?? "Desconocido"}</p>
      <p className="text-lg">Tipo: {digimon.types?.[0]?.type ?? "Desconocido"}</p>
      <p className="text-lg">Atributo: {digimon.attributes?.[0]?.attribute ?? "Desconocido"}</p>

      {/* Descripción */}
      <p className="text-lg mt-4">
        {digimon.descriptions?.[0]?.description || "Sin descripción disponible"}
      </p>

      {/* Skills */}
      <h2 className="text-2xl font-bold mt-6">Skills</h2>
      <ul className="list-disc pl-6">
        {digimon.skills?.map((s: DigimonSkill) => (
          <li key={s.id}>
            <strong>{s.skill}</strong>: {s.description}
          </li>
        ))}
      </ul>
    </main>
  )
}
