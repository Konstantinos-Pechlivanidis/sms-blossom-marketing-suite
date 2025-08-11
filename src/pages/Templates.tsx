
import { MessageSquare, PlusCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateFilters } from "@/components/templates/TemplateFilters";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setFilter, setSearchTerm } from "@/store/slices/uiSlice";
import { useFilterAndSearch } from "@/hooks/useFilterAndSearch";
import { Template } from "@/types";
import { Link } from "react-router-dom";
import { templateCategories, templateLanguages } from "@/constants/templates";
import { useState, useMemo } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTemplates } from "@/hooks/api/useTemplates";

/**
 * Η κύρια σελίδα Templates, υπεύθυνη για την εμφάνιση μιας λίστας προτύπων SMS.
 * Αυτό το component οργανώνει το φιλτράρισμα και την απόδοση των καρτών προτύπων.
 */
const Templates = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.ui.searchTerms.templates);
  const selectedCategory = useAppSelector((state) => state.ui.activeFilters.templateCategory);
  
  const [templateLanguage, setTemplateLanguage] = useState<string>(templateLanguages[0].code);

  const { data: templates, isLoading } = useTemplates(templateLanguage);

  // Οι κατηγορίες τώρα ενημερώνονται δυναμικά με βάση την τρέχουσα γλώσσα
  // και επιστρέφουν ένα array από objects με label και value.
  const categories = useMemo(() => {
    return templateCategories.map(cat => ({
      value: cat.value,
      label: t(cat.key)
    }));
  }, [t]);

  // Η λογική φιλτραρίσματος γίνεται από ένα reusable hook.
  const filteredTemplates = useFilterAndSearch<Template>({
    items: templates || [],
    searchTerm,
    // Προσθέτουμε τα tags στα πεδία αναζήτησης για καλύτερη λειτουργία.
    searchFields: ['title', 'message', 'tags'],
    filters: [
      {
        field: 'category',
        value: selectedCategory,
        allValue: templateCategories[0].value
      }
    ]
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('templates.title')}
        description={t('templates.description')}
      >
        <Link to="/campaigns/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('templates.actions.create')}
          </Button>
        </Link>
      </PageHeader>

      {/* Language switcher and filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <TemplateFilters
          searchTerm={searchTerm}
          onSearchChange={(term) => dispatch(setSearchTerm({ type: 'templates', term }))}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => dispatch(setFilter({ type: 'templateCategory', value: category }))}
          // Περνάμε το νέο array με αντικείμενα.
          categories={categories}
        />
        <div className="md:ml-auto">
          <ToggleGroup type="single" value={templateLanguage} onValueChange={setTemplateLanguage} className="justify-start">
            {templateLanguages.map(lang => (
              <ToggleGroupItem
                key={lang.code}
                value={lang.code}
                aria-label={`Switch to ${lang.name} templates`}
                className={cn("px-4", templateLanguage === lang.code && "bg-primary text-primary-foreground hover:bg-primary")}
              >
                <span className="mr-2">{lang.flag}</span>
                <span>{lang.name}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      {/* Templates Grid with Loading Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Use skeletons to provide a better loading experience.
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-72 rounded-lg" />
          ))
        ) : (
          filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
            />
          ))
        )}
      </div>

      {/* Empty State when no templates are found after filtering. */}
      {!isLoading && filteredTemplates.length === 0 && (
        <EmptyState
          icon={MessageSquare}
          title={t('templates.empty.title')}
          description={t('templates.empty.description')}
          ctaText={t('templates.actions.create')}
          ctaLink="/campaigns/create"
        />
      )}
    </div>
  );
};

export default Templates;