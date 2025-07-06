import React from 'react';
import { render, screen } from '@testing-library/react';
import { ParticleBackground } from '@/components/ui/ParticleBackground';

// Mock canvas context
const mockContext = {
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  fillStyle: '',
  strokeStyle: '',
};

// Mock HTMLCanvasElement
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: jest.fn(() => mockContext),
});

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => {
  setTimeout(cb, 16);
  return 1;
});

describe('ParticleBackground', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock canvas dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  it('renders canvas element', () => {
    render(<ParticleBackground />);
    
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<ParticleBackground />);
    
    const canvas = document.querySelector('canvas');
    expect(canvas).toHaveClass('absolute', 'inset-0', 'pointer-events-none');
  });

  it('has correct z-index style', () => {
    render(<ParticleBackground />);
    
    const canvas = document.querySelector('canvas');
    expect(canvas).toHaveStyle({ zIndex: 1 });
  });

  it('initializes canvas context', () => {
    render(<ParticleBackground />);
    
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith('2d');
  });

  it('sets up resize event listener', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    
    render(<ParticleBackground />);
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    
    const { unmount } = render(<ParticleBackground />);
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('handles canvas context not available', () => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = jest.fn(() => null);
    
    expect(() => render(<ParticleBackground />)).not.toThrow();
    
    HTMLCanvasElement.prototype.getContext = originalGetContext;
  });

  it('starts animation loop', () => {
    render(<ParticleBackground />);
    
    expect(requestAnimationFrame).toHaveBeenCalled();
  });
});
