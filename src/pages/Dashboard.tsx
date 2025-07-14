import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Send, 
  TrendingUp, 
  Users, 
  Calendar,
  PlusCircle,
  FileText,
  BarChart3,
  ArrowUpRight,
  CreditCard
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [smsCredits, setSmsCredits] = useState("2,847");

  useEffect(() => {
    // Get SMS credits from localStorage and update display
    const credits = localStorage.getItem('smsCredits') || '2847';
    setSmsCredits(parseInt(credits).toLocaleString());
    
    // Listen for storage changes to update credits in real-time
    const handleStorageChange = () => {
      const credits = localStorage.getItem('smsCredits') || '2847';
      setSmsCredits(parseInt(credits).toLocaleString());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const kpiData = [
    {
      title: "Total Campaigns Sent",
      value: "247",
      change: "+12%",
      changeType: "positive",
      icon: Send,
      color: "text-[#81D8D0]"
    },
    {
      title: "Avg Conversion Rate",
      value: "18.4%",
      change: "+3.2%",
      changeType: "positive",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Active Contacts",
      value: "2,847",
      change: "+156",
      changeType: "positive",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Scheduled Campaigns",
      value: "12",
      change: "3 today",
      changeType: "neutral",
      icon: Calendar,
      color: "text-purple-600"
    }
  ];

  const recentCampaigns = [
    {
      name: "Weekend Special - 30% Off",
      status: "Sent",
      sent: "2 hours ago",
      recipients: 1247,
      conversions: 23
    },
    {
      name: "New Arrivals Alert",
      status: "Scheduled",
      sent: "Tomorrow 9:00 AM",
      recipients: 2108,
      conversions: 0
    },
    {
      name: "Birthday Rewards",
      status: "Sent",
      sent: "Yesterday",
      recipients: 89,
      conversions: 12
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#81D8D0] to-[#5FBDB7] rounded-lg p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome back, Sarah! 👋
        </h1>
        <p className="text-white/90 mb-4">
          Bella's Boutique is ready to engage customers with personalized SMS campaigns
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
            <Link to="/create-campaign">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Campaign
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-white/10">
            <Link to="/templates">
              <FileText className="mr-2 h-4 w-4" />
              Browse Templates
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  <p className={`text-sm mt-1 flex items-center ${
                    kpi.changeType === 'positive' ? 'text-green-600' : 
                    kpi.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {kpi.changeType === 'positive' && <ArrowUpRight className="h-3 w-3 mr-1" />}
                    {kpi.change}
                  </p>
                </div>
                <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Campaigns */}
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
              {recentCampaigns.map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-500">{campaign.sent} • {campaign.recipients} recipients</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      campaign.status === 'Sent' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {campaign.status}
                    </span>
                    {campaign.conversions > 0 && (
                      <p className="text-sm text-gray-500 mt-1">{campaign.conversions} conversions</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights Widget */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-[#81D8D0]" />
              Weekly Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* SMS Credits Display */}
              <div className="p-4 bg-[#81D8D0]/10 rounded-lg border border-[#81D8D0]/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">SMS Credits</h4>
                  <CreditCard className="h-4 w-4 text-[#81D8D0]" />
                </div>
                <p className="text-2xl font-bold text-[#81D8D0] mb-2">{smsCredits}</p>
                <Button asChild size="sm" className="w-full bg-[#81D8D0] hover:bg-[#5FBDB7]">
                  <Link to="/buy-credits">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Buy More Credits
                  </Link>
                </Button>
              </div>
              
              <div className="p-4 bg-[#81D8D0]/10 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">🏆 Best Performer</h4>
                <p className="text-sm text-gray-600 mb-2">"Weekend Flash Sale" template</p>
                <p className="text-lg font-bold text-[#81D8D0]">32% conversion rate</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">📈 Growth Tip</h4>
                <p className="text-sm text-gray-600">
                  Send campaigns between 10-11 AM for 15% higher open rates
                </p>
              </div>

              <Button asChild className="w-full bg-[#81D8D0] hover:bg-[#5FBDB7]">
                <Link to="/templates">
                  Explore Templates
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
