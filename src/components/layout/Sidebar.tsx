import { NavLink } from "react-router-dom";
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

interface SidebarProps {
  onNavigate?: () => void;
}

export const Sidebar = ({ onNavigate }: SidebarProps) => {
  const { t } = useTranslation();
  
  const navItems = [
    { name: t('navigation.dashboard'), href: "/", icon: LayoutDashboard },
    { name: t('navigation.templates'), href: "/templates", icon: FileText },
    { name: t('navigation.createCampaign'), href: "/create-campaign", icon: PlusCircle },
    { name: t('navigation.campaigns'), href: "/campaigns", icon: Send },
    { name: t('navigation.contacts'), href: "/contacts", icon: Users },
    { name: t('navigation.automations'), href: "/automations", icon: Zap },
    { name: t('navigation.buyCredits'), href: "/buy-credits", icon: CreditCard, highlight: true },
    { name: t('navigation.settings'), href: "/settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-full lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:z-30">
      <div className="flex flex-col h-full">
        {/* Logo Section - only show on desktop sidebar */}
        <div className="hidden lg:flex p-6 border-b border-border items-center space-x-2">
          <MessageSquare className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">{t('app.name')}</span>
        </div>
        
        {/* Mobile Header */}
        <div className="lg:hidden p-6 border-b border-border">
          <h2 className="text-xl font-bold text-primary">{t('app.title')}</h2>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : item.highlight
                    ? "text-primary hover:bg-primary/10 border border-primary/20"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`
              }
              onClick={onNavigate}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};