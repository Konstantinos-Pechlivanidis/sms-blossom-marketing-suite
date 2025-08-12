// src/components/dashboard/RecentCampaigns.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Send, Users, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RecentCampaign } from '@/types';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Link } from 'react-router-dom';

interface RecentCampaignsProps {
  campaigns: RecentCampaign[];
}

export const RecentCampaigns: React.FC<RecentCampaignsProps> = ({ campaigns }) => {
  const { t } = useTranslation();

  return (
    <Card className="rounded-3xl shadow-soft-lg border-0">
      <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
        <CardTitle className="text-2xl font-bold text-foreground">
          {t('dashboard.recentCampaigns')}
        </CardTitle>
        <Button asChild variant="ghost" size="sm" className="rounded-full text-primary hover:bg-primary/10">
          <Link to="/campaigns">
            {t('common.viewAll')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <div className="space-y-2">
          {campaigns.map((campaign) => (
            <div
              key={campaign.name}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-2xl transition-all duration-200 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
            >
              {/* Campaign Info */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                  <Send className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-base text-foreground truncate">{campaign.name}</p>
                  <p className="text-sm text-muted-foreground">{campaign.sent}</p>
                </div>
              </div>

              {/* Stats & Status */}
              <div className="flex items-center gap-4 mt-3 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{campaign.recipients.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-success font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>{campaign.conversions}</span>
                  </div>
                </div>
                <StatusBadge status={campaign.status} className="w-24 text-center justify-center" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};