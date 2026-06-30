import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EvolutionsSection } from '../EvolutionsSection';

describe('EvolutionsSection', () => {
  const evolutions = [
    { id: 1, digimon: 'Agumon', image: '/agumon.png', url: '/digimon/1' },
    { id: 2, digimon: 'Gabumon', image: '/gabumon.png', url: '/digimon/2' },
  ];

  it('It doesnt render anything if evolutions is empty.', () => {
    const { container } = render(<EvolutionsSection title="Evolutions" evolutions={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the title correctly', () => {
    render(<EvolutionsSection title="Evolutions" evolutions={evolutions} />);
    expect(screen.getByRole('heading', { name: 'Evolutions' })).toBeInTheDocument();
  });

  it('renders a link for each evolution', () => {
    render(<EvolutionsSection title="Evolutions" evolutions={evolutions} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/digimon/1');
    expect(links[1]).toHaveAttribute('href', '/digimon/2');
  });

  it('renders the images with the correct names', () => {
    render(<EvolutionsSection title="Evolutions" evolutions={evolutions} />);
    const agumonImg = screen.getByRole('img', { name: /Agumon/i });
    const gabumonImg = screen.getByRole('img', { name: /Gabumon/i });

    expect(agumonImg.getAttribute('src')).toContain('agumon.png');
    expect(gabumonImg.getAttribute('src')).toContain('gabumon.png');
  });

  it('renders the names of the digimon', () => {
    render(<EvolutionsSection title="Evolutions" evolutions={evolutions} />);
    expect(screen.getByText('Agumon')).toBeInTheDocument();
    expect(screen.getByText('Gabumon')).toBeInTheDocument();
  });
});
