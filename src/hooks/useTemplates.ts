import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { Template } from '@/types';
import { englishTemplates, greekTemplates } from '@/data/mock-data';

/**
 * A custom hook to fetch templates from the API based on a given language.
 * This hook is now correctly returning the full Template type.
 */
export const useTemplates = (language: string = 'en') => {
  return useQuery<Template[]>({
    queryKey: ['templates', language],
    queryFn: async () => {
      // Simulate API call and return templates based on the language.
      // In a real application, you would pass the language to the backend API.
      const response = language === 'gr' ? greekTemplates : englishTemplates;
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate a delay
      return response;
    },
  });
};