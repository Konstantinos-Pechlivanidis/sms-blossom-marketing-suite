import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  LayoutDashboard, 
  FileText, 
  Send, 
  Users, 
  User,
  CreditCard
} from "lucide-react";

export const MobileNav = () => {
  const { t } = useTranslation();
  
  const navItems = [
    { name: t('navigation.home'), href: "/", icon: LayoutDashboard },
    { name: t('navigation.templates'), href: "/templates", icon: FileText },
    { name: t('navigation.campaigns'), href: "/campaigns", icon: Send },
    { name: t('navigation.credits'), href: "/buy-credits", icon: CreditCard, highlight: true },
    { name: t('navigation.profile'), href: "/settings", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center px-3 py-2 rounded-lg text-xs font-medium transition-colors min-h-[60px] ${
                isActive
                  ? "text-primary bg-primary/10"
                  : item.highlight
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span className="text-xs">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};