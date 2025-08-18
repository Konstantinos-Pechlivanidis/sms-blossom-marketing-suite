import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MessageSquare, LogOut } from "lucide-react";
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { navigationLinks } from "@/constants/navigation"; // Corrected import name
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCurrentUser, useLogout } from "@/hooks/api/useUser"; // Import useLogout
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice"; // Import logout action
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Renders the main application sidebar with modern styling and enhanced responsiveness.
 */
export const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { state } = useSidebar();
  const dispatch = useAppDispatch();

  const { data: user, isLoading: userLoading } = useCurrentUser();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        dispatch(logout());
        // User will be redirected to the login page via ProtectedRoute logic
      },
    });
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const userInitials = user?.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <SidebarPrimitive
      className="border-r border-border"
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-border p-6">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-8 w-8 text-primary flex-shrink-0" />
          {state === "expanded" && (
            <span className="text-xl font-bold text-foreground">
              {t('app.name')}
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {state === "expanded" && (
            <SidebarGroupLabel>{t('navigation.menu')}</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationLinks.map((item) => ( // Correctly use navigationLinks
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.to)}
                    className={cn({
                      "bg-primary/10 text-primary font-semibold": isActive(item.to),
                      "bg-primary text-primary-foreground hover:bg-primary/90": item.highlight,
                    })}
                    tooltip={t(item.label)}
                  >
                    <NavLink to={item.to}>
                      <item.icon className="h-5 w-5" />
                      <span>{t(item.label)}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          {userLoading ? (
            <>
              <Skeleton className="size-10 rounded-full" />
              {state === "expanded" && (
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              )}
            </>
          ) : (
            <>
              {state === "expanded" && (
                <>
                  <Avatar className="size-10">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium truncate">{user?.name}</span>
                    <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                  </div>
                </>
              )}
            </>
          )}

          <Button
            variant="ghost"
            size={state === "expanded" ? "default" : "icon"}
            className={cn("ml-auto text-muted-foreground hover:text-destructive", state === "collapsed" && "h-8 w-8")}
            onClick={handleLogout}
            disabled={logoutMutation.isPending} // Disable on click
          >
            <LogOut className="h-5 w-5" />
            {state === "expanded" && <span className="ml-2">{t('common.logout', 'Logout')}</span>}
          </Button>
        </div>
      </SidebarFooter>
    </SidebarPrimitive>
  );
};