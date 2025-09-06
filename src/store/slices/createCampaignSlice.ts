import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Campaign {
  id: number;
  name: string;
  status: 'Sent' | 'Scheduled' | 'Draft';
  date: string;
  time: string;
  recipients: number;
  conversions: number;
  conversionRate: string;
  message: string;
}

interface CampaignFormData {
  name: string;
  category: string;
  audience: string;
  message: string;
  aiMessage: string;
  useAiVersion: boolean;
  scheduleType: string;
  scheduleDate: string;
  scheduleTime: string;
  isRecurring: boolean;
  recurringDays: string[];
  recurringEndDate: string;
}

interface CreateCampaignState {
  currentCampaign: CampaignFormData;
  currentStep: number;
  loading: boolean;
  error: string | null;
  audienceCounts: {
    all: number;
    women: number;
    men: number;
    vip: number;
    new: number;
    inactive: number;
  };
}

const initialCampaignData: CampaignFormData = {
  name: "",
  category: "",
  audience: "",
  message: "",
  aiMessage: "",
  useAiVersion: false,
  scheduleType: "now",
  scheduleDate: "",
  scheduleTime: "",
  isRecurring: false,
  recurringDays: [],
  recurringEndDate: ""
};

const initialState: CreateCampaignState = {
  currentCampaign: initialCampaignData,
  currentStep: 1,
  loading: false,
  error: null,
  audienceCounts: {
    all: 2847,
    women: 1623,
    men: 1224,
    vip: 284,
    new: 156,
    inactive: 89
  }
};

const createCampaignSlice = createSlice({
  name: 'createCampaign',
  initialState,
  reducers: {
    setCampaignData: (state, action: PayloadAction<Partial<CampaignFormData>>) => {
      state.currentCampaign = { ...state.currentCampaign, ...action.payload };
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    resetCampaignForm: (state) => {
      state.currentCampaign = initialCampaignData;
      state.currentStep = 1;
    },
    loadTemplate: (state, action: PayloadAction<{ name: string; category: string; message: string }>) => {
      state.currentCampaign.name = action.payload.name;
      state.currentCampaign.category = action.payload.category;
      state.currentCampaign.message = action.payload.message;
      state.currentStep = 2;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setRecurringDays: (state, action: PayloadAction<string[]>) => {
      state.currentCampaign.recurringDays = action.payload;
    },
    generateAiMessage: (state, action: PayloadAction<string>) => {
      state.currentCampaign.aiMessage = action.payload;
    },
    setCampaignFromTemplate: (state, action: PayloadAction<{ name: string; message: string }>) => {
      state.currentCampaign.name = action.payload.name;
      state.currentCampaign.message = action.payload.message;
    },
    updateCurrentCampaign: (state, action: PayloadAction<Partial<Campaign>>) => {
      state.currentCampaign = { ...state.currentCampaign, ...action.payload };
    },
    resetCurrentCampaign: (state) => {
      state.currentCampaign = initialState.currentCampaign;
    },
  },
});

export const {
  setCampaignData,
  setCurrentStep,
  resetCampaignForm,
  loadTemplate,
  setLoading,
  setError,
  setRecurringDays,
  generateAiMessage
} = createCampaignSlice.actions;

export default createCampaignSlice.reducer;