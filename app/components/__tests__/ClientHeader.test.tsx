import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ClientHeader from '../ClientHeader';

describe('ClientHeader', () => {
  it('renderiza el header con la clase de gradiente', () => {
    const { container } = render(<ClientHeader />);
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('bg-gradient-to-r');
  });

  it('renderiza el link a /digimon con aria-label y textos correctos', () => {
    render(<ClientHeader />);
    const link = screen.getByRole('link', { name: /Go to the main Digidex page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/digimon');

    // Heading oculto
    const heading = screen.getByRole('heading', { name: 'Digidex', hidden: true });
    expect(heading).toBeInTheDocument();

    // Texto visible en el span
    const visibleText = screen.getByText('Digidex', { selector: 'span' });
    expect(visibleText).toBeInTheDocument();
  });
});
