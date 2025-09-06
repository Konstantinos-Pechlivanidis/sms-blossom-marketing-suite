export interface User {
  id: string;
  name: string;
  email: string;
  businessName?: string;
  phone?: string;
  credits?: number;
}

export interface CreditPack {
  id: string;
  title: string;
  credits: number;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
  originalPrice?: string;
}

export interface KPIData {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
}

export type CampaignStatus = 'Draft' | 'Sent' | 'Scheduled' | 'Failed';

export interface Campaign {
  id: number;
  name: string;
  message: string;
  status: CampaignStatus;
  recipients: number;
  date: string;
  time: string;
  conversions: number;
  conversionRate: string;
  sent: string;
}

export interface RecentCampaign {
  name: string;
  sent: string;
  recipients: number;
  conversions: string;
  status: 'sent' | 'draft' | 'scheduled' | 'failed';
}

export interface Template {
  lang: 'en' | 'gr';
  id: string;
  name: string;
  category: 'Restaurants' | 'Gyms' | 'Fashion Stores' | 'Beauty' | 'Coffee Shops' | 'Sales' | 'Holidays' | 'Announcements' | 'Customer Care';
  preview: string;
  tags: string[];
  conversionRate?: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  gender: 'male' | 'female' | 'other';
  isVip: boolean;
  tags: string[];
  lastInteraction: string;
  conversions: number;
  joinDate: string;
  notes?: string;
}

export interface CustomView {
  id: string;
  name: string;
  filters: {
    gender?: 'male' | 'female' | 'other';
    isVip?: boolean;
    tags?: string[];
  };
}

export interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export interface StatusBadgeProps {
  status: string;
  className?: string;
}

export interface PasswordUpdatePayload {
  currentPassword: string;
  newPassword: string;
  oldPassword?: string; // For compatibility
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegistrationInfo {
  name: string;
  email: string;
  password: string;
  businessName?: string;
}