import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, CreditCard, Loader2 } from "lucide-react";

interface CreditPack {
  id: string;
  title: string;
  credits: number;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  originalPrice?: string;
}

interface CreditPackCardProps {
  pack: CreditPack;
  isLoading: boolean;
  onPurchase: (pack: CreditPack) => void;
}

export const CreditPackCard = ({ pack, isLoading, onPurchase }: CreditPackCardProps) => {
  return (
    <Card 
      className={`relative transition-all duration-300 hover:shadow-lg ${
        pack.popular ? 'ring-2 ring-primary shadow-lg scale-105' : 'hover:scale-102'
      }`}
    >
      {pack.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1">
          🔖 Best Value
        </Badge>
      )}
      
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-bold text-foreground">
          {pack.title}
        </CardTitle>
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-3xl font-bold text-primary">{pack.price}</span>
            {pack.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">{pack.originalPrice}</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{pack.description}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Credit Count */}
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              {pack.credits.toLocaleString()}
            </span>
            <span className="text-muted-foreground">SMS</span>
          </div>
        </div>

        {/* Features List */}
        <ul className="space-y-2">
          {pack.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Purchase Button */}
        <Button
          onClick={() => onPurchase(pack)}
          disabled={isLoading}
          className={`w-full mt-6 ${
            pack.popular 
              ? 'bg-primary hover:bg-primary/90' 
              : 'bg-foreground hover:bg-foreground/90'
          } text-primary-foreground font-medium py-3`}
        >
          {isLoading ? (
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
  );
};