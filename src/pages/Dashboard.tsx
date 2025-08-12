import React from 'react';
import { useTranslation } from 'react-i18next';
import {InsightsWidget} from '@/components/dashboard/InsightsWidget';
import {RecentCampaigns} from '@/components/dashboard/RecentCampaigns';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { kpiData, recentCampaigns, englishTemplates, greekTemplates } from '@/data/mock-data';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Use the appropriate templates based on the current language
  const templates = currentLanguage === 'gr' ? greekTemplates : englishTemplates;

  return (
    <div className="flex-1 space-y-6 bg-gray-100 dark:bg-gray-950 p-4 sm:p-6 lg:p-8 rounded-3xl">
      <PageHeader
        title={t('dashboard.welcome')}
        description={t('dashboard.overview')}
      >
        <Link to="/campaigns/create">
          <Button className="bg-primary hover:bg-primary-hover rounded-full shadow-soft-sm">
            <Plus className="mr-2 h-4 w-4" />
            {t('navigation.createCampaign')}
          </Button>
        </Link>
      </PageHeader>

      <InsightsWidget data={kpiData} />
      
      <RecentCampaigns campaigns={recentCampaigns} />
    </div>
  );
};

export default Dashboard;