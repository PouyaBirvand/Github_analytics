import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchForm } from '@/components/search/SearchForm';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Search: () => <span data-testid="search-icon">Search Icon</span>,
  Loader2: () => <span data-testid="loader-icon">Loader Icon</span>,
  Sparkles: () => <span data-testid="sparkles-icon">Sparkles Icon</span>,
}));

// Mock UI components
jest.mock('@/components/ui/input', () => ({
  Input: ({ ...props }) => <input {...props} />,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

// Mock styles
jest.mock('@/lib/constants/styles', () => ({
  getVariantStyles: jest.fn(variant => ({
    container: `container-${variant}`,
    form: `form-${variant}`,
    input: `input-${variant}`,
    button: `button-${variant}`,
    sparkles: `sparkles-${variant}`,
  })),
}));

describe('SearchForm', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form elements correctly', () => {
    render(<SearchForm onSearch={mockOnSearch} />);

    expect(
      screen.getByPlaceholderText('Enter GitHub username...')
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has correct test id', () => {
    render(<SearchForm onSearch={mockOnSearch} />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Enter GitHub username...');
    fireEvent.change(input, { target: { value: 'testuser' } });

    expect(input).toHaveValue('testuser');
  });

  it('calls onSearch with trimmed username on form submit', () => {
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Enter GitHub username...');
    const form = screen.getByTestId('search-form').querySelector('form');

    fireEvent.change(input, { target: { value: '  testuser  ' } });
    fireEvent.submit(form);

    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  it('does not call onSearch with empty username', () => {
    render(<SearchForm onSearch={mockOnSearch} />);

    const form = screen.getByTestId('search-form').querySelector('form');
    fireEvent.submit(form);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('disables form when loading', () => {
    render(<SearchForm onSearch={mockOnSearch} loading={true} />);

    const input = screen.getByPlaceholderText('Enter GitHub username...');
    const button = screen.getByRole('button');

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('shows loader icon when loading', () => {
    render(<SearchForm onSearch={mockOnSearch} loading={true} />);

    expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
  });

  it('disables button when username is empty', () => {
    render(<SearchForm onSearch={mockOnSearch} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('enables button when username is provided', () => {
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Enter GitHub username...');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'testuser' } });

    expect(button).not.toBeDisabled();
  });

  it('shows sparkles icon for hero variant', () => {
    render(<SearchForm onSearch={mockOnSearch} variant="hero" />);

    expect(screen.getByTestId('sparkles-icon')).toBeInTheDocument();
  });

  it('shows correct button text for hero variant', () => {
    render(<SearchForm onSearch={mockOnSearch} variant="hero" />);

    const input = screen.getByPlaceholderText('Enter GitHub username...');
    fireEvent.change(input, { target: { value: 'testuser' } });

    expect(screen.getByText('Analyze Profile')).toBeInTheDocument();
  });

  it('shows correct button text for default variant', () => {
    render(<SearchForm onSearch={mockOnSearch} variant="default" />);

    const input = screen.getByPlaceholderText('Enter GitHub username...');
    fireEvent.change(input, { target: { value: 'testuser' } });

    expect(screen.getByText('Analyze')).toBeInTheDocument();
  });

  it('shows search icon for non-default variants', () => {
    render(<SearchForm onSearch={mockOnSearch} variant="hero" />);

    const input = screen.getByPlaceholderText('Enter GitHub username...');
    fireEvent.change(input, { target: { value: 'testuser' } });

    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('prevents form submission with only whitespace', () => {
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Enter GitHub username...');
    const form = screen.getByTestId('search-form').querySelector('form');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(form);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
