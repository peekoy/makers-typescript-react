import { Component, type ErrorInfo, type ReactNode } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  AlertTitle,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            p: 3,
          }}
        >
          <Alert
            severity='error'
            sx={{ mb: 3, width: '100%', maxWidth: '600px' }}
          >
            <AlertTitle>Oops! Terjadi Kesalahan</AlertTitle>
            <Typography variant='body1'>
              Maaf atas ketidaknyamanannya. Silakan coba segarkan halaman.
            </Typography>
          </Alert>

          {this.state.error && (
            <Accordion sx={{ width: '100%', maxWidth: '600px' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography>Detail Kesalahan</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>
                  <Typography
                    variant='body2'
                    component='pre'
                    sx={{ fontFamily: 'monospace' }}
                  >
                    {this.state.error.toString()}
                  </Typography>
                  <Typography
                    variant='body2'
                    component='pre'
                    sx={{ fontFamily: 'monospace', mt: 2 }}
                  >
                    {this.state.errorInfo?.componentStack}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
