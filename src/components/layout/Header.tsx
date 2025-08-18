import { Bell, User, MessageSquare, LogOut, Settings, Wallet } from "lucide-react";
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
import { useCurrentUser, useLogout } from "@/hooks/api/useUser";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

/**
 * Renders the main application header.
 * The header is self-contained and fetches its own data.
 */
export const Header = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  
  // This component now fetches its own user data.
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        dispatch(logout());
      },
    });
  };
  
  const userInitials = user?.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <header className="bg-card border-b border-border px-4 py-3 md:px-6 flex items-center justify-between shadow-soft-sm sticky top-0 z-40">
      {/* Left side */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <SidebarTrigger className="lg:hidden" />
        
        <div className="md:hidden flex items-center space-x-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">{t('app.name')}</span>
        </div>

        <Link to="/buy-credits" className="hidden sm:flex items-center space-x-2 bg-muted/50 hover:bg-muted px-3 py-1.5 rounded-full border border-border transition-colors cursor-pointer">
          <Wallet className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">{t('header.smsCredits')}:</span>
          {isUserLoading ? (
            <Skeleton className="h-5 w-12" />
          ) : (
            <span className="text-sm font-bold text-foreground">
              {user?.credits?.toLocaleString() ?? '0'}
            </span>
          )}
        </Link>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-2 md:space-x-3">
        <LanguageSwitcher />

        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full border-2 border-card" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                  {isUserLoading ? <Skeleton className="h-full w-full rounded-full" /> : userInitials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-soft-xl">
            <DropdownMenuLabel>
              {isUserLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>
              ) : (
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
              <Link to="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>{t('navigation.settings')}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer rounded-lg">
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t('common.logout', 'Logout')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};