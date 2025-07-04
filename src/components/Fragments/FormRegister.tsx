import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const FormRegister = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      fullname: data.get('fullname'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1, width: '100%' }}
    >
      <TextField
        margin='normal'
        required
        fullWidth
        id='fullname'
        label='Full Name'
        name='fullname'
        autoFocus
      />
      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='confirmPassword'
        label='Confirm Password'
        type='password'
        id='confirmPassword'
      />
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Register
      </Button>
    </Box>
  );
};

export default FormRegister;
