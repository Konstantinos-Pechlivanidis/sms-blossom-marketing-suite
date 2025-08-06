
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import CreateCampaign from "./pages/CreateCampaign";
import Campaigns from "./pages/Campaigns";
import Automations from "./pages/Automations";
import Settings from "./pages/Settings";
import Contacts from "./pages/Contacts";
import BuyCredits from "./pages/BuyCredits";
import QRScan from "./pages/QRScan";
import Unsubscribe from "./pages/Unsubscribe";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes - no layout wrapper */}
          <Route path="/scan/:trackingId" element={<QRScan />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          
          {/* Protected routes with layout */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="templates" element={<Templates />} />
            <Route path="create-campaign" element={<CreateCampaign />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="automations" element={<Automations />} />
            <Route path="buy-credits" element={<BuyCredits />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
