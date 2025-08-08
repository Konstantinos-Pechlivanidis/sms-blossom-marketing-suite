import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Send, 
  Users, 
  Settings, 
  Zap,
  MessageSquare,
  CreditCard
} from "lucide-react";
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { state } = useSidebar();
  
  const navItems = [
    { name: t('navigation.dashboard'), href: "/", icon: LayoutDashboard },
    { name: t('navigation.templates'), href: "/templates", icon: FileText },
    { name: t('navigation.createCampaign'), href: "/campaigns/create", icon: PlusCircle },
    { name: t('navigation.campaigns'), href: "/campaigns", icon: Send },
    { name: t('navigation.contacts'), href: "/contacts", icon: Users },
    { name: t('navigation.automations'), href: "/automations", icon: Zap },
    { name: t('navigation.buyCredits'), href: "/credits", icon: CreditCard, highlight: true },
    { name: t('navigation.settings'), href: "/settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <SidebarPrimitive className="border-r border-border">
      <SidebarHeader className="border-b border-border p-6">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-8 w-8 text-primary flex-shrink-0" />
          {state === "expanded" && (
            <span className="text-xl font-bold text-foreground">{t('app.name')}</span>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('navigation.menu')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.href)}
                    className={item.highlight ? "border border-primary/20" : ""}
                  >
                    <NavLink to={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarPrimitive>
  );
};