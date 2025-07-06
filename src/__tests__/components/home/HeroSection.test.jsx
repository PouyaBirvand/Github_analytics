import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroSection } from '@/components/home/HeroSection';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }) => (
      <section {...props}>{children}</section>
    ),
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
}));

// Mock child components
jest.mock('@/components/search/SearchForm', () => ({
  SearchForm: ({ onSearch, loading, variant }) => (
    <div data-testid="search-form">
      <button onClick={() => onSearch('testuser')} disabled={loading}>
        {loading ? 'Loading...' : `Search ${variant}`}
      </button>
    </div>
  ),
}));

jest.mock('@/components/ui/ParticleBackground', () => ({
  ParticleBackground: () => (
    <div data-testid="particle-background">Particles</div>
  ),
}));

jest.mock('@/components/ui/GradientText', () => ({
  GradientText: ({ text, className, gradient }) => (
    <h1
      data-testid="gradient-text"
      className={className}
      data-gradient={gradient}
    >
      {text}
    </h1>
  ),
}));

jest.mock('@/components/home/PopularDevelopers', () => ({
  PopularDevelopers: ({ onSearch }) => (
    <div data-testid="popular-developers">
      <button onClick={() => onSearch('popular-dev')}>Popular Dev</button>
    </div>
  ),
}));

describe('HeroSection', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all main elements', () => {
    render(<HeroSection onSearch={mockOnSearch} loading={false} />);

    expect(screen.getByTestId('particle-background')).toBeInTheDocument();
    expect(screen.getByTestId('gradient-text')).toBeInTheDocument();
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByTestId('popular-developers')).toBeInTheDocument();
  });

  it('displays correct heading text', () => {
    render(<HeroSection onSearch={mockOnSearch} loading={false} />);

    const gradientText = screen.getByTestId('gradient-text');
    expect(gradientText).toHaveTextContent('GitHub Profile Analytics');
  });

  it('displays correct description text', () => {
    render(<HeroSection onSearch={mockOnSearch} loading={false} />);

    expect(
      screen.getByText(/Unlock the power of data-driven insights/)
    ).toBeInTheDocument();
  });

  it('passes correct props to SearchForm', () => {
    render(<HeroSection onSearch={mockOnSearch} loading={true} />);

    const searchButton = screen.getByText('Loading...');
    expect(searchButton).toBeDisabled();
  });

  it('handles search from SearchForm', () => {
    render(<HeroSection onSearch={mockOnSearch} loading={false} />);

    const searchButton = screen.getByText('Search hero');
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  it('handles search from PopularDevelopers', () => {
    render(<HeroSection onSearch={mockOnSearch} loading={false} />);

    const popularDevButton = screen.getByText('Popular Dev');
    fireEvent.click(popularDevButton);

    expect(mockOnSearch).toHaveBeenCalledWith('popular-dev');
  });

  it('displays feature indicators', () => {
    render(<HeroSection onSearch={mockOnSearch} loading={false} />);

    expect(screen.getByText('Real-time Data')).toBeInTheDocument();
    expect(screen.getByText('Advanced Analytics')).toBeInTheDocument();
    expect(screen.getByText('Beautiful Visualizations')).toBeInTheDocument();
  });

  it('has correct CSS classes for responsive design', () => {
    const { container } = render(
      <HeroSection onSearch={mockOnSearch} loading={false} />
    );
    const section = container.querySelector('section');

    expect(section).toHaveClass(
      'relative',
      'min-h-screen',
      'flex',
      'items-center',
      'justify-center'
    );
  });

  it('renders gradient overlay', () => {
    const { container } = render(
      <HeroSection onSearch={mockOnSearch} loading={false} />
    );
    const gradientOverlay = container.querySelector(
      '.absolute.inset-0.bg-gradient-to-br'
    );

    expect(gradientOverlay).toBeInTheDocument();
  });

  it('passes correct gradient prop to GradientText', () => {
    render(<HeroSection onSearch={mockOnSearch} loading={false} />);

    const gradientText = screen.getByTestId('gradient-text');
    expect(gradientText).toHaveAttribute(
      'data-gradient',
      'from-blue-600 via-purple-600 to-pink-600'
    );
  });
});
