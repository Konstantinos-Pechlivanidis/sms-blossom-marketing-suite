import { Bell, User, MessageSquare, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/api/useUser";
import { useSMSCredits } from "@/hooks/api/useCredits";
import { Link } from "react-router-dom";

/**
 * Renders the main application header.
 * The header includes the logo, SMS credits display, notifications,
 * and a user profile dropdown, all designed to be fully responsive.
 */
export const Header = () => {
  const { t } = useTranslation();
  const { data: user } = useCurrentUser();
  const { data: smsCredits, isLoading: creditsLoading } = useSMSCredits();

  return (
    <header className="bg-card border-b border-border px-4 py-3 md:px-6 flex items-center justify-between shadow-sm">
      {/* Left side: Logo/Sidebar Toggle and Credits */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Sidebar trigger is only visible on large screens when the sidebar is collapsed */}
        <SidebarTrigger className="lg:hidden" />
        
        {/* App name/logo on mobile */}
        <div className="md:hidden flex items-center space-x-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">{t('app.name')}</span>
        </div>

        {/* SMS Credits Display. It's more prominent now and responsive. */}
        <div className="hidden sm:flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          <span className="text-sm font-medium text-primary/80">{t('header.smsCredits')}:</span>
          {creditsLoading ? (
            <Skeleton className="h-4 w-12 bg-primary/20" />
          ) : (
            <span className="text-sm font-bold text-foreground">
              {smsCredits?.toLocaleString() || '0'}
            </span>
          )}
        </div>
      </div>

      {/* Right side: Language, Notifications, User Menu */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <LanguageSwitcher />

        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-5 w-5" />
          {/* Notification badge */}
          <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full" />
        </Button>

        {/* User Profile Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-border">
              <Avatar className="h-8 w-8">
                {/* Fallback with user's initials */}
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {user?.name.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {user ? (
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              ) : (
                <Skeleton className="h-4 w-32" />
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>{t('navigation.profile')}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>{t('navigation.settings')}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {/* handle logout */}}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};