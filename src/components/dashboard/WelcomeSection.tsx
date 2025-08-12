// src/components/dashboard/WelcomeSection.tsx
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "@/hooks/api/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

export const WelcomeSection = () => {
  const { t } = useTranslation();
  const { data: user, isLoading } = useCurrentUser();

  const userName = user?.name.split(' ')[0] || t('common.user');
  const businessName = "Bella's Boutique"; // This can also come from user data if available

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-6 text-primary-foreground shadow-soft-lg">
      {isLoading ? (
        <>
          <Skeleton className="h-9 w-3/5 mb-2 bg-white/30" />
          <Skeleton className="h-5 w-4/5 bg-white/30" />
        </>
      ) : (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {t('dashboard.welcome', { name: userName })} 👋
          </h1>
          <p className="text-primary-foreground/90 mb-4">
            {t('dashboard.welcomeSubtitle', { businessName: businessName })}
          </p>
        </>
      )}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button 
          asChild 
          variant="secondary" 
          className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/30 rounded-full"
        >
          <Link to="/campaigns/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('dashboard.createCampaignButton')}
          </Link>
        </Button>
        <Button 
          asChild 
          variant="ghost" 
          className="text-primary-foreground hover:bg-white/10 rounded-full"
        >
          <Link to="/templates">
            <FileText className="mr-2 h-4 w-4" />
            {t('dashboard.browseTemplatesButton')}
          </Link>
        </Button>
      </div>
    </div>
  );
};