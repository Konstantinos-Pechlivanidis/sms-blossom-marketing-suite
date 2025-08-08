import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

interface HeaderProps {
  smsCredits: number;
  creditsLoading: boolean;
}

export const Header = ({ smsCredits, creditsLoading }: HeaderProps) => {
  const { t } = useTranslation();

  return (
    <header className="bg-card border-b border-border px-4 py-3 md:px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="lg:hidden" />

        {/* SMS Credits Display */}
        <div className="hidden sm:flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-primary">{t('header.smsCredits')}:</span>
          {creditsLoading ? (
            <Skeleton className="h-4 w-12 bg-primary/20" />
          ) : (
            <span className="text-sm font-bold text-foreground">{smsCredits.toLocaleString()}</span>
          )}
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