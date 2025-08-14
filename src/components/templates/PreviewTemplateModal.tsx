import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Send, BarChart3, Users, TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Template } from '@/types';
import { cn } from '@/lib/utils';

interface PreviewTemplateModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onUseTemplate: (template: Template) => void;
}

// Reusable component for displaying a single performance metric
const StatCard: React.FC<{ icon: React.ElementType, label: string, value: string | number }> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
    <div className="p-2 bg-background rounded-full shadow-sm">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-bold text-lg text-foreground">{value}</p>
    </div>
  </div>
);

// The main content of the modal, now including stats
const PreviewContent: React.FC<{ template: Template }> = ({ template }) => {
  const { t } = useTranslation();
  const trackingLink = "https://smsify.app/s/XyZ123";
  const fullMessage = `${template.preview}\n\n${t('createCampaign.preview.link')}: ${trackingLink}`;

  // Placeholder stats for demonstration
  const stats = {
    sent: '1,284',
    conversions: '96',
    rate: '7.5%'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 py-4">
      {/* Left Side: Phone Preview */}
      <div className="flex flex-col items-center">
         <h4 className="text-sm font-medium text-muted-foreground mb-3">{t('createCampaign.preview.title')}</h4>
        <div className="mx-auto max-w-[260px] bg-neutral-800 rounded-[2rem] p-1.5 shadow-xl">
          <div className="bg-white dark:bg-black rounded-[1.75rem] p-3 h-[450px] overflow-hidden relative flex flex-col">
            <div className="flex items-center space-x-3 mb-3 pb-2 border-b">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">B</div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">{t('createCampaign.preview.senderName')}</h3>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto pr-1">
              <div className="flex justify-start">
                <div className="bg-muted rounded-xl rounded-bl-md p-2.5 max-w-[90%] shadow-sm">
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">{fullMessage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Template Performance */}
      <div className="flex flex-col">
         <h4 className="text-sm font-medium text-muted-foreground mb-3">{t('templates.performanceTitle', 'Template Performance')}</h4>
        <Card className="rounded-2xl border-border bg-muted/30 flex-grow">
          <CardContent className="p-4 space-y-3">
            <StatCard icon={Send} label={t('dashboard.kpi.messagesSent')} value={stats.sent} />
            <StatCard icon={Users} label={t('campaigns.conversions')} value={stats.conversions} />
            <StatCard icon={TrendingUp} label={t('campaigns.conversionRate')} value={stats.rate} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const PreviewTemplateModal: React.FC<PreviewTemplateModalProps> = ({ template, isOpen, onClose, onUseTemplate }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  if (!template) return null;

  const handleUseTemplate = () => {
    onUseTemplate(template);
    onClose();
  };
  
  const dialogTitle = `${t('common.preview')}: ${template.name}`;
  const dialogDescription = t('templates.previewDescription', 'Review the template message and its performance before using it.');

  if (isMobile) {
    return (
      <Drawer open={isOpen} onClose={onClose}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle>{dialogTitle}</DrawerTitle>
            <DrawerDescription>{dialogDescription}</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4">
            <PreviewContent template={template} />
          </div>
          <DrawerFooter className="pt-2">
            <Button className="w-full rounded-full" onClick={handleUseTemplate}>
              <Send className="w-4 h-4 mr-2" />
              {t('templates.actions.use')}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full rounded-full">{t('common.cancel')}</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <PreviewContent template={template} />
        <div className="mt-4 flex flex-col sm:flex-row-reverse gap-2">
           <Button className="w-full sm:w-auto rounded-full" onClick={handleUseTemplate}>
            <Send className="w-4 h-4 mr-2" />
            {t('templates.actions.use')}
          </Button>
           <Button variant="outline" className="w-full sm:w-auto rounded-full" onClick={onClose}>{t('common.cancel')}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};