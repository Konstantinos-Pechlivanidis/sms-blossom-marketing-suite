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
import { useAppSelector } from "@/store/hooks";
import { kpiData, recentCampaigns } from "@/data/mockData";

const Dashboard = () => {
  const smsCredits = useAppSelector((state) => state.sms.credits);

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
        {kpiData.map((kpi, index) => {
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
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentCampaigns campaigns={recentCampaigns} />
        <InsightsWidget smsCredits={smsCredits.toLocaleString()} />
      </div>
    </div>
  );
};

export default Dashboard;
