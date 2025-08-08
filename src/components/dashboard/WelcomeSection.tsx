import { Button } from "@/components/ui/button";
import { PlusCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface WelcomeSectionProps {
  userName?: string;
  businessName?: string;
}

export const WelcomeSection = ({ 
  userName = "Sarah", 
  businessName = "Bella's Boutique" 
}: WelcomeSectionProps) => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-primary-foreground">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        Welcome back, {userName}! 👋
      </h1>
      <p className="text-primary-foreground/90 mb-4">
        {businessName} is ready to engage customers with personalized SMS campaigns
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          asChild 
          variant="secondary" 
          className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/30"
        >
          <Link to="/campaigns/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Campaign
          </Link>
        </Button>
        <Button 
          asChild 
          variant="ghost" 
          className="text-primary-foreground hover:bg-white/10"
        >
          <Link to="/templates">
            <FileText className="mr-2 h-4 w-4" />
            Browse Templates
          </Link>
        </Button>
      </div>
    </div>
  );
};