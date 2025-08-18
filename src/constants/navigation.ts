import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  CreditCard,
  Send,
  Users,
  Settings,
  Zap,
  LucideIcon,
} from "lucide-react";

/**
 * Type definition for a single navigation item.
 */
export type NavItem = {
  label: string; // The translation key for the display name.
  to: string; // The destination route.
  icon: LucideIcon; // The Lucide icon component.
  highlight?: boolean; // Optional flag to visually highlight the item.
};

/**
 * Centralized array of navigation links used throughout the application,
 * primarily by the Sidebar component.
 */
export const navigationLinks: NavItem[] = [
  { label: "navigation.dashboard", to: "/", icon: LayoutDashboard },
  { label: "navigation.templates", to: "/templates", icon: FileText },
  { label: "navigation.createCampaign", to: "/campaigns/create", icon: PlusCircle },
  { label: "navigation.campaigns", to: "/campaigns", icon: Send },
  { label: "navigation.contacts", to: "/contacts", icon: Users },
  { label: "navigation.automations", to: "/automations", icon: Zap },
  { label: "navigation.buyCredits", to: "/buy-credits", icon: CreditCard, highlight: true }, // Corrected route
  { label: "navigation.settings", to: "/settings", icon: Settings },
];