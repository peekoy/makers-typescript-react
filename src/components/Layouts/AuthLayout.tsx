import { Container, Box, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  type: 'login' | 'register';
}

const AuthLayout = ({ children, title, type }: AuthLayoutProps) => {
  const isLogin = type === 'login';

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h4'>
          {title}
        </Typography>
        <Typography component='p' color='text.Secondary' sx={{ mt: 1, mb: 3 }}>
          Welcome, Please enter your details
        </Typography>

        {children}

        <Typography variant='body2' sx={{ mt: 3, textAlign: 'center' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <MuiLink
            component={RouterLink}
            to={isLogin ? '/register' : '/login'}
            variant='body2'
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthLayout;
