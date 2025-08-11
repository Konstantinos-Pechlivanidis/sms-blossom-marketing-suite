import axios from 'axios';
import { 
  kpiData, 
  recentCampaigns, 
  englishTemplates, 
  greekTemplates,
  creditPacks, 
  campaigns, 
  currentUser, 
  smsCredits 
} from '@/data/mock-data';

// Import all necessary types from the centralized types file.
import type { KPIData, Campaign, RecentCampaign, Template, CreditPack, User } from '@/types';

// Create axios instance
export const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Simulate API delay
const delay = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions that simulate backend calls
export const apiService = {
  // KPI Data
  async getKPIData(): Promise<KPIData[]> {
    await delay();
    return kpiData;
  },

  // Campaigns
  async getCampaigns(): Promise<Campaign[]> {
    await delay();
    return campaigns;
  },

  async getRecentCampaigns(): Promise<RecentCampaign[]> {
    await delay();
    return recentCampaigns;
  },

  async createCampaign(campaign: Omit<Campaign, 'id'>): Promise<Campaign> {
    await delay();
    // This is the correct implementation.
    // It combines the incoming `campaign` data with default values for all
    // required properties to ensure a complete Campaign object is returned.
    return {
      id: Date.now(),
      name: campaign.name || 'New Campaign',
      message: campaign.message || '',
      status: campaign.status || 'Draft',
      recipients: campaign.recipients || 0,
      conversions: campaign.conversions || 0,
      conversionRate: campaign.conversionRate || '0%',
      sent: campaign.sent || 'N/A',
      date: campaign.date || '',
      time: campaign.time || '',
    };
  },

  async updateCampaign(id: number, updates: Partial<Campaign>): Promise<Campaign> {
    await delay();
    const campaigns = await this.getCampaigns();
    const campaign = campaigns.find(c => c.id === id);
    if (!campaign) throw new Error('Campaign not found');
    return { ...campaign, ...updates };
  },

  async deleteCampaign(id: number): Promise<void> {
    await delay();
  },

  // Templates
  async getTemplates(language: string = 'en'): Promise<Template[]> {
    await delay();
    if (language === 'gr') {
      return greekTemplates;
    }
    return englishTemplates;
  },

  // Credit Packs
  async getCreditPacks(): Promise<CreditPack[]> {
    await delay();
    return creditPacks;
  },

  async purchaseCredits(packId: string): Promise<{ success: boolean; message: string }> {
    await delay();
    return { success: true, message: 'Credits purchased successfully!' };
  },

  // User
  async getCurrentUser(): Promise<User> {
    await delay();
    return currentUser;
  },

  async updateUser(updates: Partial<User>): Promise<User> {
    await delay();
    const mockCurrentUser = await this.getCurrentUser();
    return { ...mockCurrentUser, ...updates };
  },

  async updatePassword(data: { oldPassword: string; newPassword: string }): Promise<{ success: boolean }> {
    await delay();
    return { success: true };
  },

  // SMS Credits
  async getSMSCredits(): Promise<number> {
    await delay();
    return smsCredits;
  },

  async updateSMSCredits(newCredits: number): Promise<number> {
    await delay();
    return newCredits;
  }
};
