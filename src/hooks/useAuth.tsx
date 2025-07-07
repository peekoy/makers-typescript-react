import { useMutation } from '@tanstack/react-query';
import { login, type LoginCredentials } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation<string, Error, LoginCredentials>({
    mutationFn: login,
    onSuccess: (token) => {
      localStorage.setItem('token', token);
      navigate('/products');
    },
  });
};
