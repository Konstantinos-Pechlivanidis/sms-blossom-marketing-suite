import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Send, TrendingUp, Users, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { KPIData } from '@/types';
import { Badge } from '../ui/badge';

interface InsightsWidgetProps {
  data: KPIData[];
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Send':
      return Send;
    case 'TrendingUp':
      return TrendingUp;
    case 'Users':
      return Users;
    case 'Calendar':
      return Calendar;
    default:
      return null;
  }
};

export const InsightsWidget: React.FC<InsightsWidgetProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((kpi, index) => {
        const IconComponent = getIconComponent(kpi.icon);
        const iconBgColor =
          kpi.changeType === 'positive'
            ? 'bg-success/10'
            : kpi.changeType === 'negative'
            ? 'bg-destructive/10'
            : 'bg-muted/20';
        const valueColor =
          kpi.changeType === 'positive'
            ? 'text-success'
            : kpi.changeType === 'negative'
            ? 'text-destructive'
            : 'text-foreground';

        return (
          <Card
            key={index}
            className="rounded-3xl shadow-soft-sm border border-gray-200 dark:border-gray-800"
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn('p-2 rounded-full', iconBgColor)}>
                  {IconComponent && (
                    <IconComponent
                      className={cn('w-6 h-6', kpi.color)}
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t(`dashboard.kpi.${kpi.title.replace(/\s/g, '')}`)}
                  </p>
                  <p className={cn('text-2xl font-bold', valueColor)}>
                    {kpi.value}
                  </p>
                </div>
              </div>
              {kpi.change && (
                <Badge
                  variant="secondary"
                  className={cn(
                    'rounded-full px-2 py-1 text-xs font-medium',
                    kpi.changeType === 'positive' && 'bg-success/10 text-success',
                    kpi.changeType === 'negative' && 'bg-destructive/10 text-destructive'
                  )}
                >
                  {kpi.change}
                </Badge>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};