import axios from 'axios';
import { kpiData, recentCampaigns, templates, creditPacks, campaigns, currentUser, smsCredits } from '@/data/mock-data';

// Create axios instance
export const api = axios.create({
  baseURL: '/api', // This would be your actual API base URL
  timeout: 10000,
});

// Simulate API delay
const delay = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// API Types
export interface KPIData {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
}

export interface Campaign {
  id: number;
  name: string;
  status: 'Sent' | 'Scheduled' | 'Draft';
  sent?: string;
  recipients: number;
  conversions: number;
  conversionRate: string;
  message: string;
  date?: string;
  time?: string;
}

export interface Template {
  id: number;
  title: string;
  message: string;
  category: string;
  tags: string[];
}

export interface CreditPack {
  id: string;
  title: string;
  credits: number;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  originalPrice?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

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

  async getRecentCampaigns(): Promise<typeof recentCampaigns> {
    await delay();
    return recentCampaigns;
  },

  async createCampaign(campaign: Omit<Campaign, 'id'>): Promise<Campaign> {
    await delay();
    return { ...campaign, id: Date.now() };
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
    // In real implementation, this would delete from backend
  },

  // Templates
  async getTemplates(): Promise<Template[]> {
    await delay();
    return templates;
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
    const currentUser = await this.getCurrentUser();
    return { ...currentUser, ...updates };
  },

  async updatePassword(data: { oldPassword: string; newPassword: string }): Promise<{ success: boolean }> {
    await delay();
    // Simulate password update
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