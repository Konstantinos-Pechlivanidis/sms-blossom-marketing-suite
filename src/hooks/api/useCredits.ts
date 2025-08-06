import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { toast } from 'sonner';

export const useCreditPacks = () => {
  return useQuery({
    queryKey: ['credit-packs'],
    queryFn: apiService.getCreditPacks,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSMSCredits = () => {
  return useQuery({
    queryKey: ['sms-credits'],
    queryFn: apiService.getSMSCredits,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const usePurchaseCredits = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.purchaseCredits,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['sms-credits'] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error('Failed to purchase credits');
    },
  });
};

export const useUpdateSMSCredits = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.updateSMSCredits,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sms-credits'] });
    },
    onError: () => {
      toast.error('Failed to update credits');
    },
  });
};