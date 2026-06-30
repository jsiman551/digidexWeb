import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Tooltip } from '../Tooltip';

describe('Tooltip', () => {
  it('renderiza los children siempre', () => {
    render(<Tooltip label="Info">Hover me</Tooltip>);
    expect(screen.getByText(/Hover me/i)).toBeInTheDocument();
  });

  it('muestra el tooltip al hacer hover', async () => {
    const user = userEvent.setup();
    render(<Tooltip label="Info">Hover me</Tooltip>);
    const trigger = screen.getByText(/Hover me/i);

    // Antes del hover, el tooltip no está
    expect(screen.queryByText(/Info/i)).not.toBeInTheDocument();

    // Hover
    await user.hover(trigger);
    expect(screen.getByText(/Info/i)).toBeInTheDocument();
  });

  it('oculta el tooltip al salir del hover', async () => {
    const user = userEvent.setup();
    render(<Tooltip label="Info">Hover me</Tooltip>);
    const trigger = screen.getByText(/Hover me/i);

    await user.hover(trigger);
    expect(screen.getByText(/Info/i)).toBeInTheDocument();

    await user.unhover(trigger);
    expect(screen.queryByText(/Info/i)).not.toBeInTheDocument();
  });
});
