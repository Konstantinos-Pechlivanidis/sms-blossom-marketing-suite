
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Send, 
  Users, 
  User
} from "lucide-react";

const MobileNav = () => {
  const navItems = [
    { name: "Home", href: "/", icon: LayoutDashboard },
    { name: "Templates", href: "/templates", icon: FileText },
    { name: "Campaigns", href: "/campaigns", icon: Send },
    { name: "Contacts", href: "/contacts", icon: Users },
    { name: "Profile", href: "/settings", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center px-3 py-2 rounded-lg text-xs font-medium transition-colors min-h-[60px] ${
                isActive
                  ? "text-[#81D8D0] bg-[#81D8D0]/10"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span className="text-xs">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
