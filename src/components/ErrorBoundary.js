import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
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
    
    // Log error to monitoring service (e.g., Sentry)
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
              <p className="text-gray-600 mb-8">
                We're sorry, but something unexpected happened. Our team has been notified and we're working to fix this.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4 mb-8">
              <button
                onClick={this.handleRetry}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Try Again</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/inbox'}
                className="btn-secondary w-full flex items-center justify-center space-x-2"
              >
                <Home className="w-5 h-5" />
                <span>Go to Inbox</span>
              </button>
            </div>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && (
              <details className="text-left bg-gray-100 rounded-lg p-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                  Error Details (Development)
                </summary>
                <div className="text-xs text-gray-600 space-y-2">
                  <div>
                    <strong>Error:</strong>
                    <pre className="mt-1 whitespace-pre-wrap break-words">
                      {this.state.error && this.state.error.toString()}
                    </pre>
                  </div>
                  <div>
                    <strong>Component Stack:</strong>
                    <pre className="mt-1 whitespace-pre-wrap break-words">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </div>
              </details>
            )}

            {/* Support Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                If this problem persists, please 
                <button 
                  onClick={() => {
                    const subject = encodeURIComponent('FlowAI Error Report');
                    const body = encodeURIComponent(`
Error: ${this.state.error}
User Agent: ${navigator.userAgent}
Timestamp: ${new Date().toISOString()}
URL: ${window.location.href}
                    `);
                    window.location.href = `mailto:support@flowai.com?subject=${subject}&body=${body}`;
                  }}
                  className="ml-1 text-blue-600 hover:text-blue-700 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  contact support
                </button>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;