import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FiltersBar } from '../FiltersBar';

describe('FiltersBar', () => {
  it('Renders the input with the initial value', () => {
    render(<FiltersBar name="Agumon" onChange={() => {}} onClear={() => {}} />);
    const input = screen.getByPlaceholderText(/Digimon name.../i);
    expect(input).toHaveValue('Agumon');
  });

  it('calls onChange when the user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<FiltersBar name="" onChange={handleChange} onClear={() => {}} />);
    const input = screen.getByPlaceholderText(/Digimon name.../i);

    await user.type(input, 'Gabumon');

    expect(handleChange).toHaveBeenCalledTimes(7);
    expect(handleChange).toHaveBeenCalledWith({ name: 'G' });
    expect(handleChange).toHaveBeenCalledWith({ name: 'n' });
  });

  it('calls onClear when the user clicks the clear button', async () => {
    const user = userEvent.setup();
    const handleClear = vi.fn();

    render(<FiltersBar name="Agumon" onChange={() => {}} onClear={handleClear} />);
    const button = screen.getByRole('button', { name: /Clear/i });

    await user.click(button);

    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
