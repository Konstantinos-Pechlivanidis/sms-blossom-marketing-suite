import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, Campaign } from '@/lib/api';
import { toast } from 'sonner';

export const useCampaigns = () => {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: apiService.getCampaigns,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useRecentCampaigns = () => {
  return useQuery({
    queryKey: ['recent-campaigns'],
    queryFn: apiService.getRecentCampaigns,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['recent-campaigns'] });
      toast.success('Campaign created successfully!');
    },
    onError: () => {
      toast.error('Failed to create campaign');
    },
  });
};

export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Campaign> }) =>
      apiService.updateCampaign(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['recent-campaigns'] });
    },
    onError: () => {
      toast.error('Failed to update campaign');
    },
  });
};

export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['recent-campaigns'] });
    },
    onError: () => {
      toast.error('Failed to delete campaign');
    },
  });
};