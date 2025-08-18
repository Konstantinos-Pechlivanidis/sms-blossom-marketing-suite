import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CreditPack } from '@/types';
import { cn } from '@/lib/utils';
import { usePurchaseCredits } from '@/hooks/api/useCredits';
import { toast } from 'sonner';

interface CreditPackCardProps {
  pack: CreditPack;
}

export const CreditPackCard: React.FC<CreditPackCardProps> = ({ pack }) => {
  const { t } = useTranslation();
  const purchaseMutation = usePurchaseCredits();

  const handlePurchase = () => {
    toast.info(`Initiating purchase for the ${t(pack.title)} pack...`);
    purchaseMutation.mutate(pack.id);
  };

  return (
    <Card
      className={cn(
        'rounded-3xl shadow-soft-lg border flex flex-col transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-soft-xl',
        pack.popular 
          ? 'border-primary/50 shadow-primary/10 -translate-y-2' 
          : 'border-border'
      )}
    >
      {pack.popular && (
        <Badge
          variant="default"
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-sm font-semibold shadow-lg bg-primary text-primary-foreground"
        >
          <Zap className="w-4 h-4 mr-2" />
          {t('credits.mostPopular')}
        </Badge>
      )}
      <CardHeader className="pt-10 text-center">
        {/* TRANSLATED */}
        <CardTitle className="text-2xl font-bold mb-1">{t(pack.title)}</CardTitle>
        {/* TRANSLATED */}
        <CardDescription className="text-base">{t(pack.description)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center">
        <div className="my-6 text-center">
          <span className="text-5xl font-extrabold text-foreground tracking-tight">${pack.price}</span>
          {pack.originalPrice && (
            <span className="text-lg text-muted-foreground line-through ml-2">${pack.originalPrice}</span>
          )}
          {/* TRANSLATED */}
          <p className="text-sm text-muted-foreground mt-1">{t('credits.priceSubtitle')}</p>
        </div>
        <div className="space-y-3 text-left w-full px-4">
          {pack.features.map((featureKey, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
              <span className="text-muted-foreground">
                {/* TRANSLATED with variable */}
                {t(featureKey, { count: pack.credits })}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 mt-6">
        <Button
          size="lg"
          className="w-full rounded-full text-base font-bold h-14 shadow-soft-md hover:shadow-soft-lg transition-shadow"
          variant={pack.popular ? 'default' : 'outline'}
          onClick={handlePurchase}
          disabled={purchaseMutation.isPending}
        >
          {purchaseMutation.isPending ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Zap className="w-5 h-5 mr-2" />
          )}
          {/* TRANSLATED */}
          {purchaseMutation.isPending ? t('common.processing') : t('credits.actions.buy')}
        </Button>
      </CardFooter>
    </Card>
  );
};