import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSMSCredits } from "@/hooks/api/useCredits";

export const Header = () => {
  const { t } = useTranslation();
  const { data: smsCredits } = useSMSCredits();
  const creditsDisplay = (smsCredits as any)?.credits || 2847;

  return (
    <header className="bg-card border-b border-border px-4 py-3 md:px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="lg:hidden" />
        
        {/* SMS Credits - hidden on small mobile */}
        <div className="hidden sm:flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-primary">{t('header.smsCredits')}:</span>
          <span className="text-sm font-bold text-foreground">{creditsDisplay.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        <LanguageSwitcher />
        
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center">3</span>
        </Button>
        
        <Button variant="ghost" size="sm">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};