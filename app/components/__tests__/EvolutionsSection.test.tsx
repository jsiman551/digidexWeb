import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EvolutionsSection } from '../EvolutionsSection';

describe('EvolutionsSection', () => {
  const evolutions = [
    { id: 1, digimon: 'Agumon', image: '/agumon.png', url: '/digimon/1' },
    { id: 2, digimon: 'Gabumon', image: '/gabumon.png', url: '/digimon/2' },
  ];

  it('no renderiza nada si evolutions está vacío', () => {
    const { container } = render(<EvolutionsSection title="Evolutions" evolutions={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renderiza el título correctamente', () => {
    render(<EvolutionsSection title="Evolutions" evolutions={evolutions} />);
    expect(screen.getByRole('heading', { name: 'Evolutions' })).toBeInTheDocument();
  });

  it('renderiza un link por cada evolución', () => {
    render(<EvolutionsSection title="Evolutions" evolutions={evolutions} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/digimon/1');
    expect(links[1]).toHaveAttribute('href', '/digimon/2');
  });

  it('renderiza las imágenes con el nombre correcto', () => {
    render(<EvolutionsSection title="Evolutions" evolutions={evolutions} />);
    const agumonImg = screen.getByRole('img', { name: /Agumon/i });
    const gabumonImg = screen.getByRole('img', { name: /Gabumon/i });

    expect(agumonImg.getAttribute('src')).toContain('agumon.png');
    expect(gabumonImg.getAttribute('src')).toContain('gabumon.png');
  });

  it('renderiza los nombres de los digimon', () => {
    render(<EvolutionsSection title="Evolutions" evolutions={evolutions} />);
    expect(screen.getByText('Agumon')).toBeInTheDocument();
    expect(screen.getByText('Gabumon')).toBeInTheDocument();
  });
});
