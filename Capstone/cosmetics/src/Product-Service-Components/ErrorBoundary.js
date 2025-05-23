import React from 'react';
import { Navigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Caught in error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Navigate to="/maintain" replace />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;