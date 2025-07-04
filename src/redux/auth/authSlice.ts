// src/redux/auth/authSlice.ts

import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import {
  login as loginService,
  getUsername,
} from '../../services/auth.service';

interface LoginData {
  username?: string;
  password?: string;
}

interface AuthState {
  user: string | null;
  loading: boolean;
  error: string | null;
}

export const loginUser = createAsyncThunk<
  string,
  LoginData,
  { rejectValue: string }
>('auth/login', async (data, { rejectWithValue }) => {
  try {
    const token = await loginService(data);
    localStorage.setItem('token', token);
    return getUsername(token);
  } catch (error: any) {
    const errorMessage = error.response?.data || 'Invalid credentials';
    return rejectWithValue(errorMessage);
  }
});

const token = localStorage.getItem('token');
let initialUser: string | null = null;
if (token) {
  try {
    initialUser = getUsername(token);
  } catch (e) {
    localStorage.removeItem('token');
  }
}

const initialState: AuthState = {
  user: initialUser,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message || 'An unknown error occurred';
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
