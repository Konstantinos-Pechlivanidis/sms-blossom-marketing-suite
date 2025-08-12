// src/hooks/api/useUser.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { toast } from 'sonner';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: apiService.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      toast.success('Profile updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: apiService.updatePassword,
    onSuccess: () => {
      toast.success('Password updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update password');
    },
  });
};