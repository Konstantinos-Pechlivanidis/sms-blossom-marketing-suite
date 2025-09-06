// src/pages/Dashboard.tsx
import React from 'react';
import { InsightsWidget } from '@/components/dashboard/InsightsWidget';
import { RecentCampaigns } from '@/components/dashboard/RecentCampaigns';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { useKPIData } from '@/hooks/api/useKPIData';
import { useRecentCampaigns } from '@/hooks/api/useCampaigns';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/common/ErrorState';

const Dashboard = () => {
  const { data: kpiData, isLoading: kpiLoading, isError: kpiError, refetch: refetchKPI } = useKPIData();
  const { data: recentCampaigns, isLoading: campaignsLoading, isError: campaignsError, refetch: refetchCampaigns } = useRecentCampaigns();

  return (
    <div className="flex-1 space-y-6">
      <WelcomeSection />
      
      {kpiLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-3xl" />)}
        </div>
      ) : kpiError ? (
        <ErrorState onRetry={refetchKPI} title="Failed to load insights" />
      ) : (
        kpiData && <InsightsWidget data={kpiData} />
      )}
      
      {campaignsLoading ? (
        <Skeleton className="h-72 rounded-3xl" />
      ) : campaignsError ? (
        <ErrorState onRetry={refetchCampaigns} title="Failed to load recent campaigns" />
      ) : (
        recentCampaigns && <RecentCampaigns campaigns={recentCampaigns} />
      )}
    </div>
  );
};

export default Dashboard;