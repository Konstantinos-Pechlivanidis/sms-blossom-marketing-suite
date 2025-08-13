export interface User {
  id: string;
  name: string;
  email: string;
  businessName?: string;
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
  lang: 'en' | 'el';
  id: string;
  name: string;
  category: 'Sales' | 'Holidays' | 'Announcements' | 'Customer Care';
  preview: string;
  tags: string[];
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