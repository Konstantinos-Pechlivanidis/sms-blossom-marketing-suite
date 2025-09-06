import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { toast } from 'sonner';
import type { User, PasswordUpdatePayload, UserCredentials, UserRegistrationInfo } from '@/types';

/**
 * Hook to fetch the current authenticated user's data.
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: apiService.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};

/**
 * Mutation hook for updating the user's profile information.
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: Partial<User>) => apiService.updateUser(userData),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['current-user'], updatedUser);
      toast.success('Profile updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update profile: ${error.message}`);
    },
  });
};

/**
 * Mutation hook for updating the user's password.
 */
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (passwordData: PasswordUpdatePayload) => apiService.updatePassword(passwordData),
    onSuccess: () => {
      toast.success('Password updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update password: ${error.message}`);
    },
  });
};

/**
 * Mutation hook for handling user login.
 */
export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (credentials: UserCredentials) => apiService.loginUser(credentials),
        onSuccess: (user: User) => { // Explicitly type the user object
            queryClient.setQueryData(['current-user'], user);
            toast.success(`Welcome back, ${user.name}!`);
        },
        onError: (error: Error) => {
            toast.error(`Login failed: ${error.message}`);
        }
    });
};

/**
 * Mutation hook for handling user registration.
 */
export const useRegister = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userInfo: UserRegistrationInfo) => apiService.registerUser(userInfo),
        onSuccess: (user: User) => { // Explicitly type the user object
            queryClient.setQueryData(['current-user'], user);
            toast.success(`Welcome, ${user.name}! Your account has been created.`);
        },
        onError: (error: Error) => {
            toast.error(`Registration failed: ${error.message}`);
        }
    });
};

/**
 * Mutation hook for handling user logout.
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiService.logoutUser,
    onSuccess: () => {
      queryClient.clear();
      toast.success("You have been logged out.");
    },
    onError: (error: Error) => {
        toast.error(`Logout failed: ${error.message}`);
    }
  });
};