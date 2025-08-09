
import { MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateFilters } from "@/components/templates/TemplateFilters";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useTemplates } from "@/hooks/api/useTemplates";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setFilter, setSearchTerm } from "@/store/slices/uiSlice";
import { useFilteredItems } from "@/hooks/useFilteredItems";
import { Template } from "@/types";

const Templates = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.ui.searchTerms.templates);
  const selectedCategory = useAppSelector((state) => state.ui.activeFilters.templateCategory);
  const { data: templates, isLoading } = useTemplates();

  const categories = [
    t('templates.categories.all'), 
    "Coffee Shops", 
    "Gyms", 
    "Fashion Stores", 
    "Beauty", 
    "Restaurants"
  ];

  const filteredTemplates = useFilteredItems({
    items: templates,
    searchTerm,
    activeFilter: selectedCategory,
    searchFields: ['title', 'message'],
    filterField: 'category',
    allFilterValue: t('templates.categories.all')
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      "Coffee Shops": "bg-amber-100 text-amber-800",
      "Gyms": "bg-red-100 text-red-800",
      "Fashion Stores": "bg-purple-100 text-purple-800",
      "Beauty": "bg-pink-100 text-pink-800",
      "Restaurants": "bg-orange-100 text-orange-800",
      "All": "bg-gray-100 text-gray-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('templates.title')}
        description={t('templates.description')}
      />

      <TemplateFilters
        searchTerm={searchTerm}
        onSearchChange={(term) => dispatch(setSearchTerm({ type: 'templates', term }))}
        selectedCategory={selectedCategory}
        onCategoryChange={(category) => dispatch(setFilter({ type: 'templateCategory', value: category }))}
        categories={categories}
      />

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-64" />
          ))
        ) : (
          filteredTemplates.map((template) => (
            <TemplateCard
              key={String(template.id)}
              template={template}
              getCategoryColor={getCategoryColor}
            />
          ))
        )}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">{t('errors.pageNotFound')}</h3>
          <p className="text-muted-foreground">{t('templates.search')}</p>
        </div>
      )}
    </div>
  );
};

export default Templates;
