import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SmsState {
  credits: number;
  loading: boolean;
  error: string | null;
  packages: {
    id: string;
    title: string;
    credits: number;
    price: string;
    description: string;
    features: string[];
    popular: boolean;
    originalPrice?: string;
  }[];
}

const initialState: SmsState = {
  credits: 2847,
  loading: false,
  error: null,
  packages: [
    {
      id: '1',
      title: 'Starter Pack',
      credits: 100,
      price: '€3.99',
      description: 'Perfect for small businesses',
      features: ['100 SMS Credits', 'Basic Analytics', 'Email Support'],
      popular: false,
    },
    {
      id: '2',
      title: 'Business Pack',
      credits: 500,
      price: '€14.99',
      originalPrice: '€19.99',
      description: 'Most popular choice',
      features: ['500 SMS Credits', 'Advanced Analytics', 'Priority Support', 'Custom Templates'],
      popular: true,
    },
    {
      id: '3',
      title: 'Pro Pack',
      credits: 1000,
      price: '€27.99',
      originalPrice: '€34.99',
      description: 'For high-volume campaigns',
      features: ['1000 SMS Credits', 'Full Analytics Suite', '24/7 Support', 'API Access'],
      popular: false,
    },
  ],
};

const smsSlice = createSlice({
  name: 'sms',
  initialState,
  reducers: {
    setCredits: (state, action: PayloadAction<number>) => {
      state.credits = action.payload;
    },
    addCredits: (state, action: PayloadAction<number>) => {
      state.credits += action.payload;
    },
    deductCredits: (state, action: PayloadAction<number>) => {
      state.credits = Math.max(0, state.credits - action.payload);
    },
    purchaseCreditsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    purchaseCreditsSuccess: (state, action: PayloadAction<number>) => {
      state.credits += action.payload;
      state.loading = false;
      state.error = null;
    },
    purchaseCreditsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const {
  setCredits,
  addCredits,
  deductCredits,
  purchaseCreditsStart,
  purchaseCreditsSuccess,
  purchaseCreditsFailure,
  clearError
} = smsSlice.actions;

export default smsSlice.reducer;