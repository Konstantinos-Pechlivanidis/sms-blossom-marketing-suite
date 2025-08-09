import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SmsState {
  loading: boolean;
  error: string | null;
}

const initialState: SmsState = {
  loading: false,
  error: null,
};

const smsSlice = createSlice({
  name: 'sms',
  initialState,
  reducers: {
    setSmsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSmsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const {
  setSmsLoading,
  setSmsError,
  clearError
} = smsSlice.actions;

export default smsSlice.reducer;