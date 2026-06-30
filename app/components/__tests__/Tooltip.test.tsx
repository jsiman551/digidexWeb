import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Tooltip } from '../Tooltip';

describe('Tooltip', () => {
  it('Always render the children', () => {
    render(<Tooltip label="Info">Hover me</Tooltip>);
    expect(screen.getByText(/Hover me/i)).toBeInTheDocument();
  });

  it('shows the tooltip on hover', async () => {
    const user = userEvent.setup();
    render(<Tooltip label="Info">Hover me</Tooltip>);
    const trigger = screen.getByText(/Hover me/i);

    expect(screen.queryByText(/Info/i)).not.toBeInTheDocument();

    await user.hover(trigger);
    expect(screen.getByText(/Info/i)).toBeInTheDocument();
  });

  it('hides the tooltip when the mouse leaves the trigger', async () => {
    const user = userEvent.setup();
    render(<Tooltip label="Info">Hover me</Tooltip>);
    const trigger = screen.getByText(/Hover me/i);

    await user.hover(trigger);
    expect(screen.getByText(/Info/i)).toBeInTheDocument();

    await user.unhover(trigger);
    expect(screen.queryByText(/Info/i)).not.toBeInTheDocument();
  });
});
