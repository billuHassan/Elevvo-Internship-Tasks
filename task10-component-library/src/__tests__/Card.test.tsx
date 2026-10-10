import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from '../components/Card/Card';

describe('Card Component', () => {
  it('renders card with header, title, description, content, and footer', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Enterprise Security</Card.Title>
          <Card.Description>SOC2 Type II Certified Infrastructure</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>End-to-end TLS 1.3 encryption for all data packets in transit.</p>
        </Card.Content>
        <Card.Footer>
          <button type="button">Learn More</button>
        </Card.Footer>
      </Card>
    );

    expect(screen.getByRole('heading', { name: /enterprise security/i })).toBeInTheDocument();
    expect(screen.getByText(/soc2 type ii certified infrastructure/i)).toBeInTheDocument();
    expect(screen.getByText(/end-to-end tls 1.3 encryption/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument();
  });

  it('applies variant classes properly', () => {
    const { container: elevatedContainer } = render(<Card variant="elevated">Elevated</Card>);
    expect(elevatedContainer.firstChild).toHaveClass('ds-card--elevated');

    const { container: outlinedContainer } = render(<Card variant="outlined">Outlined</Card>);
    expect(outlinedContainer.firstChild).toHaveClass('ds-card--outlined');

    const { container: flatContainer } = render(<Card variant="flat">Flat</Card>);
    expect(flatContainer.firstChild).toHaveClass('ds-card--flat');
  });

  it('applies hoverable class when hoverable prop is true', () => {
    const { container } = render(<Card hoverable>Interactive Card</Card>);
    expect(container.firstChild).toHaveClass('ds-card--hoverable');
  });
});

