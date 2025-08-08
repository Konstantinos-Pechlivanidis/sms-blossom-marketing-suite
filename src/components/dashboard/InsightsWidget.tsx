import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

interface InsightsWidgetProps {
  smsCredits: string;
}

export const InsightsWidget = ({ smsCredits }: InsightsWidgetProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5 text-primary" />
          Weekly Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* SMS Credits Display */}
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">SMS Credits</h4>
              <CreditCard className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary mb-2">{smsCredits}</p>
            <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90">
              <Link to="/credits">
                <CreditCard className="mr-2 h-4 w-4" />
                Buy More Credits
              </Link>
            </Button>
          </div>
          
          <div className="p-4 bg-primary/10 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">🏆 Best Performer</h4>
            <p className="text-sm text-muted-foreground mb-2">"Weekend Flash Sale" template</p>
            <p className="text-lg font-bold text-primary">32% conversion rate</p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">📈 Growth Tip</h4>
            <p className="text-sm text-muted-foreground">
              Send campaigns between 10-11 AM for 15% higher open rates
            </p>
          </div>

          <Button asChild className="w-full bg-primary hover:bg-primary/90">
            <Link to="/templates">
              Explore Templates
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};