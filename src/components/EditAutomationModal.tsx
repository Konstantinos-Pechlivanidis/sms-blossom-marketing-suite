// src/components/EditAutomationModal.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerDescription, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Automation } from '@/types/automation';
import { useIsMobile } from '@/hooks/use-mobile'; // Hook to detect mobile screen
import { Zap } from 'lucide-react';

interface EditAutomationModalProps {
  automation: Automation | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedAutomation: Automation) => void;
}

// A reusable form component to avoid code duplication between Dialog and Drawer
const AutomationForm: React.FC<{ automation: Automation, onSave: (message: string) => void }> = ({ automation, onSave }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState(automation.message);
  const characterLimit = 160;

  // const handleGenerateAI = () => {
  //   // In a real scenario, this would call an AI service
  //   const aiSuggestion = `Hi {{name}}, it's your lucky day! As a thank you for being a loyal customer, enjoy 15% off. Use code: SPECIAL15.`;
  //   setMessage(aiSuggestion);
  // };

  return (
    <div className="p-4 sm:p-0">
      <div className="grid gap-4">
        <Label htmlFor="message" className="text-base font-semibold">
          {t('automations.message_label')}
        </Label>
        <div className="relative">
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="h-40 resize-none"
            maxLength={characterLimit}
          />
          <div className="text-xs text-muted-foreground text-right mt-1.5">
            {message.length} / {characterLimit}
          </div>
        </div>
        {/* <Button variant="outline" className="rounded-full self-start" onClick={handleGenerateAI}>
          <Zap className="w-4 h-4 mr-2 text-yellow-500" />
          {t('automations.generate_with_ai')}
        </Button> */}
      </div>
      <div className="mt-6 flex flex-col sm:flex-row-reverse gap-2">
        <Button className="w-full sm:w-auto rounded-full" onClick={() => onSave(message)}>
          {t('common.save')}
        </Button>
        <DrawerClose asChild>
           <Button variant="outline" className="w-full sm:w-auto rounded-full">{t('common.cancel')}</Button>
        </DrawerClose>
      </div>
    </div>
  );
};

export const EditAutomationModal: React.FC<EditAutomationModalProps> = ({ automation, isOpen, onClose, onSave }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const handleSave = (newMessage: string) => {
    if (automation) {
      onSave({ ...automation, message: newMessage });
    }
  };

  if (!automation) return null;

  // Render Drawer for mobile screens
  if (isMobile) {
    return (
        <Drawer open={isOpen} onClose={onClose}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>{t('automations.edit_title')}: {automation.title}</DrawerTitle>
                    <DrawerDescription>{t('automations.edit_desc')}</DrawerDescription>
                </DrawerHeader>
                <AutomationForm automation={automation} onSave={handleSave} />
            </DrawerContent>
        </Drawer>
    );
  }

  // Render Dialog for desktop screens
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>{t('automations.edit_title')}: {automation.title}</DialogTitle>
          <DialogDescription>
            {t('automations.edit_desc')}
          </DialogDescription>
        </DialogHeader>
        <AutomationForm automation={automation} onSave={handleSave} />
      </DialogContent>
    </Dialog>
  );
};