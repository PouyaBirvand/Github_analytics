import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { BarChart3 } from 'lucide-react';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

// Mock UI components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }) => (
    <div className={className}>{children}</div>
  ),
  CardContent: ({ children, className }) => (
    <div className={className}>{children}</div>
  ),
}));

describe('FeatureCard', () => {
  const defaultProps = {
    icon: BarChart3,
    title: 'Test Feature',
    description: 'This is a test feature description',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    gradient: 'from-blue-500 to-cyan-500',
  };

  it('renders with correct test id', () => {
    render(<FeatureCard {...defaultProps} />);

    expect(screen.getByTestId('feature-card')).toBeInTheDocument();
  });

  it('renders title correctly', () => {
    render(<FeatureCard {...defaultProps} />);

    expect(screen.getByText('Test Feature')).toBeInTheDocument();
  });

  it('renders description correctly', () => {
    render(<FeatureCard {...defaultProps} />);

    expect(
      screen.getByText('This is a test feature description')
    ).toBeInTheDocument();
  });

  it('renders icon component', () => {
    render(<FeatureCard {...defaultProps} />);

    // The icon should be rendered (BarChart3 from lucide-react)
    const iconContainer = screen
      .getByTestId('feature-card')
      .querySelector('.w-14');
    expect(iconContainer).toBeInTheDocument();
  });

  it('applies correct color classes', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);

    const iconContainer = container.querySelector('.bg-blue-500\\/10');
    expect(iconContainer).toBeInTheDocument();
  });

  it('has hover effects', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);

    const card = container.querySelector('.group');
    expect(card).toBeInTheDocument();
  });

  it('has correct card structure', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);

    const cardContent = container.querySelector('.p-4');
    expect(cardContent).toBeInTheDocument();
    expect(cardContent).toHaveClass('text-center', 'space-y-4');
  });

  it('applies gradient background on hover', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);

    const gradientOverlay = container.querySelector(
      '.absolute.inset-0.bg-gradient-to-br'
    );
    expect(gradientOverlay).toBeInTheDocument();
  });

  it('has responsive icon sizes', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);

    const iconContainer = container.querySelector(
      '.w-14.h-14.sm\\:w-16.sm\\:h-16.md\\:w-20.md\\:h-20'
    );
    expect(iconContainer).toBeInTheDocument();
  });

  it('has responsive padding', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);

    const cardContent = container.querySelector('.p-4.sm\\:p-6.md\\:p-8');
    expect(cardContent).toBeInTheDocument();
  });

  it('has gradient progress bar', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);

    const progressBar = container.querySelector(
      '.w-full.h-0\\.5.sm\\:h-1.bg-gradient-to-r'
    );
    expect(progressBar).toBeInTheDocument();
  });

  it('handles different icon components', () => {
    const CustomIcon = () => <span data-testid="custom-icon">Custom</span>;

    render(<FeatureCard {...defaultProps} icon={CustomIcon} />);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('applies custom gradient styles', () => {
    const customProps = {
      ...defaultProps,
      gradient: 'from-red-500 to-yellow-500',
    };

    const { container } = render(<FeatureCard {...customProps} />);

    // Check if gradient is applied via style attribute
    const gradientElement =
      container.querySelector('[class*="gradient"]') ||
      container.querySelector('[style*="background"]');
    expect(gradientElement).toBeTruthy();
  });
});
