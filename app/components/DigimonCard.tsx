import Image from "next/image"
import Link from "next/link"

interface DigimonCardProps {
  id: number
  name: string
  image: string
  level: string
  type: string
}

export function DigimonCard({ id, name, image, level, type }: DigimonCardProps) {
  return (
    <Link
      href={`/digimon/${id}`}
      className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg p-4 
                 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out block text-center"
    >
      <Image
        src={image}
        alt={name}
        width={150}
        height={150}
        className="mx-auto mb-2 rounded"
      />
      <h2 className="text-lg font-semibold text-yellow-300">{name}</h2>
      <p className="text-sm text-gray-400 mt-1">
        Nivel: {level} | Tipo: {type}
      </p>
    </Link>
  )
}
