import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Send, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RecentCampaign } from '@/types';
import { StatusBadge } from '@/components/common/StatusBadge';

interface RecentCampaignsProps {
  campaigns: RecentCampaign[];
}

export const RecentCampaigns: React.FC<RecentCampaignsProps> = ({ campaigns }) => {
  const { t } = useTranslation();

  return (
    <Card className="rounded-3xl shadow-soft-lg border border-gray-200 dark:border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-foreground">
          {t('dashboard.recentCampaigns')}
        </CardTitle>
        <Button variant="ghost" size="sm" className="rounded-full">
          {t('common.viewAll')}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardHeader>
      <CardContent>
        {campaigns.map((campaign, index) => (
          <div
            key={index}
            className={cn(
              'flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl transition-colors duration-200 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-800',
              index < campaigns.length - 1 && 'border-b border-gray-200 dark:border-gray-800'
            )}
          >
            <div className="flex-1 flex items-center gap-4">
              <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
                <Send className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-base text-foreground">{campaign.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{campaign.conversions} {t('campaigns.conversions')}</span>
                  </span>
                  <span>•</span>
                  <span>{t(`campaigns.status.${campaign.status}`)}</span>
                </div>
              </div>
            </div>
            <StatusBadge status={campaign.status} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};