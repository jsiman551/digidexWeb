export interface Digimon {
  id: number
  name: string
  image: string
  level: string
  attribute: string
  type: string
}

export async function getDigimon(page: number = 1): Promise<Digimon[]> {
  const res = await fetch(`https://digi-api.com/api/v1/digimon?page=${page}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error("Error al obtener Digimon")
  }

  const data = await res.json()
  return data.content
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

export async function getAttributeById(id: number) {
  const res = await fetch(`https://digi-api.com/api/v1/attribute/${id}`)
  if (!res.ok) throw new Error("Error fetching attribute")
  return res.json()
}

export async function getLevelById(id: number) {
  const res = await fetch(`https://digi-api.com/api/v1/level/${id}`)
  if (!res.ok) throw new Error("Error fetching level")
  return res.json()
}

export async function getFieldById(id: number) {
  const res = await fetch(`https://digi-api.com/api/v1/field/${id}`)
  if (!res.ok) throw new Error("Error fetching field")
  return res.json()
}

export async function getTypeById(id: number) {
  const res = await fetch(`https://digi-api.com/api/v1/type/${id}`)
  if (!res.ok) throw new Error("Error fetching type")
  return res.json()
}
