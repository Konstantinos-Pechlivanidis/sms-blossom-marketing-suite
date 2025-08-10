import { useMemo } from 'react';

export interface FilterCriteria {
  field: string;
  value: string | string[];
  allValue?: string; // Value that represents "all" (no filter)
}

export interface UseFilterAndSearchParams<T> {
  items: T[] | undefined;
  searchTerm: string;
  searchFields: (keyof T)[];
  filters: FilterCriteria[];
}

export function useFilterAndSearch<T extends Record<string, any>>({
  items,
  searchTerm,
  searchFields,
  filters
}: UseFilterAndSearchParams<T>) {
  return useMemo(() => {
    if (!items) return [];

    return items.filter((item) => {
      // Search term filtering
      const matchesSearch = !searchTerm || 
        searchFields.some(field => {
          const fieldValue = item[field];
          if (typeof fieldValue === 'string') {
            return fieldValue.toLowerCase().includes(searchTerm.toLowerCase());
          }
          return false;
        });

      // Multiple filters
      const matchesAllFilters = filters.every(filter => {
        const itemValue = item[filter.field];
        
        // If filter value is the "all" value, skip this filter
        if (filter.allValue && filter.value === filter.allValue) {
          return true;
        }

        // Handle array of filter values (OR logic)
        if (Array.isArray(filter.value)) {
          return filter.value.length === 0 || filter.value.includes(itemValue);
        }

        // Handle single filter value
        return itemValue === filter.value;
      });

      return matchesSearch && matchesAllFilters;
    });
  }, [items, searchTerm, searchFields, filters]);
}