import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSMSCredits } from "@/hooks/api/useCredits";

export const AppLayout = () => {
  const { data: smsCredits, isLoading: creditsLoading } = useSMSCredits();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header smsCredits={smsCredits || 0} creditsLoading={creditsLoading} />
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