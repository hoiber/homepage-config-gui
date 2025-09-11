import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error);
      console.error('Error info:', errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
              <h1 className="text-2xl font-bold text-red-400 mb-4">
                Something went wrong
              </h1>
              <p className="text-slate-300 mb-4">
                An error occurred while rendering the application. Please refresh the page to try again.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-6 p-4 bg-slate-800 rounded border border-slate-700">
                  <h3 className="font-semibold text-red-400 mb-2">Error Details (Development Mode)</h3>
                  <pre className="text-sm text-slate-400 whitespace-pre-wrap">
                    {this.state.error.toString()}
                  </pre>
                  {this.state.errorInfo.componentStack && (
                    <div className="mt-2">
                      <h4 className="font-semibold text-red-400 mb-1">Component Stack:</h4>
                      <pre className="text-xs text-slate-500 whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                >
                  Refresh Page
                </button>
                <button
                  onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;