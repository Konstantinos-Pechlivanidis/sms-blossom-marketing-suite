import { LucideIcon } from 'lucide-react';

export interface AutomationStats {
  sent: number;
  converted: number;
}

export interface Automation {
  lang: 'en' | 'el';         // Γλώσσα του προτύπου
  id: string;                // Μοναδικό ID αυτοματισμού
  storeOwnerId: string;      // ID του ιδιοκτήτη καταστήματος ( έτοιμο για το DB)
  title: string;
  description: string;
  trigger: string;
  runTime?: string;           // Προαιρετικό πεδίο για την ώρα εκτέλεσης (π.χ. "3:00 PM")
  message: string;
  active: boolean;
  icon: string;
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