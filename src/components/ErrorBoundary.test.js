import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// Component that throws an error for testing
const ThrowError = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console.error for these tests
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('should render error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('An error occurred while rendering the application. Please refresh the page to try again.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Refresh Page' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
  });

  it('should show error details in development mode', () => {
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error Details (Development Mode)')).toBeInTheDocument();
    expect(screen.getByText(/Test error/)).toBeInTheDocument();

    process.env.NODE_ENV = originalNodeEnv;
  });

  it('should not show error details in production mode', () => {
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.queryByText('Error Details (Development Mode)')).not.toBeInTheDocument();

    process.env.NODE_ENV = originalNodeEnv;
  });
});