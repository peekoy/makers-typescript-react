import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import MuiButton from './components/Elements/Button';
import FormLogin from './components/Fragments/FormLogin';
import LoginPage from './pages/login';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/login' />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
