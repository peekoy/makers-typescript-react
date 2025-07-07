import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import CardProduct from '../components/Fragments/CardProduct';
import type { Product } from '../models/Product';

describe('CardProduct Component', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Awesome T-Shirt',
    price: 25.99,
    description: 'A very comfortable and stylish t-shirt for everyday wear.',
    category: 'clothing',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: {
      rate: 4.5,
      count: 150,
    },
  };

  const mockHandleAddToCart = vi.fn();

  it('seharusnya me-render detail produk dengan benar', () => {
    render(
      <Router>
        <CardProduct
          product={mockProduct}
          handleAddToCart={mockHandleAddToCart}
        />
      </Router>
    );

    expect(screen.getByText('Awesome T-Shirt')).toBeInTheDocument();

    expect(
      screen.getByText(/A very comfortable and stylish/)
    ).toBeInTheDocument();

    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /add to cart/i })
    ).toBeInTheDocument();

    const productImage = screen.getByRole('img', { name: /product/i });
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', mockProduct.image);
  });

  it('seharusnya memanggil handleAddToCart dengan id produk saat tombol diklik', () => {
    // Render komponen.
    render(
      <Router>
        <CardProduct
          product={mockProduct}
          handleAddToCart={mockHandleAddToCart}
        />
      </Router>
    );

    const addToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });
    fireEvent.click(addToCartButton);

    expect(mockHandleAddToCart).toHaveBeenCalledTimes(1);

    expect(mockHandleAddToCart).toHaveBeenCalledWith(mockProduct.id);
  });
});
