import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DigimonCard } from '../DigimonCard';

describe('DigimonCard', () => {
  const baseDigimon = { id: 1, name: 'Agumon' };

  it('renderiza el link con la ruta correcta', () => {
    render(<DigimonCard digimon={baseDigimon} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/digimon/1');
  });

  it('usa la imagen directa si está disponible', () => {
    render(<DigimonCard digimon={{ ...baseDigimon, image: '/agumon.png' }} />);
    const img = screen.getByRole('img', { name: /Agumon/i });
    expect(img.getAttribute('src')).toContain('agumon.png');
  });

  it('usa la primera imagen del array si no hay image', () => {
    render(<DigimonCard digimon={{ ...baseDigimon, images: [{ href: '/agumon-array.png' }] }} />);
    const img = screen.getByRole('img', { name: /Agumon/i });
    expect(img.getAttribute('src')).toContain('agumon-array.png');
  });

  it('usa el placeholder si no hay ninguna imagen', () => {
    render(<DigimonCard digimon={baseDigimon} />);
    const img = screen.getByRole('img', { name: /Agumon/i });
    expect(img.getAttribute('src')).toContain('placeholder.png');
  });

  it('muestra el nombre y el texto fijo', () => {
    render(<DigimonCard digimon={baseDigimon} />);
    expect(screen.getByRole('heading', { name: 'Agumon' })).toBeInTheDocument();
    expect(screen.getByText(/View Details/i)).toBeInTheDocument();
  });
});
