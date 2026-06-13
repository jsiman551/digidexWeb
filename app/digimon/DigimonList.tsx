"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Digimon {
  id: number
  name: string
  image: string
  level: string
  type: string
}

export default function DigimonList() {
  const [page, setPage] = useState(1)
  const [digimon, setDigimon] = useState<Digimon[]>([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://digi-api.com/api/v1/digimon?page=${page}`)
      const data = await res.json()
      setDigimon(data.content)
    }
    fetchData()
  }, [page])

  return (
    <div>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {digimon.map((d) => (
          <li key={d.id} className="bg-white shadow rounded p-4">
            <Image
              src={d.image}
              alt={d.name}
              width={150}
              height={150}
              className="mx-auto"
            />
            <h2 className="text-lg font-semibold text-center mt-2">{d.name}</h2>
            <p className="text-sm text-gray-600 text-center">
              Nivel: {d.level} | Tipo: {d.type}
            </p>
          </li>
        ))}
      </ul>

      {/* 🔹 Controles de paginación */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={page === 1}
        >
          Anterior
        </button>
        <span className="px-4 py-2">Página {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
