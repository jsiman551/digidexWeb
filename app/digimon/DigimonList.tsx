"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { DigimonCard } from "../components/DigimonCard"
import { FiltersBar } from "../components/FiltersBar"

interface Digimon {
  id: number
  name: string
  image: string
}

type FetchOpts = { page?: number; name?: string }

// simple debounce
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => void>(fn: T, wait = 300) {
  let t: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t)
    t = setTimeout(() => fn(...args), wait)
  }
}

export default function DigimonList() {
  const [page, setPage] = useState(1)
  const [digimons, setDigimons] = useState<Digimon[]>([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState<number | null>(null)

  // filtro por nombre (solo este)
  const [name, setName] = useState("")

  // fetch principal: carga la página y aplica filtrado por nombre en cliente (fallback)
  const fetchDigimons = useCallback(
    async (opts?: FetchOpts) => {
      setLoading(true)
      try {
        const p = opts?.page ?? page
        // Intentamos llamar al endpoint con query params (por compatibilidad),
        // pero el fallback siempre filtra en cliente sobre la página cargada.
        const params = new URLSearchParams()
        params.set("page", String(p))
        if (opts?.name) params.set("name", opts.name)

        const url = `https://digi-api.com/api/v1/digimon?${params.toString()}`
        const res = await fetch(url)
        const data = await res.json()

        // La API puede devolver { content, totalPages } o un array
        let list: Digimon[] = []
        if (Array.isArray(data)) {
          list = data
          setTotalPages(null)
        } else if (data?.content) {
          list = data.content
          setTotalPages(data.totalPages ?? null)
        } else {
          // Fallback robusto: cargar la página y filtrar en cliente
          const fallbackRes = await fetch(`https://digi-api.com/api/v1/digimon?page=${p}`)
          const fallbackData = await fallbackRes.json()
          list = fallbackData?.content ?? fallbackData ?? []
          setTotalPages(fallbackData?.totalPages ?? null)
        }

        // Filtrado por nombre (coincidencias parciales)
        const filtered = list.filter((d: Digimon) =>
          opts?.name ? d.name.toLowerCase().includes(opts.name.toLowerCase()) : true
        )

        setDigimons(filtered)
      } catch (err) {
        console.error("Error fetching digimons", err)
      } finally {
        setLoading(false)
      }
    },
    [page]
  )

  // debounce para evitar peticiones por cada tecla
  const debouncedFetch = useMemo(
    () => debounce((payload: FetchOpts) => fetchDigimons(payload), 350),
    [fetchDigimons]
  )

  // efecto: recargar cuando cambian page o name
  useEffect(() => {
    debouncedFetch({ page, name })
  }, [page, name, debouncedFetch])

  // handlers
  const handleFiltersChange = (payload: { name: string }) => {
    setName(payload.name)
    setPage(1)
  }

  const handleClear = () => {
    setName("")
    setPage(1)
  }

  return (
    <div>
      <FiltersBar name={name} onChange={handleFiltersChange} onClear={handleClear} />

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-56 bg-gray-800 animate-pulse rounded" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {digimons.length === 0 ? (
            <p className="text-center text-gray-400 col-span-full">No se encontraron Digimon.</p>
          ) : (
            digimons.map((d) => <DigimonCard key={d.id} digimon={d} />)
          )}
        </div>
      )}

      {/* paginación */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={page === 1}
        >
          Anterior
        </button>

        <span className="px-4 py-2 text-gray-300">Página {page}{totalPages ? ` de ${totalPages}` : ""}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
