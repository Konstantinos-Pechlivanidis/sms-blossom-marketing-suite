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

interface CampaignState {
  campaigns: Campaign[];
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

const initialState: CampaignState = {
  campaigns: [
    {
      id: 1,
      name: "Weekend Flash Sale",
      status: "Sent",
      date: "2024-01-15",
      time: "10:30 AM",
      recipients: 1247,
      conversions: 23,
      conversionRate: "18.4%",
      message: "🎉 FLASH SALE! 50% off everything this weekend only!"
    },
    {
      id: 2,
      name: "New Arrivals Alert",
      status: "Scheduled",
      date: "2024-01-16",
      time: "9:00 AM",
      recipients: 2108,
      conversions: 0,
      conversionRate: "0%",
      message: "✨ New arrivals just dropped! Check out our latest collection"
    },
    {
      id: 3,
      name: "Birthday Rewards",
      status: "Sent",
      date: "2024-01-14",
      time: "2:15 PM",
      recipients: 89,
      conversions: 12,
      conversionRate: "13.5%",
      message: "🎂 Happy Birthday! Enjoy 30% off as our gift to you!"
    },
    {
      id: 4,
      name: "Loyalty Program Update",
      status: "Draft",
      date: "",
      time: "",
      recipients: 284,
      conversions: 0,
      conversionRate: "0%",
      message: "💎 You're now a VIP member! Enjoy exclusive benefits"
    },
    {
      id: 5,
      name: "Back in Stock",
      status: "Sent",
      date: "2024-01-13",
      time: "11:45 AM",
      recipients: 156,
      conversions: 8,
      conversionRate: "5.1%",
      message: "📦 Good news! Your favorite item is back in stock"
    },
    {
      id: 6,
      name: "Winter Collection",
      status: "Scheduled",
      date: "2024-01-18",
      time: "3:00 PM",
      recipients: 1890,
      conversions: 0,
      conversionRate: "0%",
      message: "❄️ Winter Collection: Stay warm and stylish! 40% off"
    }
  ],
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

const campaignSlice = createSlice({
  name: 'campaigns',
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
    addCampaign: (state, action: PayloadAction<Campaign>) => {
      state.campaigns.unshift(action.payload);
    },
    updateCampaign: (state, action: PayloadAction<{ id: number; updates: Partial<Campaign> }>) => {
      const index = state.campaigns.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.campaigns[index] = { ...state.campaigns[index], ...action.payload.updates };
      }
    },
    deleteCampaign: (state, action: PayloadAction<number>) => {
      state.campaigns = state.campaigns.filter(c => c.id !== action.payload);
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
    }
  },
});

export const {
  setCampaignData,
  setCurrentStep,
  resetCampaignForm,
  loadTemplate,
  addCampaign,
  updateCampaign,
  deleteCampaign,
  setLoading,
  setError,
  setRecurringDays,
  generateAiMessage
} = campaignSlice.actions;

export default campaignSlice.reducer;