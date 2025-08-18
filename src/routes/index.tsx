import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import AppLayout from "@/layouts/AppLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { PublicLayout } from "@/layouts/PublicLayout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { PageLoader } from "@/components";

// Pages
import Dashboard from "@/pages/Dashboard";
import Templates from "@/pages/Templates";
import CreateCampaign from "@/pages/CreateCampaign";
import Campaigns from "@/pages/Campaigns";
import Contacts from "@/pages/Contacts";
import Automations from "@/pages/Automations";
import BuyCredits from "@/pages/BuyCredits";
import Settings from "@/pages/Settings";
import QRScan from "@/pages/QRScan";
import Unsubscribe from "@/pages/Unsubscribe";
import NotFound from "@/pages/NotFound";

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/scan/:trackingId" element={<PublicLayout><QRScan /></PublicLayout>} />
        <Route path="/unsubscribe" element={<PublicLayout><Unsubscribe /></PublicLayout>} />
        
        {/* TODO: Add Auth Routes for Login/Register here */}
        {/*
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        */}

        {/* Protected Routes with App Layout */}
        <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="templates" element={<Templates />} />
          <Route path="campaigns">
            <Route index element={<Campaigns />} />
            <Route path="create" element={<CreateCampaign />} />
          </Route>
          <Route path="contacts" element={<Contacts />} />
          <Route path="automations" element={<Automations />} />
          <Route path="credits" element={<BuyCredits />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};