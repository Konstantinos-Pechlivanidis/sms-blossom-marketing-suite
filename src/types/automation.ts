import { LucideIcon } from 'lucide-react';

export interface AutomationStats {
  sent: number;
  converted: number;
}

export interface Automation {
  id: number;
  title: string;
  description: string;
  trigger: string;
  message: string;
  active: boolean;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  stats: AutomationStats;
}

export interface EditAutomationData {
  message: string;
  aiMessage: string;
  useAiVersion: boolean;
  isRecurring: boolean;
  recurringDays: string[];
  recurringTime: string;
  recurringEndDate: string;
}

export interface WeekDay {
  id: string;
  label: string;
}