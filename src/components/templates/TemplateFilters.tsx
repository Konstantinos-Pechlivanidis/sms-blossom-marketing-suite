import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { SearchInput } from "@/components/common/SearchInput";

interface TemplateFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export const TemplateFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories
}: TemplateFiltersProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <SearchInput
        placeholder={t('templates.search')}
        value={searchTerm}
        onChange={onSearchChange}
        className="flex-1"
      />
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={selectedCategory === category ? "bg-primary hover:bg-primary/90" : ""}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};