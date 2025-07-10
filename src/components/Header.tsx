
import { Bell, MessageSquare, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 py-3 md:px-6 relative z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-[#81D8D0]" />
              <span className="text-xl font-bold text-gray-900 hidden sm:block">SMSify</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* SMS Credits - hidden on small mobile */}
            <div className="hidden sm:flex items-center space-x-2 bg-[#81D8D0]/10 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-[#81D8D0]">SMS Credits:</span>
              <span className="text-sm font-bold text-gray-900">2,847</span>
            </div>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
            </Button>
            
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white z-50">
            <Sidebar onNavigate={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
