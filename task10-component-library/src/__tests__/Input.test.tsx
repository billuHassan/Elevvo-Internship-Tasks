import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '../components/Input/Input';

describe('Input Component', () => {
  it('renders input with associated label', () => {
    render(<Input label="Email Address" placeholder="alex@example.com" />);
    const input = screen.getByLabelText(/email address/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'alex@example.com');
  });

  it('handles user typing and triggers onChange', () => {
    const handleChange = vi.fn();
    render(<Input label="Full Name" onChange={handleChange} />);
    const input = screen.getByLabelText(/full name/i);
    fireEvent.change(input, { target: { value: 'Jane Doe' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('Jane Doe');
  });

  it('renders error message and marks aria-invalid="true"', () => {
    render(<Input label="Password" error="Password must be at least 8 characters" />);
    const input = screen.getByLabelText(/password/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveTextContent('Password must be at least 8 characters');
  });

  it('renders helper text when no error exists', () => {
    render(<Input label="Username" helperText="Choose a unique handle" />);
    expect(screen.getByText('Choose a unique handle')).toBeInTheDocument();
  });

  it('disables input when disabled prop is set', () => {
    render(<Input label="Disabled Field" disabled />);
    const input = screen.getByLabelText(/disabled field/i);
    expect(input).toBeDisabled();
  });
});

