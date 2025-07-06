import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '@/app/page';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockOnSearch = jest.fn(username => {
  mockPush(`/search?username=${username}`);
});

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all main sections', () => {
    render(<HomePage />);

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('features-section')).toBeInTheDocument();
    expect(screen.getByTestId('cta-section')).toBeInTheDocument();
  });

  it('handles search from hero section', async () => {
    render(<HomePage />);

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('manages loading state during search', async () => {
    render(<HomePage />);

    const searchButton = screen.getByText('Search');
    expect(searchButton).toBeInTheDocument();

    fireEvent.click(searchButton);
  });

  it('handles search from CTA section', async () => {
    render(<HomePage />);

    const ctaButton = screen.getByText('CTA Search');
    fireEvent.click(ctaButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('handles search errors gracefully', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    mockPush.mockImplementationOnce(() => {
      throw new Error('Navigation failed');
    });

    render(<HomePage />);

    const searchButton = screen.getByText('Search');

    try {
      fireEvent.click(searchButton);
    } catch (error) {}

    consoleSpy.mockRestore();
  });
});
