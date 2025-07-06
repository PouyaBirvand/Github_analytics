import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeaturesSection } from '@/components/home/FeaturesSection';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

// Mock FeatureCard component
jest.mock('@/components/ui/FeatureCard', () => ({
  FeatureCard: ({ title, description }) => (
    <div data-testid="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

// Mock features data
jest.mock('@/lib/constants/features', () => ({
  featuresData: [
    {
      id: 'language-analytics',
      title: 'Language Analytics',
      description: 'Comprehensive breakdown of programming languages',
      icon: () => <span>Icon</span>,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'commit-patterns',
      title: 'Commit Patterns',
      description: 'Visualize commit activity and patterns',
      icon: () => <span>Icon</span>,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      id: 'profile-insights',
      title: 'Profile Insights',
      description: 'Deep dive into GitHub profile statistics',
      icon: () => <span>Icon</span>,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      gradient: 'from-purple-500 to-pink-500',
    },
  ],
}));

describe('FeaturesSection', () => {
  it('renders section with correct structure', () => {
    render(<FeaturesSection />);
    
    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('py-12', 'sm:py-16', 'md:py-20', 'lg:py-24');
  });

  it('renders main heading', () => {
    render(<FeaturesSection />);
    
    expect(screen.getByText('Powerful Analytics Features')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<FeaturesSection />);
    
    expect(screen.getByText(/Transform raw GitHub data into actionable insights/)).toBeInTheDocument();
  });

  it('renders all feature cards', () => {
    render(<FeaturesSection />);
    
    const featureCards = screen.getAllByTestId('feature-card');
    expect(featureCards).toHaveLength(3);
  });

  it('renders feature cards with correct titles', () => {
    render(<FeaturesSection />);
    
    expect(screen.getByText('Language Analytics')).toBeInTheDocument();
    expect(screen.getByText('Commit Patterns')).toBeInTheDocument();
    expect(screen.getByText('Profile Insights')).toBeInTheDocument();
  });

  it('renders feature cards with correct descriptions', () => {
    render(<FeaturesSection />);
    
    expect(screen.getByText('Comprehensive breakdown of programming languages')).toBeInTheDocument();
    expect(screen.getByText('Visualize commit activity and patterns')).toBeInTheDocument();
    expect(screen.getByText('Deep dive into GitHub profile statistics')).toBeInTheDocument();
  });

  it('has correct grid layout classes', () => {
    const { container } = render(<FeaturesSection />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });

  it('has correct container max width', () => {
    const { container } = render(<FeaturesSection />);
    
    const containerDiv = container.querySelector('.container');
    expect(containerDiv).toHaveClass('max-w-7xl');
  });

  it('has gradient background', () => {
    const { container } = render(<FeaturesSection />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-gradient-to-b', 'from-background', 'to-muted/20');
  });

  it('applies responsive padding', () => {
    const { container } = render(<FeaturesSection />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
  });
});
