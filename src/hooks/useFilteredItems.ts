import { useMemo } from 'react';

interface UseFilteredItemsOptions<T> {
  items: T[] | undefined;
  searchTerm: string;
  activeFilter: string;
  searchFields: string[];
  filterField?: string;
  allFilterValue?: string;
}

export const useFilteredItems = <T extends Record<string, unknown>>({
  items,
  searchTerm,
  activeFilter,
  searchFields,
  filterField,
  allFilterValue = 'All'
}: UseFilteredItemsOptions<T>): T[] => {
  return useMemo(() => {
    if (!items) return [];

    return items.filter(item => {
      // Search term filtering
      const matchesSearch = searchTerm === '' || searchFields.some(field => {
        const value = item[field];
        return typeof value === 'string' && 
               value.toLowerCase().includes(searchTerm.toLowerCase());
      });

      // Category/status filtering
      const matchesFilter = !filterField || 
                           activeFilter === allFilterValue || 
                           item[filterField] === activeFilter;

      return matchesSearch && matchesFilter;
    }) as T[];
  }, [items, searchTerm, activeFilter, searchFields, filterField, allFilterValue]);
};