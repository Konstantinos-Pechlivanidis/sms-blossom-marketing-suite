import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Link } from "react-router-dom";

interface Campaign {
  name: string;
  status: string;
  sent: string;
  recipients: number;
  conversions: number;
}

interface RecentCampaignsProps {
  campaigns: Campaign[];
}

export const RecentCampaigns = ({ campaigns }: RecentCampaignsProps) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Campaigns
          <Button asChild variant="outline" size="sm">
            <Link to="/campaigns">View All</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.map((campaign, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">{campaign.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {campaign.sent} • {campaign.recipients.toLocaleString()} recipients
                </p>
              </div>
              <div className="text-right">
                <StatusBadge status={campaign.status} />
                {campaign.conversions > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {campaign.conversions} conversions
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};