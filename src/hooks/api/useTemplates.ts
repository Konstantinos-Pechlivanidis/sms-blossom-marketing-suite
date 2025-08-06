import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/lib/api';

export const useTemplates = () => {
  return useQuery({
    queryKey: ['templates'],
    queryFn: apiService.getTemplates,
    staleTime: 10 * 60 * 1000, // 10 minutes - templates don't change often
  });
};