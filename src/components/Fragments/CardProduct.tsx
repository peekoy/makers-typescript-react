import { memo } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import type { Product } from '../../models/Product';

interface HeaderProps {
  id: number;
  image: string;
}

interface BodyProps {
  id: number;
  title: string;
  desc: string;
}

interface FooterProps {
  price: number;
  handleAddToCart: () => void;
}

interface CardProductProps {
  product: Product;
  handleAddToCart: (id: number) => void;
}

const Header = memo(({ id, image }: HeaderProps) => {
  return (
    <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
      <CardMedia
        component='img'
        sx={{
          objectFit: 'contain',
          height: 190,
        }}
        image={image}
        alt='product'
      />
    </Link>
  );
});

const Body = memo(({ id, title, desc }: BodyProps) => {
  return (
    <Link
      to={`/product/${id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant='h6' component='h2' noWrap>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {desc.substring(0, 100)}...
        </Typography>
      </CardContent>
    </Link>
  );
});

const Footer = memo(({ price, handleAddToCart }: FooterProps) => {
  return (
    <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
      <Typography variant='h5' component='p'>
        ${price}
      </Typography>
      <Button size='small' variant='contained' onClick={handleAddToCart}>
        Add To Cart
      </Button>
    </CardActions>
  );
});

const CardProduct = memo(({ product, handleAddToCart }: CardProductProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header id={product.id} image={product.image} />
      <Body id={product.id} title={product.title} desc={product.description} />
      <Footer
        price={product.price}
        handleAddToCart={() => handleAddToCart(product.id)}
      />
    </Card>
  );
});

export default CardProduct;
