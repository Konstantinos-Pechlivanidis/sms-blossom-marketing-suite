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
 * This ensures consistency and type safety across the application.
 */
export type NavItem = {
  name: string; // The translation key for the display name.
  href: string; // The destination route.
  icon: LucideIcon; // The Lucide icon component.
  highlight?: boolean; // Optional flag to visually highlight the item.
};

/**
 * Centralized array of navigation items used by the Sidebar component.
 * Storing this data here decouples the component logic from the application's
 * navigation structure, making it easier to add, remove, or reorder links.
 */
export const navItems: NavItem[] = [
  { name: "navigation.dashboard", href: "/", icon: LayoutDashboard },
  { name: "navigation.templates", href: "/templates", icon: FileText },
  { name: "navigation.createCampaign", href: "/campaigns/create", icon: PlusCircle },
  { name: "navigation.campaigns", href: "/campaigns", icon: Send },
  { name: "navigation.contacts", href: "/contacts", icon: Users },
  { name: "navigation.automations", href: "/automations", icon: Zap },
  { name: "navigation.buyCredits", href: "/credits", icon: CreditCard, highlight: true },
  { name: "navigation.settings", href: "/settings", icon: Settings },
];
