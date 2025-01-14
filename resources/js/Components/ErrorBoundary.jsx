import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service here
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="p-4 m-4 rounded-lg bg-red-50 border border-red-200">
                    <h2 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h2>
                    <p className="text-red-600">
                        {this.state.error?.message || 'An unexpected error occurred'}
                    </p>
                    <button
                        onClick={() => {
                            this.setState({ hasError: false, error: null });
                            window.location.reload(); // Optional: reload the page
                        }}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
