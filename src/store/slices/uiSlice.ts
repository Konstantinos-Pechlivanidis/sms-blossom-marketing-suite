import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  loading: {
    campaigns: boolean;
    templates: boolean;
    credits: boolean;
    settings: boolean;
  };
  activeFilters: {
    campaignStatus: string;
    templateCategory: string;
  };
  searchTerms: {
    campaigns: string;
    templates: string;
  };
}

const initialState: UiState = {
  sidebarOpen: false,
  loading: {
    campaigns: false,
    templates: false,
    credits: false,
    settings: false,
  },
  activeFilters: {
    campaignStatus: 'All',
    templateCategory: 'All',
  },
  searchTerms: {
    campaigns: '',
    templates: '',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setLoading: (state, action: PayloadAction<{ section: keyof UiState['loading']; loading: boolean }>) => {
      state.loading[action.payload.section] = action.payload.loading;
    },
    setFilter: (state, action: PayloadAction<{ type: keyof UiState['activeFilters']; value: string }>) => {
      state.activeFilters[action.payload.type] = action.payload.value;
    },
    setSearchTerm: (state, action: PayloadAction<{ type: keyof UiState['searchTerms']; term: string }>) => {
      state.searchTerms[action.payload.type] = action.payload.term;
    },
    resetFilters: (state) => {
      state.activeFilters = initialState.activeFilters;
      state.searchTerms = initialState.searchTerms;
    }
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setLoading,
  setFilter,
  setSearchTerm,
  resetFilters
} = uiSlice.actions;

export default uiSlice.reducer;