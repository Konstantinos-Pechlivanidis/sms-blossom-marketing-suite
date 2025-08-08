// Global Type Definitions
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Campaign {
  id: number;
  name: string;
  status: 'sent' | 'scheduled' | 'draft' | 'failed';
  date: string;
  recipients: number;
  conversions: number;
  sent: string;
}

export interface RecentCampaign {
  name: string;
  status: 'sent' | 'scheduled' | 'draft' | 'failed';
  sent: string;
  recipients: number;
  conversions: number;
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

export interface KPIData {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
}

export type StatusType = 'sent' | 'scheduled' | 'draft' | 'failed' | 'active' | 'inactive';

export interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
  className?: string;
}