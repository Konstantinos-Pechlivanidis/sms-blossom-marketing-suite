import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import uiSlice from './slices/uiSlice';
import smsSlice from './slices/smsSlice';
import createCampaignSlice from './slices/createCampaignSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    sms: smsSlice,
    createCampaign: createCampaignSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;