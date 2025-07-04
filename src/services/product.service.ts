import axios from 'axios';
import type { Product } from '../models/Product';

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(
    'https://fakestoreapi.com/products'
  );
  return response.data;
};

export const getDetailProducts = async (
  id: number | string
): Promise<Product> => {
  const response = await axios.get<Product>(
    `https://fakestoreapi.com/products/${id}`
  );
  return response.data;
};
