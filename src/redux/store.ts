// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
// import cartReducer from './cart/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // cart: cartReducer,
  },
});

// 1. Dapatkan tipe RootState dari store itu sendiri
export type RootState = ReturnType<typeof store.getState>;

// 2. Dapatkan tipe AppDispatch
export type AppDispatch = typeof store.dispatch;
