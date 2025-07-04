import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth='md'>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h1'>404</Typography>
          <Typography variant='h6' sx={{ mb: 2 }}>
            Halaman yang Anda cari tidak ditemukan.
          </Typography>
          <Typography variant='body1' sx={{ mb: 4 }}>
            Maaf, kami tidak dapat menemukan halaman yang Anda cari. Mungkin
            halaman tersebut telah dihapus atau Anda salah memasukkan URL.
          </Typography>
          <Button component={Link} to='/' variant='contained' color='primary'>
            Kembali ke Beranda
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ErrorPage;
