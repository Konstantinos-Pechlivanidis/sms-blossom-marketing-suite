import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Search } from 'lucide-react';
import { TemplateCategory, TemplateLanguage, templateCategories, templateLanguages } from '@/constants/templates';

interface TemplateFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: TemplateCategory;
  onCategoryChange: (category: TemplateCategory) => void;
  categories: typeof templateCategories;
  activeLang: TemplateLanguage;
  onLangChange: (lang: TemplateLanguage) => void;
  languages: typeof templateLanguages;
}

export const TemplateFilters: React.FC<TemplateFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  activeLang,
  onLangChange,
  languages,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Language Switcher */}
      <ToggleGroup
        type="single"
        value={activeLang}
        onValueChange={(value: TemplateLanguage) => value && onLangChange(value)}
        className="border rounded-full p-1 bg-muted"
      >
        {languages.map(lang => (
          <ToggleGroupItem key={lang.code} value={lang.code} className="rounded-full data-[state=on]:bg-background data-[state=on]:text-foreground">
            {lang.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* Category Filter */}
      <Select value={selectedCategory} onValueChange={(value: TemplateCategory) => onCategoryChange(value)}>
        <SelectTrigger className="w-full sm:w-[200px] rounded-full">
          <SelectValue placeholder={t('templates.category_label')} />
        </SelectTrigger>
        <SelectContent>
          {categories.map(category => (
            <SelectItem key={category.value} value={category.value}>
              {t(category.key)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Search Input */}
      <div className="relative w-full sm:w-auto sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t('templates.search')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 rounded-full"
        />
      </div>
    </div>
  );
};