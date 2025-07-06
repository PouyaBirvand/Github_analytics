import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CTASection } from '@/components/home/CTASection';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Sparkles: () => <span data-testid="sparkles-icon">Sparkles</span>,
  TrendingUp: () => <span data-testid="trending-up-icon">TrendingUp</span>,
  Zap: () => <span data-testid="zap-icon">Zap</span>,
}));

// Mock SearchForm component
jest.mock('@/components/search/SearchForm', () => ({
  SearchForm: ({ onSearch, loading, variant }) => (
    <div data-testid="search-form">
      <button onClick={() => onSearch('testuser')} disabled={loading}>
        {loading ? 'Loading...' : `Search ${variant}`}
      </button>
    </div>
  ),
}));

// Mock DOT_POSITIONS
jest.mock('@/lib/constants/dots', () => ({
  DOT_POSITIONS: [
    { left: 10, top: 20, delay: 0.5 },
    { left: 80, top: 60, delay: 1.0 },
    { left: 50, top: 90, delay: 1.5 },
  ],
}));

describe('CTASection', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders section with correct structure', () => {
    render(<CTASection onSearch={mockOnSearch} loading={false} />);

    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('relative', 'overflow-hidden');
  });

  it('renders main heading', () => {
    render(<CTASection onSearch={mockOnSearch} loading={false} />);

    expect(screen.getByText('Ready to Unlock Your')).toBeInTheDocument();
    expect(screen.getByText('Coding Potential?')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<CTASection onSearch={mockOnSearch} loading={false} />);

    expect(
      screen.getByText(/Join thousands of developers who've discovered/)
    ).toBeInTheDocument();
  });

  it('renders all icons', () => {
    render(<CTASection onSearch={mockOnSearch} loading={false} />);

    expect(screen.getByTestId('sparkles-icon')).toBeInTheDocument();
    expect(screen.getByTestId('trending-up-icon')).toBeInTheDocument();
    expect(screen.getByTestId('zap-icon')).toBeInTheDocument();
  });

  it('renders SearchForm with correct props', () => {
    render(<CTASection onSearch={mockOnSearch} loading={true} />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('passes correct variant to SearchForm', () => {
    render(<CTASection onSearch={mockOnSearch} loading={false} />);

    expect(screen.getByText('Search cta')).toBeInTheDocument();
  });

  it('handles search functionality', () => {
    render(<CTASection onSearch={mockOnSearch} loading={false} />);

    const searchButton = screen.getByText('Search cta');
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  it('renders feature indicators', () => {
    render(<CTASection onSearch={mockOnSearch} loading={false} />);

    expect(screen.getByText('100% Free')).toBeInTheDocument();
    expect(screen.getByText('No Registration')).toBeInTheDocument();
    expect(screen.getByText('Instant Results')).toBeInTheDocument();
  });

  it('has gradient background', () => {
    const { container } = render(
      <CTASection onSearch={mockOnSearch} loading={false} />
    );

    const gradientBg = container.querySelector(
      '.bg-gradient-to-br.from-blue-600.via-purple-600.to-pink-600'
    );
    expect(gradientBg).toBeInTheDocument();
  });

  it('has overlay background', () => {
    const { container } = render(
      <CTASection onSearch={mockOnSearch} loading={false} />
    );

    const overlay = container.querySelector('.bg-black\\/20');
    expect(overlay).toBeInTheDocument();
  });

  it('renders animated dots', () => {
    const { container } = render(
      <CTASection onSearch={mockOnSearch} loading={false} />
    );

    const dots = container.querySelectorAll(
      '.w-1.h-1.sm\\:w-2.sm\\:h-2.bg-white\\/20.rounded-full'
    );
    expect(dots).toHaveLength(3);
  });

  it('applies responsive padding', () => {
    const { container } = render(
      <CTASection onSearch={mockOnSearch} loading={false} />
    );

    const section = container.querySelector('section');
    expect(section).toHaveClass('py-16');
    expect(section).toHaveClass('sm:py-20');
  });

  it('has correct text alignment', () => {
    const { container } = render(
      <CTASection onSearch={mockOnSearch} loading={false} />
    );

    const textContainer = container.querySelector('.text-center');
    expect(textContainer).toBeInTheDocument();
  });

  it('renders with white text color', () => {
    const { container } = render(
      <CTASection onSearch={mockOnSearch} loading={false} />
    );

    const whiteText = container.querySelector('.text-white');
    expect(whiteText).toBeInTheDocument();
  });

  it('has correct z-index for content', () => {
    const { container } = render(
      <CTASection onSearch={mockOnSearch} loading={false} />
    );

    const relativeContent = container.querySelector('.relative.z-10');
    expect(relativeContent).toBeInTheDocument();
  });

  it('handles loading state correctly', () => {
    const { rerender } = render(
      <CTASection onSearch={mockOnSearch} loading={true} />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    rerender(<CTASection onSearch={mockOnSearch} loading={false} />);
    expect(screen.getByText('Search cta')).toBeInTheDocument();
  });
});
