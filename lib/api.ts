// Definimos el tipo de Digimon según la API
export interface Digimon {
  id: number
  name: string
  image: string
  level: string
  attribute: string
  type: string
}

// Función para obtener todos los Digimon (paginados)
export async function getDigimon(page: number = 1): Promise<Digimon[]> {
  const res = await fetch(`https://digi-api.com/api/v1/digimon?page=${page}`, {
    next: { revalidate: 60 }, // revalidación cada 60s
  })

  if (!res.ok) {
    throw new Error("Error al obtener Digimon")
  }

  const data = await res.json()
  return data.content // la API devuelve { content: [...] }
}

export async function getDigimonById(id: number) {
  const res = await fetch(`https://digi-api.com/api/v1/digimon/${id}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    throw new Error(`No se pudo obtener el Digimon con id ${id}`)
  }
  return res.json()
}
