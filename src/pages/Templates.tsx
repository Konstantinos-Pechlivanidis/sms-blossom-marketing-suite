import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { TemplateFilters } from '@/components/templates/TemplateFilters';
import { EmptyState } from '@/components/common/EmptyState';
import { BookText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Template } from "@/types";
import { apiService } from '@/lib/api';

const TemplatesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getTemplates();
        setTemplates(data);
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const filteredTemplates = useMemo(() => {
    return templates
      .filter(template => selectedCategory === 'all' || template.category === selectedCategory)
      .filter(template => {
        const term = searchTerm.toLowerCase();
        if (!term) return true;
        return template.name.toLowerCase().includes(term) ||
               template.preview.toLowerCase().includes(term) ||
               template.tags.some(tag => tag.toLowerCase().includes(term));
      });
  }, [templates, searchTerm, selectedCategory]);

  const handleSelectTemplate = (template: Template) => {
    navigate('/campaigns/create', { state: { selectedTemplate: template } });
  };

  const categories = useMemo(() => {
    const allCategories = templates.map(t => t.category);
    return ['all', ...Array.from(new Set(allCategories))];
  }, [templates]);

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
        categories={categories}
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
          title={t('templates.emptyTitle')}
          description={t('templates.emptyDescription')}
        />
      )}
    </div>
  );
};

export default TemplatesPage;