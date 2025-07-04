import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Container,
  Box,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import CardProduct from '../components/Fragments/CardProduct';
import { useProducts } from '../hooks/useProduct';
import type { RootState, AppDispatch } from '../redux/store';
import { logout } from '../redux/auth/authSlice';
import { useCartStore } from '../zustand/cartStore';

const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { data: products, isLoading, isError, error } = useProducts();
  const { user } = useSelector((state: RootState) => state.auth);
  const { cart, addToCart, deleteSingleCart, deleteAllCart } = useCartStore();

  const totalPrice = useMemo(() => {
    if (products && cart.length > 0) {
      return cart.reduce((acc, item) => {
        const product = products.find((p) => p.id === item.id);
        return acc + (product ? product.price * item.qty : 0);
      }, 0);
    }
    return 0;
  }, [cart, products]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  if (isLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity='error'>Error fetching products: {error.message}</Alert>
    );
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            My E-Commerce
          </Typography>
          <Typography sx={{ mr: 2 }}>Welcome, {user}</Typography>
          <Button color='inherit' onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant='h4' component='h1' gutterBottom>
              Products
            </Typography>
            <Grid container spacing={2}>
              {products?.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                  <CardProduct product={product} handleAddToCart={addToCart} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant='h4' component='h1' gutterBottom>
              Cart
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label='shopping cart table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align='right'>Qty</TableCell>
                    <TableCell align='right'>Total</TableCell>
                    <TableCell align='center'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.length > 0 ? (
                    cart.map((item) => {
                      const product = products?.find((p) => p.id === item.id);
                      if (!product) return null;
                      return (
                        <TableRow key={item.id}>
                          <TableCell component='th' scope='row'>
                            {product.title.substring(0, 20)}...
                          </TableCell>
                          <TableCell align='right'>{item.qty}</TableCell>
                          <TableCell align='right'>
                            ${(item.qty * product.price).toFixed(2)}
                          </TableCell>
                          <TableCell align='center'>
                            <IconButton
                              color='warning'
                              size='small'
                              onClick={() => deleteSingleCart(item.id)}
                            >
                              <DeleteIcon fontSize='small' />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align='center'>
                        Your cart is empty.
                      </TableCell>
                    </TableRow>
                  )}
                  {cart.length > 0 && (
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell colSpan={2}>
                        <Typography fontWeight='bold'>Total Price</Typography>
                      </TableCell>
                      <TableCell align='right'>
                        <Typography fontWeight='bold'>
                          ${totalPrice.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Button
                          variant='contained'
                          color='error'
                          size='small'
                          onClick={deleteAllCart}
                        >
                          Clear All
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductsPage;
