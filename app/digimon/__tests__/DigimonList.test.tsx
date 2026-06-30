import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DigimonList from '../DigimonList';

describe('DigimonList (integration)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza resultados iniciales desde la API', async () => {
    const fakeData = {
      content: [
        { id: 1, name: 'Agumon', image: '/agumon.png' },
        { id: 2, name: 'Gabumon', image: '/gabumon.png' },
      ],
      pageable: { totalElements: 2, totalPages: 0 },
    };

    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => fakeData,
    } as Response);

    render(<DigimonList />);

    const agumon = await screen.findByText('Agumon');
    const gabumon = await screen.findByText('Gabumon');

    expect(agumon).toBeInTheDocument();
    expect(gabumon).toBeInTheDocument();
  });

  it('muestra skeletons mientras carga', () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ content: [] }),
    } as Response);

    render(<DigimonList />);
    const skeletons = screen.getAllByRole('generic');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('filtra resultados por nombre usando FiltersBar', async () => {
    const fakeData = {
      content: [
        { id: 1, name: 'Agumon', image: '/agumon.png' },
        { id: 2, name: 'Gabumon', image: '/gabumon.png' },
      ],
      pageable: { totalElements: 2, totalPages: 0 },
    };

    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => fakeData,
    } as Response);

    render(<DigimonList />);

    const input = screen.getByPlaceholderText(/Digimon name.../i);
    await userEvent.type(input, 'Gabu');

    const gabumon = await screen.findByText('Gabumon');
    expect(gabumon).toBeInTheDocument();
    expect(screen.queryByText('Agumon')).not.toBeInTheDocument();
  });

  it('muestra mensaje de no resultados', async () => {
    const fakeData = { content: [] };

    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => fakeData,
    } as Response);

    render(<DigimonList />);

    const msg = await screen.findByText(/No digimons found/i);
    expect(msg).toBeInTheDocument();
  });
});
