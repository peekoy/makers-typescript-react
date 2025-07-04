import { TextField, Button, Box } from '@mui/material';
import React from 'react';
import AuthLayout from '../Layouts/AuthLayout';

interface FormLoginProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const FormLogin = React.forwardRef<HTMLInputElement, FormLoginProps>(
  ({ onSubmit, children }, ref) => {
    return (
      <AuthLayout title='Login' type='login'>
        <Box component='form' onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoFocus
            inputRef={ref}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          {children}
          {/* <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button> */}
        </Box>
      </AuthLayout>
    );
  }
);

FormLogin.displayName = 'FormLogin';

export default FormLogin;
