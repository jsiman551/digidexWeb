"use client"

import { useState, useEffect } from "react"
import { DigimonCard } from "../components/DigimonCard"

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {digimon.map((d) => (
          <DigimonCard
            key={d.id}
            id={d.id}
            name={d.name}
            image={d.image}
            level={d.level}
            type={d.type}
          />
        ))}
      </div>

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
