import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { creditPacks as mockCreditPacks } from '@/data/mock-data';
import type { CreditPack } from '@/types';
import { api } from '@/lib/api'; // Import the api instance
import { toast } from 'sonner';

// --- Λειτουργία ανάκτησης ( παραμένει ως έχει ) ---
const fetchCreditsFromAPI = async (): Promise<CreditPack[]> => {
  console.log("Fetching credit packs from the 'API'...");
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Real implementation: return (await api.get('/credit-packs')).data;
  return mockCreditPacks;
};

export const useCredits = () => {
  return useQuery({
    queryKey: ['credits'],
    queryFn: fetchCreditsFromAPI,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


// --- ΝΕΟ: Mutation για την αγορά ---
const purchaseCreditsAPI = async (packId: string): Promise<{ success: boolean }> => {
  console.log(`Sending purchase request to the 'API' for pack ID: ${packId}`);
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call delay

  // Real implementation:
  // const response = await api.post('/purchase-credits', { packId });
  // return response.data;
  
  // For now, we simulate a successful response
  if (packId) {
    return { success: true };
  } else {
    throw new Error("Invalid Pack ID");
  }
};

export const usePurchaseCredits = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: purchaseCreditsAPI,
    onSuccess: () => {
      toast.success("Purchase successful! Your credits have been updated.");
      // Invalidate user and credits queries to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      queryClient.invalidateQueries({ queryKey: ['credits'] });
    },
    onError: (error) => {
      toast.error(`Purchase failed: ${error.message}`);
    },
  });
};