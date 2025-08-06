import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Header - hidden on mobile */}
      <div className="hidden lg:block">
        <Header />
      </div>
      
      <div className="flex min-h-screen">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        {/* Main Content Area */}
        <main className="flex-1 w-full lg:ml-64">
          {/* Mobile Header - visible only on mobile */}
          <div className="lg:hidden">
            <Header />
          </div>
          
          {/* Content Container */}
          <div className="w-full max-w-7xl mx-auto px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
            <div className="mb-20 lg:mb-0">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation - visible only on mobile */}
      <div className="lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
};