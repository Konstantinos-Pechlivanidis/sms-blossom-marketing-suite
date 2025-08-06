
import { Check, Zap, CreditCard } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { CreditPackCard } from "@/components/credits/CreditPackCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreditPacks } from "@/hooks/api/useCredits";

const BuyCredits = () => {
  const { data: creditPacks, isLoading } = useCreditPacks();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Buy SMS Credits"
        description="Choose the package that suits your business needs. All credits never expire and include premium features."
        backTo="/"
      />

      {/* Credit Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-80" />
          ))
        ) : (
          creditPacks?.map((pack) => (
            <CreditPackCard key={pack.id} pack={pack} />
          ))
        )}
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
