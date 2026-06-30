import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import DigimonDetail from '../[id]/page';

vi.mock('@/lib/api', () => ({
  getDigimonById: vi.fn(),
  getAttributeById: vi.fn(),
  getLevelById: vi.fn(),
  getFieldById: vi.fn(),
  getTypeById: vi.fn(),
}));

import {
  getDigimonById,
  getAttributeById,
  getLevelById,
  getFieldById,
  getTypeById,
} from '@/lib/api';

describe('DigimonDetail (integration)', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renderiza nombre, imagen y descripciones', async () => {
    (getDigimonById as Mock).mockResolvedValue({
      id: 1,
      name: 'Agumon',
      xAntibody: true,
      images: [{ href: '/agumon.png' }],
      descriptions: [
        { language: 'en_us', description: 'A brave Digimon' },
        { language: 'jap', description: '勇敢なデジモン' },
      ],
      attributes: [{ id: 10, attribute: 'Vaccine' }],
      levels: [{ id: 20, level: 'Rookie' }],
      types: [{ id: 30, type: 'Reptile' }],
      fields: [{ id: 40, field: 'Dragon', image: '/dragon.png' }],
      skills: [{ id: 50, skill: 'Pepper Breath', description: 'Shoots fire' }],
      priorEvolutions: [],
      nextEvolutions: [],
    });

    (getAttributeById as Mock).mockResolvedValue({ description: 'Strong against Virus' });
    (getLevelById as Mock).mockResolvedValue({ description: 'Beginner stage' });
    (getTypeById as Mock).mockResolvedValue({ description: 'Reptile type Digimon' });
    (getFieldById as Mock).mockResolvedValue({ description: 'Dragon habitat' });

    render(await DigimonDetail({ params: Promise.resolve({ id: '1' }) }));

    expect(await screen.findByText(/Agumon/)).toBeInTheDocument();
    expect(screen.getByText(/X-Antibody/)).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /Agumon/i });
    expect(img.getAttribute('src')).toContain('agumon.png');

    expect(screen.getByText(/A brave Digimon/)).toBeInTheDocument();
    expect(screen.getByText(/View in Japanese/)).toBeInTheDocument();

    expect(screen.getByText(/Rookie/)).toBeInTheDocument();
    expect(screen.getByText(/Reptile/)).toBeInTheDocument();
    expect(screen.getByText(/Vaccine/)).toBeInTheDocument();

    expect(screen.getByText(/Dragon/)).toBeInTheDocument();

    expect(screen.getByText(/Pepper Breath/)).toBeInTheDocument();
    expect(screen.getByText(/Shoots fire/)).toBeInTheDocument();
  });

  it('muestra mensaje si no hay descripción en inglés', async () => {
    (getDigimonById as Mock).mockResolvedValue({
      id: 2,
      name: 'Gabumon',
      images: [],
      descriptions: [],
      attributes: [],
      levels: [],
      types: [],
      fields: [],
      skills: [],
      priorEvolutions: [],
      nextEvolutions: [],
    });

    render(await DigimonDetail({ params: Promise.resolve({ id: '2' }) }));

    expect(await screen.findByText(/No description available/)).toBeInTheDocument();
  });
});
