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

  // filtro por nombre
  const [name, setName] = useState("")

  const fetchDigimons = useCallback(
    async (opts?: FetchOpts) => {
      setLoading(true)
      try {
        const uiPage = opts?.page ?? page
        const apiPage = Math.max(0, uiPage - 1)

        const params = new URLSearchParams()
        params.set("page", String(apiPage))
        if (opts?.name) params.set("name", opts.name)

        const url = `https://digi-api.com/api/v1/digimon?${params.toString()}`
        const res = await fetch(url)
        const data = await res.json()

        let list: Digimon[] = []
        let uiTotalPages: number | null = null

        if (Array.isArray(data)) {
          // API devolvió array directo
          list = data
          uiTotalPages = null
        } else if (data?.content) {
          list = data.content

          const apiTotalIndex = data.pageable?.totalPages ?? data.totalPages ?? null

          if (typeof apiTotalIndex === "number") {
            uiTotalPages = apiTotalIndex + 1
          } else {
            uiTotalPages = null
          }
        } else {
          const fallbackRes = await fetch(`https://digi-api.com/api/v1/digimon?page=${apiPage}`)
          const fallbackData = await fallbackRes.json()
          list = fallbackData?.content ?? fallbackData ?? []

          const apiTotalIndex = fallbackData?.pageable?.totalPages ?? fallbackData?.totalPages ?? null
          uiTotalPages = typeof apiTotalIndex === "number" ? apiTotalIndex + 1 : null
        }

        setTotalPages(uiTotalPages)

        // Filtrado por nombre (coincidencias parciales)
        const filtered = list.filter((d: Digimon) =>
          opts?.name ? d.name.toLowerCase().includes(opts.name.toLowerCase()) : true
        )

        setDigimons(filtered)
      } catch (err) {
        console.error("Error fetching digimons", err)
        setDigimons([])
        setTotalPages(null)
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

  const goPrev = () => setPage((p) => Math.max(p - 1, 1))
  const goNext = () =>
    setPage((p) => {
      if (totalPages) return Math.min(p + 1, totalPages)
      return p + 1
    })

  const nextDisabled = totalPages ? page >= totalPages : false

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
      {!loading && digimons.length > 0 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={goPrev}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            disabled={page === 1}
          >
            Anterior
          </button>

          <span className="px-4 py-2 text-gray-300">
            Página {page}
            {totalPages ? ` de ${totalPages}` : ""}
          </span>

          <button
            onClick={goNext}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            disabled={nextDisabled}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}
