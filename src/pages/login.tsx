import React, { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Button, Alert, CircularProgress } from '@mui/material';
import FormLogin from '../components/Fragments/FormLogin';
import { useLogin } from '../hooks/useAuth';

// redux
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../redux/auth/authSlice';
// import type { RootState, AppDispatch } from '../redux/store';

const LoginPage = () => {
  // redux
  // const dispatch: AppDispatch = useDispatch();
  // const { user, loading, error } = useSelector(
  //   (state: RootState) => state.auth
  // );

  const { mutate: login, isPending, isError, error } = useLogin();
  // const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    login({ username, password });
  };

  return (
    <FormLogin onSubmit={handleLogin} ref={usernameRef}>
      {isError && (
        <Alert severity='error' sx={{ width: '100%', mt: 2 }}>
          {error?.message || 'Invalid credentials'}
        </Alert>
      )}
      <Button
        type='submit'
        fullWidth
        variant='contained'
        disabled={isPending}
        sx={{ mt: 3, mb: 2 }}
      >
        {isPending ? <CircularProgress size={24} color='inherit' /> : 'Login'}
      </Button>
    </FormLogin>
  );
};

export default LoginPage;
