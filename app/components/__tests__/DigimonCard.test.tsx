import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DigimonCard } from '../DigimonCard';

describe('DigimonCard', () => {
  const baseDigimon = { id: 1, name: 'Agumon' };

  it('renders the link with the correct path', () => {
    render(<DigimonCard digimon={baseDigimon} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/digimon/1');
  });

  it('Use the direct image if available', () => {
    render(<DigimonCard digimon={{ ...baseDigimon, image: '/agumon.png' }} />);
    const img = screen.getByRole('img', { name: /Agumon/i });
    expect(img.getAttribute('src')).toContain('agumon.png');
  });

  it('Use the first image from the array if there is no image', () => {
    render(<DigimonCard digimon={{ ...baseDigimon, images: [{ href: '/agumon-array.png' }] }} />);
    const img = screen.getByRole('img', { name: /Agumon/i });
    expect(img.getAttribute('src')).toContain('agumon-array.png');
  });

  it('Use the placeholder if there is no image', () => {
    render(<DigimonCard digimon={baseDigimon} />);
    const img = screen.getByRole('img', { name: /Agumon/i });
    expect(img.getAttribute('src')).toContain('placeholder.png');
  });

  it('displays the name and the static text', () => {
    render(<DigimonCard digimon={baseDigimon} />);
    expect(screen.getByRole('heading', { name: 'Agumon' })).toBeInTheDocument();
    expect(screen.getByText(/View Details/i)).toBeInTheDocument();
  });
});
