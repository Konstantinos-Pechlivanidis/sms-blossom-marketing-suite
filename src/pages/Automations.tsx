import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Zap, ShoppingBag, Award, Edit, Users, TrendingUp, Repeat, Clock, MessageSquare } from 'lucide-react';
import { Automation } from '@/types/automation';
import { mockAutomations } from '@/data/mock-data';
import { cn } from '@/lib/utils';
import {EditAutomationModal} from '@/components/EditAutomationModal';
import { AutomationFilters } from '@/components/automations/AutomationFilters';

const AutomationPage = () => {
  const { t } = useTranslation();

  // --- STATE MANAGEMENT ---
  const [activeLang, setActiveLang] = useState<'en' | 'el'>('el');
  const [searchTerm, setSearchTerm] = useState('');
  const [automations, setAutomations] = useState<Automation[]>(mockAutomations);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);

  // --- FILTERING LOGIC ---
  const filteredAutomations = useMemo(() => {
    return automations
      .filter(auto => auto.lang === activeLang)
      .filter(auto => {
        if (!searchTerm) return true;
        return auto.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               auto.description.toLowerCase().includes(searchTerm.toLowerCase());
      });
  }, [automations, activeLang, searchTerm]);

  // --- HANDLER FUNCTIONS ---
  const handleStatusChange = (automationId: string, newStatus: boolean) => {
    // Στο μέλλον, εδώ θα καλείτε το API:
    // await api.automations.updateStatus(automationId, newStatus);
    setAutomations(current =>
      current.map(auto =>
        auto.id === automationId ? { ...auto, active: newStatus } : auto
      )
    );
  };
  
  const handleSaveAutomation = (updatedAutomation: Automation) => {
    // Στο μέλλον, εδώ θα καλείτε το API:
    // await api.automations.save(updatedAutomation);
     setAutomations(current =>
      current.map(auto =>
        auto.id === updatedAutomation.id ? updatedAutomation : auto
      )
    );
    setIsModalOpen(false);
  };

  const handleEditClick = (automation: Automation) => {
    setSelectedAutomation(automation);
    setIsModalOpen(true);
  };
  
  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className={className} />;
      case 'ShoppingBag': return <ShoppingBag className={className} />;
      case 'Award': return <Award className={className} />;
      case 'Clock': return <Clock className={className} />;
      case 'Repeat': return <Repeat className={className} />;
      case 'MessageSquare': return <MessageSquare className={className} />;
      default: return <Zap className={className} />;
    }
  };

  return (
    <>
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{t('automations.title')}</h1>
        </div>

        <AutomationFilters
          activeLang={activeLang}
          onLangChange={setActiveLang}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAutomations.map((automation) => (
            <Card key={automation.id} className="rounded-3xl shadow-soft-lg border-0 flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]">
              <CardHeader>
                <div className="flex flex-row items-start justify-between">
                    <div>
                        <CardTitle className="text-lg font-bold">{automation.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t('automations.trigger_label')}: <span className="font-medium">{automation.trigger}</span>
                          {automation.runTime && <span className="font-medium"> @ {automation.runTime}</span>}
                        </p>
                    </div>
                    <div className={cn("p-3 rounded-full", automation.bgColor)}>
                        {getIcon(automation.icon, cn("w-6 h-6", automation.color))}
                    </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-foreground/80 line-clamp-3">
                  {automation.description}
                </p>
                <div className="flex gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-muted-foreground"/>
                    <span className="font-medium">{automation.stats.sent.toLocaleString()}</span> {t('automations.sent')}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-muted-foreground"/>
                    <span className="font-medium">{automation.stats.converted.toLocaleString()}</span> {t('automations.converted')}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-4 mt-2 border-t">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`switch-${automation.id}`}
                    checked={automation.active}
                    onCheckedChange={(newStatus) => handleStatusChange(automation.id, newStatus)}
                  />
                  <Label htmlFor={`switch-${automation.id}`} className="text-sm font-medium">
                    {automation.active ? t('common.active') : t('common.inactive')}
                  </Label>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => handleEditClick(automation)}>
                  <Edit className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <EditAutomationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        automation={selectedAutomation}
        onSave={handleSaveAutomation}
      />
    </>
  );
};

export default AutomationPage;