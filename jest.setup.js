import '@testing-library/jest-dom';

// Mock framer-motion globally
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      className,
      style,
      whileHover,
      whileTap,
      whileInView,
      initial,
      animate,
      transition,
      ...props
    }) => (
      <div
        className={className}
        style={style}
        data-testid={props['data-testid']}
        {...props}
      >
        {children}
      </div>
    ),
    section: ({
      children,
      className,
      style,
      whileInView,
      initial,
      animate,
      transition,
      ...props
    }) => (
      <section className={className} style={style} {...props}>
        {children}
      </section>
    ),
    h1: ({
      children,
      className,
      style,
      initial,
      animate,
      transition,
      ...props
    }) => (
      <h1 className={className} style={style} {...props}>
        {children}
      </h1>
    ),
    button: ({
      children,
      className,
      style,
      whileHover,
      whileTap,
      ...props
    }) => (
      <button className={className} style={style} {...props}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));
