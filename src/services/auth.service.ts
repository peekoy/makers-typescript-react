import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface LoginCredentials {
  username?: string;
  password?: string;
}

interface LoginResponse {
  token: string;
}

interface DecodedToken {
  user: string;
  iat: number;
  exp: number;
}

export const login = async (data: LoginCredentials): Promise<string> => {
  const res = await axios.post<LoginResponse>(
    'https://fakestoreapi.com/auth/login',
    data
  );
  return res.data.token;
};

export const getUsername = (token: string): string => {
  const decoded = jwtDecode<DecodedToken>(token);
  return decoded.user;
};
