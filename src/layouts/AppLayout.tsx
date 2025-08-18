import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useCurrentUser } from "@/hooks/api/useUser";
import { PageLoader } from "@/components/common/PageLoader";

/**
 * Main layout for the authenticated part of the application.
 * It provides the core structure and the Sidebar context.
 * It also handles the initial loading state for the user's session.
 */
export const AppLayout = () => {
  // We fetch the user here to ensure a valid session exists before rendering the UI.
  // This also warms up the cache for other components.
  const { isLoading: isUserLoading } = useCurrentUser();

  if (isUserLoading) {
    return <PageLoader />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/40">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto">
            <div className="w-full max-w-7xl mx-auto px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

// IMPORTANT: Ensure this is a default export to prevent import errors.
export default AppLayout;