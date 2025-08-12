import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, Crown, TrendingUp, Calendar, Tag, NotepadText, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Contact } from '@/types';

interface ViewContactDetailsProps {
  contact: Contact;
}

const ViewContactDetails: React.FC<ViewContactDetailsProps> = ({ contact }) => {
  const { t } = useTranslation();
  
  const translateGender = (gender: 'male' | 'female') => {
    return t(`contacts.form.gender${gender.charAt(0).toUpperCase() + gender.slice(1)}`);
  };

  return (
    <div className="space-y-6 px-4 md:px-0">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-3xl bg-white dark:bg-gray-900 shadow-soft-sm border border-gray-200 dark:border-gray-800">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0 shadow-md">
          <span className="text-sm font-bold text-primary">
            {contact.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-foreground">{contact.name}</h3>
            {contact.isVip && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 shadow-soft-sm rounded-full">
                <Crown className="w-3 h-3 mr-1" />
                {t('contacts.filters.vip')}
              </Badge>
            )}
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>{contact.phone}</span>
            </div>
            {contact.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{contact.email}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="shadow-soft-sm border rounded-3xl">
          <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="p-2 rounded-full bg-success/10 text-success shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold text-foreground">{contact.conversions}</p>
              <p className="text-sm text-muted-foreground">{t('campaigns.conversions')}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft-sm border rounded-3xl">
          <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-md font-semibold text-foreground">
                {contact.joinDate ? new Date(contact.joinDate).toLocaleDateString() : 'N/A'}
              </p>
              <p className="text-sm text-muted-foreground">{t('contacts.form.joinDate')}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Details Section */}
      <Card className="shadow-soft-sm border rounded-3xl p-4 md:p-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{t('contacts.form.gender')}</span>
            </Label>
            <p className="capitalize text-muted-foreground text-sm">{translateGender(contact.gender)}</p>
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{t('contacts.form.lastInteraction')}</span>
            </Label>
            <p className="text-muted-foreground text-sm">{contact.lastInteraction}</p>
          </div>

          {contact.tags.length > 0 && (
            <div className="space-y-1">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{t('contacts.form.tags')}</span>
              </Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {contact.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-sm rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {contact.notes && (
            <div className="space-y-1">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <NotepadText className="w-4 h-4" />
                <span>{t('contacts.form.notes')}</span>
              </Label>
              <p className="text-muted-foreground text-sm leading-relaxed">{contact.notes}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ViewContactDetails;