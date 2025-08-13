import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { TemplateFilters } from '@/components/templates/TemplateFilters';
import { EmptyState } from '@/components/common/EmptyState';
import { BookText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Template } from "@/types";
import { useTemplates } from '@/hooks/api/useTemplates';
import { templateCategories, TemplateCategory, templateLanguages, TemplateLanguage } from '@/constants/templates';

const TemplatesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('All');
  const [activeLang, setActiveLang] = useState<TemplateLanguage>('gr');

  const { data: templates, isLoading } = useTemplates(activeLang);

  const filteredTemplates = useMemo(() => {
    if (!templates) return [];
    return templates
      .filter(template => selectedCategory === 'All' || template.category === selectedCategory)
      .filter(template => {
        const term = searchTerm.toLowerCase();
        if (!term) return true;
        return template.name.toLowerCase().includes(term) ||
               template.preview.toLowerCase().includes(term) ||
               template.tags.some(tag => tag.toLowerCase().includes(term));
      });
  }, [templates, searchTerm, selectedCategory]);

  const handleSelectTemplate = (template: Template) => {
    navigate('/campaigns/create', { state: { campaignToEdit: template } });
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('templates.title')}</h1>
      </div>

      <TemplateFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={templateCategories}
        activeLang={activeLang}
        onLangChange={setActiveLang}
        languages={templateLanguages}
      />
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-3xl" />)}
        </div>
      ) : filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} onSelect={handleSelectTemplate} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={BookText}
          title={t('templates.empty.title')}
          description={t('templates.empty.description')}
        />
      )}
    </div>
  );
};

export default TemplatesPage;