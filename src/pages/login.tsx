import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Alert, CircularProgress } from '@mui/material';

import FormLogin from '../components/Fragments/FormLogin'; // Pastikan path benar
import { loginUser } from '../redux/auth/authSlice';
import type { RootState, AppDispatch } from '../redux/store'; // Impor tipe untuk state dan dispatch

const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fokus pada input username saat komponen pertama kali dimuat
    usernameRef.current?.focus();
  }, []);

  useEffect(() => {
    // Arahkan ke halaman produk jika user sudah login
    if (user) {
      navigate('/products');
    }
  }, [user, navigate]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    dispatch(loginUser({ username, password }));
  };

  return (
    <FormLogin onSubmit={handleLogin} ref={usernameRef}>
      {error && (
        <Alert severity='error' sx={{ width: '100%', mt: 2 }}>
          {error}
        </Alert>
      )}
      <Button
        type='submit'
        fullWidth
        variant='contained'
        disabled={loading}
        sx={{ mt: 3, mb: 2 }}
      >
        {loading ? <CircularProgress size={24} color='inherit' /> : 'Login'}
      </Button>
    </FormLogin>
  );
};

export default LoginPage;
