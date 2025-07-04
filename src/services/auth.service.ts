// src/services/auth.service.ts

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Definisikan tipe untuk data yang dikirim saat login
interface LoginCredentials {
  username?: string;
  password?: string;
}

// Definisikan tipe untuk respons dari API login
interface LoginResponse {
  token: string;
}

// Definisikan tipe untuk payload token setelah di-decode
interface DecodedToken {
  user: string;
  iat: number;
  exp: number;
}

// Berikan tipe pada parameter 'data' dan nilai kembalian (return value)
export const login = async (data: LoginCredentials): Promise<string> => {
  // Beri tahu Axios bentuk respons yang diharapkan
  const res = await axios.post<LoginResponse>(
    'https://fakestoreapi.com/auth/login',
    data
  );
  // Sekarang, TypeScript tahu bahwa res.data memiliki properti 'token'
  return res.data.token;
};

// Berikan tipe pada parameter 'token' dan nilai kembaliannya
export const getUsername = (token: string): string => {
  // Beri tahu jwtDecode bentuk payload yang diharapkan
  const decoded = jwtDecode<DecodedToken>(token);
  // TypeScript tahu bahwa 'decoded' memiliki properti 'user' yang bertipe string
  return decoded.user;
};
