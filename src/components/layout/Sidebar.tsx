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
import { navItems } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/api/useUser";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Renders the main application sidebar with modern styling and enhanced responsiveness.
 * The sidebar dynamically adjusts its appearance based on the `state` (expanded/collapsed),
 * providing a polished user experience for both desktop and mobile views.
 */
export const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { state } = useSidebar();
  const { data: user, isLoading: userLoading } = useCurrentUser();

  const isActive = (href: string) => {
    // Correctly checks for the active route, handling the root path ("/") specially.
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <SidebarPrimitive
      className="border-r border-border"
      collapsible="icon" // Use "icon" for a space-saving collapsed state.
    >
      <SidebarHeader className="border-b border-border p-6">
        <div className="flex items-center space-x-2">
          {/* Logo is always visible. */}
          <MessageSquare className="h-8 w-8 text-primary flex-shrink-0" />
          {/* App name only appears when the sidebar is expanded. */}
          {state === "expanded" && (
            <span className="text-xl font-bold text-foreground">
              {t('app.name')}
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {/* Menu label is hidden in collapsed state for a cleaner look. */}
          {state === "expanded" && (
            <SidebarGroupLabel>{t('navigation.menu')}</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    // Custom styling for active and highlighted items.
                    className={cn({
                      "bg-sidebar-accent border border-sidebar-border text-sidebar-accent-foreground": isActive(item.href),
                      "bg-primary text-primary-foreground hover:bg-primary/90": item.highlight,
                    })}
                    // Tooltips provide crucial context for icons in the collapsed state.
                    tooltip={t(item.name)}
                  >
                    <NavLink to={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{t(item.name)}</span>
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
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {user?.name.split(' ').map(n => n[0]).join('') || 'U'}
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

          {/* Logout button adapts its size for collapsed state. */}
          <Button
            variant="ghost"
            size={state === "expanded" ? "default" : "icon"}
            className={cn("ml-auto", state === "collapsed" && "h-8 w-8")}
            onClick={() => {
              // TODO: Add actual logout logic here
            }}
          >
            <LogOut className="h-5 w-5" />
            {state === "expanded" && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarFooter>
    </SidebarPrimitive>
  );
};