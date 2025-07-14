
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Check, 
  Zap, 
  ArrowLeft,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";

const BuyCredits = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const creditPacks = [
    {
      id: "starter",
      title: "Starter Pack",
      credits: 100,
      price: "€3.99",
      description: "Perfect for small campaigns",
      features: ["100 SMS messages", "Basic analytics", "24/7 support"],
      popular: false
    },
    {
      id: "business",
      title: "Business Pack",
      credits: 500,
      price: "€14.99",
      description: "Best value for growing businesses",
      features: ["500 SMS messages", "Advanced analytics", "Priority support", "5% bonus credits"],
      popular: true,
      originalPrice: "€19.95"
    },
    {
      id: "enterprise",
      title: "Enterprise Pack",
      credits: 1000,
      price: "€27.99",
      description: "For high-volume campaigns",
      features: ["1,000 SMS messages", "Premium analytics", "Dedicated support", "10% bonus credits"],
      popular: false,
      originalPrice: "€39.99"
    }
  ];

  const handlePurchase = async (pack: typeof creditPacks[0]) => {
    setIsLoading(pack.id);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate successful purchase
    const currentCredits = parseInt(localStorage.getItem('smsCredits') || '2847');
    const newCredits = currentCredits + pack.credits;
    localStorage.setItem('smsCredits', newCredits.toString());
    
    setIsLoading(null);
    
    toast({
      title: "✅ Purchase Successful!",
      description: `${pack.credits} SMS credits have been added to your account.`,
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-4">
          <Link 
            to="/" 
            className="flex items-center text-gray-600 hover:text-primary transition-colors mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Buy SMS Credits
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the package that suits your business needs. All credits never expire and include premium features.
        </p>
      </div>

      {/* Credit Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {creditPacks.map((pack) => (
          <Card 
            key={pack.id} 
            className={`relative transition-all duration-300 hover:shadow-lg ${
              pack.popular ? 'ring-2 ring-primary shadow-lg scale-105' : 'hover:scale-102'
            }`}
          >
            {pack.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1">
                🔖 Best Value
              </Badge>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                {pack.title}
              </CardTitle>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-3xl font-bold text-primary">{pack.price}</span>
                  {pack.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">{pack.originalPrice}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{pack.description}</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Credit Count */}
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold text-gray-900">
                    {pack.credits.toLocaleString()}
                  </span>
                  <span className="text-gray-600">SMS</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-2">
                {pack.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Purchase Button */}
              <Button
                onClick={() => handlePurchase(pack)}
                disabled={isLoading !== null}
                className={`w-full mt-6 ${
                  pack.popular 
                    ? 'bg-primary hover:bg-primary/90' 
                    : 'bg-gray-900 hover:bg-gray-800'
                } text-white font-medium py-3`}
              >
                {isLoading === pack.id ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Buy Now</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <div className="text-center space-y-4 max-w-2xl mx-auto mt-12">
        <div className="bg-[#81D8D0]/10 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Why Choose Our SMS Credits?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span>Never Expire</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span>Instant Delivery</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-white" />
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
