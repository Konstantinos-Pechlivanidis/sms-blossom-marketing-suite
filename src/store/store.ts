import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import uiSlice from './slices/uiSlice';
import smsSlice from './slices/smsSlice';
import campaignSlice from './slices/campaignSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    sms: smsSlice,
    campaigns: campaignSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;