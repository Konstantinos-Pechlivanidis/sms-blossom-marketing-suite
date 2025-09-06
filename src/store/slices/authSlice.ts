import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: true, // Default to true for demo
  loading: false,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.token = action.payload.token;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.token = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError
} = authSlice.actions;

export default authSlice.reducer;