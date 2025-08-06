import { NavLink } from "react-router-dom";
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
  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Templates", href: "/templates", icon: FileText },
    { name: "Create Campaign", href: "/create-campaign", icon: PlusCircle },
    { name: "Campaigns", href: "/campaigns", icon: Send },
    { name: "Contacts", href: "/contacts", icon: Users },
    { name: "Automations", href: "/automations", icon: Zap },
    { name: "Buy Credits", href: "/buy-credits", icon: CreditCard, highlight: true },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-full lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:z-30">
      <div className="flex flex-col h-full">
        {/* Logo Section - only show on desktop sidebar */}
        <div className="hidden lg:flex p-6 border-b border-border items-center space-x-2">
          <MessageSquare className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">SMSify</span>
        </div>
        
        {/* Mobile Header */}
        <div className="lg:hidden p-6 border-b border-border">
          <h2 className="text-xl font-bold text-primary">SMS Marketing</h2>
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