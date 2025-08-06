
import { Check, Zap, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/common/PageHeader";
import { CreditPackCard } from "@/components/credits/CreditPackCard";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { purchaseCreditsStart, purchaseCreditsSuccess } from "@/store/slices/smsSlice";

const BuyCredits = () => {
  const dispatch = useAppDispatch();
  const { packages: creditPacks, loading } = useAppSelector((state) => state.sms);
  const { toast } = useToast();


  const handlePurchase = async (pack: typeof creditPacks[0]) => {
    dispatch(purchaseCreditsStart());
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate successful purchase
    dispatch(purchaseCreditsSuccess(pack.credits));
    
    toast({
      title: "✅ Purchase Successful!",
      description: `${pack.credits} SMS credits have been added to your account.`,
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Buy SMS Credits"
        description="Choose the package that suits your business needs. All credits never expire and include premium features."
        backTo="/"
      />

      {/* Credit Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {creditPacks.map((pack) => (
          <CreditPackCard
            key={pack.id}
            pack={pack}
            isLoading={loading}
            onPurchase={handlePurchase}
          />
        ))}
      </div>

      {/* Additional Info */}
      <div className="text-center space-y-4 max-w-2xl mx-auto mt-12">
        <div className="bg-primary/10 rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-2">Why Choose Our SMS Credits?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-primary-foreground" />
              </div>
              <span>Never Expire</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span>Instant Delivery</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-primary-foreground" />
              </div>
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCredits;
