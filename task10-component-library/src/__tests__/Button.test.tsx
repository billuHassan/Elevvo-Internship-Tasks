import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../components/Button/Button';

describe('Button Component', () => {
  it('renders button with children text', () => {
    render(<Button>Submit Application</Button>);
    expect(screen.getByRole('button', { name: /submit application/i })).toBeInTheDocument();
  });

  it('triggers onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders loading state with spinner and disables clicking', () => {
    const handleClick = vi.fn();
    render(<Button isLoading onClick={handleClick}>Saving...</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies variant and size classes correctly', () => {
    render(<Button variant="danger" size="lg">Delete Account</Button>);
    const button = screen.getByRole('button', { name: /delete account/i });
    expect(button).toHaveClass('ds-button--danger');
    expect(button).toHaveClass('ds-button--lg');
  });
});

