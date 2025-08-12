import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { User, Phone, Mail, Users, Tag, NotepadText, Crown, Save } from 'lucide-react';
import type { Contact } from '@/types';

interface EditContactFormProps {
  contact: Contact;
  onSave: (contact: Contact) => void;
  onCancel: () => void;
}

const EditContactForm: React.FC<EditContactFormProps> = ({ contact, onSave, onCancel }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(contact);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setFormData(prev => ({ ...prev, tags }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <User className="w-4 h-4 text-primary" />
            <span>{t('contacts.form.name')}</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
            className="rounded-xl border-gray-200 dark:border-gray-700 text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Phone className="w-4 h-4 text-primary" />
            <span>{t('contacts.form.phone')}</span>
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            required
            className="rounded-xl border-gray-200 dark:border-gray-700 text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Mail className="w-4 h-4 text-primary" />
          <span>{t('contacts.form.email')}</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="rounded-xl border-gray-200 dark:border-gray-700 text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div className="space-y-1">
          <Label htmlFor="gender" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>{t('contacts.form.gender')}</span>
          </Label>
          <Select
            value={formData.gender}
            onValueChange={(value: 'male' | 'female') => setFormData(prev => ({ ...prev, gender: value }))}
          >
            <SelectTrigger className="w-full rounded-xl border-gray-200 dark:border-gray-700 text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="male">{t('contacts.form.genderMale')}</SelectItem>
              <SelectItem value="female">{t('contacts.form.genderFemale')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2 pb-1 md:pb-0 md:pt-6">
          <Checkbox
            id="vip"
            checked={formData.isVip}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isVip: !!checked }))}
            className="rounded-md"
          />
          <Label htmlFor="vip" className="flex items-center gap-2 text-sm text-muted-foreground">
            <Crown className="w-4 h-4 text-yellow-500" />
            <span>{t('contacts.form.vip')}</span>
          </Label>
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="tags" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Tag className="w-4 h-4 text-primary" />
          <span>{t('contacts.form.tags')}</span>
        </Label>
        <Input
          id="tags"
          value={formData.tags.join(', ')}
          onChange={(e) => handleTagsChange(e.target.value)}
          placeholder="VIP, Regular Customer, etc."
          className="rounded-xl border-gray-200 dark:border-gray-700 text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="notes" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <NotepadText className="w-4 h-4 text-primary" />
          <span>{t('contacts.form.notes')}</span>
        </Label>
        <Textarea
          id="notes"
          value={formData.notes || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder={t('contacts.modals.notesPlaceholder')}
          rows={4}
          className="rounded-xl border-gray-200 dark:border-gray-700 text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
        />
      </div>

      <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="w-full rounded-xl sm:w-auto"
        >
          {t('common.cancel')}
        </Button>
        <Button
          type="submit"
          className="w-full rounded-xl sm:w-auto bg-primary hover:bg-primary/90"
        >
          <Save className="w-4 h-4 mr-2" />
          {t('common.save')}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default EditContactForm;