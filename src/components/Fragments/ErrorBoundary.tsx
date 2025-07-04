import React, { type ReactNode, type ErrorInfo } from 'react';
import { Box, Alert, AlertTitle } from '@mui/material';

interface ErrorBoundaryProps {
  children: ReactNode;
  showDetails?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='100vh'
          textAlign='center'
          p={2}
        >
          <Alert severity='error'>
            <AlertTitle>Oops! Something went wrong.</AlertTitle>
            We are sorry for the inconvenience. Please try refreshing the page.
            {this.props.showDetails && this.state.error && (
              <details
                style={{
                  whiteSpace: 'pre-wrap',
                  textAlign: 'left',
                  marginTop: '16px',
                }}
              >
                <summary>Error Details</summary>
                {this.state.error.toString()}
                <br />
                {this.state.errorInfo?.componentStack}
              </details>
            )}
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
