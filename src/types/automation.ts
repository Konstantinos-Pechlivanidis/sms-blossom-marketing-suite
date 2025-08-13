// src/types/automations.ts
import { LucideIcon } from 'lucide-react';

export interface AutomationStats {
  sent: number;
  converted: number;
}

export interface Automation {
  id: string; // Changed to string for better compatibility with i18next keys
  title: string;
  description: string;
  trigger: string;
  message: string;
  active: boolean;
  icon: string; // The name of the icon component as a string
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