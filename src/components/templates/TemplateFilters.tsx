// File: src/components/templates/TemplateFilters.tsx

import { SearchInput, SearchInputProps } from "@/components/common/SearchInput";
import { useTranslation } from "react-i18next";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface TemplateFiltersProps {
  searchTerm: string;
  onSearchChange: SearchInputProps['onChange'];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  // This prop now correctly accepts an array of objects with value and label.
  categories: { value: string; label: string }[];
}

export const TemplateFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: TemplateFiltersProps) => {
  const { t } = useTranslation();

  const handleCategoryChange = (categoryValue: string) => {
    // When a category is clicked, pass the internal 'value' to the parent component.
    onCategoryChange(categoryValue);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <SearchInput
        placeholder={t('templates.filters.searchPlaceholder')}
        value={searchTerm}
        onChange={onSearchChange}
      />
      <div className="md:ml-auto">
        <ToggleGroup
          type="single"
          value={selectedCategory}
          onValueChange={handleCategoryChange}
          className="flex-wrap justify-start md:justify-end"
        >
          {categories.map((category) => (
            <ToggleGroupItem
              key={category.value}
              value={category.value}
              aria-label={`Filter by ${category.label}`}
              className={cn(
                "px-4 text-sm whitespace-nowrap",
                selectedCategory === category.value && "bg-primary text-primary-foreground hover:bg-primary"
              )}
            >
              {category.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};
