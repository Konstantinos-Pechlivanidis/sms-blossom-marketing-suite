// src/components/automations/AutomationFilters.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Search } from 'lucide-react';

interface AutomationFiltersProps {
  activeLang: 'en' | 'el';
  onLangChange: (lang: 'en' | 'el') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const AutomationFilters: React.FC<AutomationFiltersProps> = ({
  activeLang,
  onLangChange,
  searchTerm,
  onSearchChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Language Switcher */}
      <ToggleGroup
        type="single"
        value={activeLang}
        onValueChange={(value: 'en' | 'el') => value && onLangChange(value)}
        className="border rounded-full p-1 bg-muted"
      >
        <ToggleGroupItem value="el" className="rounded-full data-[state=on]:bg-background data-[state=on]:text-foreground">
          Ελληνικά
        </ToggleGroupItem>
        <ToggleGroupItem value="en" className="rounded-full data-[state=on]:bg-background data-[state=on]:text-foreground">
          English
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Search Input */}
      <div className="relative w-full sm:w-auto sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t('automations.search_placeholder')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 rounded-full"
        />
      </div>
    </div>
  );
};