import { useQuery } from '@tanstack/react-query';
import { apiService, KPIData } from '@/lib/api';

export const useKPIData = () => {
  return useQuery({
    queryKey: ['kpi-data'],
    queryFn: apiService.getKPIData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};