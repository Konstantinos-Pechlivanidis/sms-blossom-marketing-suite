import { 
  Send, 
  TrendingUp, 
  Users, 
  Calendar,
  ArrowUpRight
} from "lucide-react";
import { StatsCard } from "@/components/common/StatsCard";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { RecentCampaigns } from "@/components/dashboard/RecentCampaigns";
import { InsightsWidget } from "@/components/dashboard/InsightsWidget";
import { Skeleton } from "@/components/ui/skeleton";
import { useKPIData } from "@/hooks/api/useKPIData";
import { useRecentCampaigns } from "@/hooks/api/useCampaigns";
import { useSMSCredits } from "@/hooks/api/useCredits";

const Dashboard = () => {
  const { data: kpiData, isLoading: kpiLoading } = useKPIData();
  const { data: recentCampaigns, isLoading: campaignsLoading } = useRecentCampaigns();
  const { data: smsCredits, isLoading: creditsLoading } = useSMSCredits();

  const iconMap = {
    Send,
    TrendingUp,
    Users,
    Calendar
  };

  return (
    <div className="space-y-6">
      <WelcomeSection />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiLoading ? (
          // Loading skeletons
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-32" />
          ))
        ) : (
          kpiData?.map((kpi, index) => {
            const IconComponent = iconMap[kpi.icon as keyof typeof iconMap];
            return (
              <StatsCard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                changeType={kpi.changeType}
                icon={IconComponent}
                iconColor={kpi.color}
              />
            );
          })
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {campaignsLoading ? (
          <Skeleton className="lg:col-span-2 h-64" />
        ) : (
          <RecentCampaigns campaigns={recentCampaigns || []} />
        )}
        
        {creditsLoading ? (
          <Skeleton className="h-64" />
        ) : (
          <InsightsWidget smsCredits={smsCredits?.toLocaleString() || '0'} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
