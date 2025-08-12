// src/components/dashboard/InsightsWidget.tsx
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
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-4 px-2">Insights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((kpi, index) => {
          const IconComponent = getIconComponent(kpi.icon);
          const iconBgColor =
            kpi.changeType === 'positive'
              ? 'bg-success/10'
              : kpi.changeType === 'negative'
              ? 'bg-destructive/10'
              : 'bg-muted';
          const changeColor =
            kpi.changeType === 'positive'
              ? 'bg-success/10 text-success'
              : kpi.changeType === 'negative'
              ? 'bg-destructive/10 text-destructive'
              : 'bg-muted text-muted-foreground';

          return (
            <Card
              key={index}
              className="rounded-3xl shadow-soft-lg border-0 transition-transform duration-300 ease-in-out hover:scale-[1.03]"
            >
              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <div className={cn('p-2.5 rounded-full', iconBgColor)}>
                    {IconComponent && (
                      <IconComponent
                        className={cn('w-5 h-5', kpi.color)}
                      />
                    )}
                  </div>
                  {kpi.change && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        'rounded-full px-2.5 py-1 text-xs font-semibold',
                        changeColor
                      )}
                    >
                      {kpi.change}
                    </Badge>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-foreground tracking-tight">
                    {kpi.value}
                  </p>
                  <p className="text-sm font-medium text-muted-foreground mt-1">
                    {t(`dashboard.kpi.${kpi.title.replace(/\s/g, '')}`)}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};