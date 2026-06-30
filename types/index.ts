export type DigimonSkill = {
  id: number;
  skill: string;
  translation: string;
  description: string;
}

export type DigimonDescription = {
  origin: string;
  language: string;
  description: string;
}

export type DigimonField = {
  id: number;
  field: string;
  image: string;
}

export type FetchOpts = { 
    page?: number; 
    name?: string 
};

export type Digimon = {
  id: number
  name: string
  image: string
  level: string
  attribute: string
  type: string
  images?: { href: string }[];
}

export type Evolution = {
  id: number;
  digimon: string;
  image: string;
  url: string;
}

export type FiltersBarProps = {
  name: string;
  onChange: (payload: { name: string }) => void;
  onClear: () => void;
}
