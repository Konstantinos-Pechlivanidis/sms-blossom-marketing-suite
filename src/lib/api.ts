import axios from 'axios';
import { kpiData, recentCampaigns, templates, creditPacks } from '@/data/mockData';

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
  category: string;
  conversionRate: string;
  message: string;
  testimonial: string;
  rating: number;
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
    // Transform recent campaigns to full campaign format
    const campaigns: Campaign[] = [
      {
        id: 1,
        name: "Weekend Special - 30% Off",
        status: "Sent",
        sent: "2 hours ago",
        recipients: 1247,
        conversions: 23,
        conversionRate: "1.8%",
        message: "🎉 Weekend Special! Get 30% off all items. Use code WEEKEND30. Limited time offer!",
        date: "2024-01-15",
        time: "10:30 AM"
      },
      {
        id: 2,
        name: "New Arrivals Alert",
        status: "Scheduled",
        sent: "Tomorrow 9:00 AM",
        recipients: 2108,
        conversions: 0,
        conversionRate: "0%",
        message: "🆕 New arrivals are here! Check out our latest collection. Shop now for early bird discounts!",
        date: "2024-01-16",
        time: "09:00 AM"
      },
      {
        id: 3,
        name: "Birthday Rewards",
        status: "Sent",
        sent: "Yesterday",
        recipients: 89,
        conversions: 12,
        conversionRate: "13.5%",
        message: "🎂 Happy Birthday! Enjoy a special 25% discount as our gift to you. Code: BIRTHDAY25",
        date: "2024-01-14",
        time: "02:00 PM"
      },
      {
        id: 4,
        name: "Flash Sale Alert",
        status: "Draft",
        recipients: 0,
        conversions: 0,
        conversionRate: "0%",
        message: "⚡ FLASH SALE! 50% off everything for the next 2 hours only! Don't miss out!"
      }
    ];
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
    return {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900'
    };
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
    return 2847;
  },

  async updateSMSCredits(newCredits: number): Promise<number> {
    await delay();
    return newCredits;
  }
};