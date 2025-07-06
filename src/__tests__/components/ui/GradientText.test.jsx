import React from 'react';
import { render, screen } from '@testing-library/react';
import { GradientText } from '@/components/ui/GradientText';

describe('GradientText', () => {
  beforeEach(() => {
    // Clear any previous renders
    document.body.innerHTML = '';
  });

  it('renders text correctly', () => {
    render(<GradientText text="Test Text" />);
    expect(screen.getByText('Test Text')).toBeInTheDocument();
  });

  it('applies default gradient classes', () => {
    render(<GradientText text="Test Text" />);
    const element = screen.getByText('Test Text');
    expect(element).toHaveClass('bg-gradient-to-r', 'from-blue-600', 'via-purple-600', 'to-pink-600');
  });

  it('applies custom gradient classes', () => {
    render(
      <GradientText 
        text="Test Text"
        gradient="from-red-500 to-yellow-500"
      />
    );
    const element = screen.getByText('Test Text');
    expect(element).toHaveClass('from-red-500', 'to-yellow-500');
  });

  it('applies custom className', () => {
    render(
      <GradientText 
        text="Test Text"
        className="custom-class text-4xl"
      />
    );
    const element = screen.getByText('Test Text');
    expect(element).toHaveClass('custom-class', 'text-4xl');
  });

  it('applies text clipping classes', () => {
    render(<GradientText text="Test Text" />);
    const element = screen.getByText('Test Text');
    expect(element).toHaveClass('bg-clip-text', 'text-transparent');
  });

  it('handles long text with word wrapping', () => {
    const longText = "This is a very long text that should wrap properly";
    const { container } = render(<GradientText text={longText} />);
    
    const h1Element = container.querySelector('h1');
    expect(h1Element).toHaveStyle({
      wordBreak: 'break-word',
      overflowWrap: 'break-word',
    });
    
    expect(screen.getByText('This is a very long text that should wrap')).toBeInTheDocument();
    expect(screen.getByText('properly')).toBeInTheDocument();
  });

  it('splits text for better mobile wrapping when text has multiple words', () => {
    render(<GradientText text="GitHub Profile Analytics" />);
    
    expect(screen.getByText('GitHub Profile')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
  });

  it('does not split short text', () => {
    render(<GradientText text="Short" />);
    expect(screen.getByText('Short')).toBeInTheDocument();
  });

  it('renders without animation when animate is false', () => {
    render(<GradientText text="Test Text" animate={false} />);
    const element = screen.getByText('Test Text');
    expect(element.tagName).toBe('H1');
  });

  it('applies break-words class for long text', () => {
    const { container } = render(<GradientText text="Very long text with multiple words" />);
    
    const h1Element = container.querySelector('h1');
    expect(h1Element).toHaveClass('break-words', 'hyphens-auto');
  });
});
