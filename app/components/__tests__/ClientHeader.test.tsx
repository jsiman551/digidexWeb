import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ClientHeader from '../ClientHeader';

describe('ClientHeader', () => {
  it('Renders the header with the gradient class', () => {
    const { container } = render(<ClientHeader />);
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('bg-gradient-to-r');
  });

  it('Renders the link to /digimon with the correct aria-label and text', () => {
    render(<ClientHeader />);
    const link = screen.getByRole('link', { name: /Go to the main Digidex page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/digimon');

    const heading = screen.getByRole('heading', { name: 'Digidex', hidden: true });
    expect(heading).toBeInTheDocument();

    const visibleText = screen.getByText('Digidex', { selector: 'span' });
    expect(visibleText).toBeInTheDocument();
  });
});
