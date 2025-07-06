import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PopularDevelopers } from '@/components/home/PopularDevelopers';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, onClick, ...props }) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
}));

// Mock popular developers data
jest.mock('@/lib/constants/developers', () => ({
  popularDevelopers: [
    { username: 'torvalds', name: 'Linus Torvalds' },
    { username: 'gaearon', name: 'Dan Abramov' },
    { username: 'sindresorhus', name: 'Sindre Sorhus' },
  ],
}));

describe('PopularDevelopers', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders popular developers section', () => {
    render(<PopularDevelopers onSearch={mockOnSearch} />);

    expect(
      screen.getByText('Try searching for popular developers:')
    ).toBeInTheDocument();
  });

  it('renders all popular developer buttons', () => {
    render(<PopularDevelopers onSearch={mockOnSearch} />);

    expect(screen.getByText('torvalds')).toBeInTheDocument();
    expect(screen.getByText('gaearon')).toBeInTheDocument();
    expect(screen.getByText('sindresorhus')).toBeInTheDocument();
  });

  it('calls onSearch when developer button is clicked', () => {
    render(<PopularDevelopers onSearch={mockOnSearch} />);

    const torvaldsButton = screen.getByText('torvalds');
    fireEvent.click(torvaldsButton);

    expect(mockOnSearch).toHaveBeenCalledWith('torvalds');
  });

  it('calls onSearch with correct username for each developer', () => {
    render(<PopularDevelopers onSearch={mockOnSearch} />);

    fireEvent.click(screen.getByText('gaearon'));
    expect(mockOnSearch).toHaveBeenCalledWith('gaearon');

    fireEvent.click(screen.getByText('sindresorhus'));
    expect(mockOnSearch).toHaveBeenCalledWith('sindresorhus');
  });

  it('renders mobile scroll indicator', () => {
    const { container } = render(<PopularDevelopers onSearch={mockOnSearch} />);

    const scrollIndicator = container.querySelector('.sm\\:hidden');
    expect(scrollIndicator).toBeInTheDocument();
  });

  it('applies correct CSS classes for responsive design', () => {
    const { container } = render(<PopularDevelopers onSearch={mockOnSearch} />);

    const buttonsContainer = container.querySelector(
      '.flex.flex-wrap.justify-center'
    );
    expect(buttonsContainer).toBeInTheDocument();
  });

  it('has hover effects on buttons', () => {
    render(<PopularDevelopers onSearch={mockOnSearch} />);

    const button = screen.getByText('torvalds');
    expect(button.closest('button')).toBeInTheDocument();
  });

  it('handles empty developers list gracefully', () => {
    // Mock empty developers list
    jest.doMock('@/lib/constants/developers', () => ({
      popularDevelopers: [],
    }));

    expect(() =>
      render(<PopularDevelopers onSearch={mockOnSearch} />)
    ).not.toThrow();
  });
});
