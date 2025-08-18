import React from 'react';
import { useTranslation } from 'react-i18next';
import { CreditPackCard } from '@/components/credits/CreditPackCard';
import { PageHeader } from '@/components/common/PageHeader';
import { useCredits } from '@/hooks/api/useCredits';
import { useCurrentUser } from '@/hooks/api/useUser';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Terminal, Wallet, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

const BuyCreditsPage = () => {
  const { t } = useTranslation();
  
  const { data: creditPacks, isLoading: isLoadingPacks, isError: isErrorPacks } = useCredits();
  const { data: user, isLoading: isLoadingUser } = useCurrentUser();

  const faqs = [
    {
      q: t('credits.faq.q1', 'Do my credits expire?'),
      a: t('credits.faq.a1', 'Never! Your credits are valid forever and will be in your account as long as you need them.'),
    },
    {
      q: t('credits.faq.q2', 'What payment methods are accepted?'),
      a: t('credits.faq.a2', 'We accept all major credit and debit cards, including Visa, Mastercard, and American Express, processed securely through Stripe.'),
    },
    {
      q: t('credits.faq.q3', 'Can I upgrade my plan later?'),
      a: t('credits.faq.a3', 'Absolutely. You can purchase any credit pack at any time. Your new credits will simply be added to your existing balance.'),
    },
  ];

  return (
    <div className="flex-1 space-y-8">
      <PageHeader
        title={t('credits.mainTitle', 'Supercharge Your Outreach')}
        description={t('credits.mainDescription', 'Choose a credit pack that fits your needs. Reach your customers instantly and drive results.')}
      />

      {/* Current Balance Card */}
      <div className="bg-card p-6 rounded-3xl shadow-soft-lg border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {t('credits.currentBalanceTitle', 'Current Balance')}
              </h3>
              <p className="text-sm text-muted-foreground">{t('credits.balanceSubtitle', 'Ready to use for any campaign.')}</p>
            </div>
          </div>
          {isLoadingUser ? (
            <Skeleton className="h-9 w-36 mt-1 sm:mt-0" />
          ) : (
            <p className="text-3xl font-bold text-primary mt-1 sm:mt-0 text-left sm:text-right">
              {user?.credits?.toLocaleString() ?? 0} {t('navigation.credits')}
            </p>
          )}
        </div>
      </div>

      {isErrorPacks && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>{t('errors.genericTitle', 'An Error Occurred')}</AlertTitle>
          <AlertDescription>
            {t('errors.creditsFetchError', 'Could not fetch credit packs. Please try again later.')}
          </AlertDescription>
        </Alert>
      )}

      {/* Credit Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {isLoadingPacks
          ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-[420px] w-full rounded-3xl" />)
          : creditPacks?.map((pack) => (
              <CreditPackCard
                key={pack.id}
                pack={pack}
              />
            ))}
      </div>

      {/* FAQ Section */}
      <div className="pt-8">
        <div className="text-center max-w-2xl mx-auto">
            <HelpCircle className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">{t('credits.faq.title', 'Frequently Asked Questions')}</h2>
            <p className="text-muted-foreground mb-8">{t('credits.faq.subtitle', 'Have questions? We\'ve got answers. If you need more help, feel free to contact our support team.')}</p>
        </div>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-medium text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default BuyCreditsPage;