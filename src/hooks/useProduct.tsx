import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/product.service';
import type { Product } from '../models/Product';

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};
