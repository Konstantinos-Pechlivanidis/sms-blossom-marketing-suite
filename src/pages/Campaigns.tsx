
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Copy, 
  Trash2,
  Send,
  Calendar,
  Users,
  BarChart3,
  PlusCircle
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Campaigns = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const campaigns = [
    {
      id: 1,
      name: "Weekend Flash Sale",
      status: "Sent",
      date: "2024-01-15",
      time: "10:30 AM",
      recipients: 1247,
      conversions: 23,
      conversionRate: "18.4%",
      message: "🎉 FLASH SALE! 50% off everything this weekend only!"
    },
    {
      id: 2,
      name: "New Arrivals Alert",
      status: "Scheduled",
      date: "2024-01-16",
      time: "9:00 AM",
      recipients: 2108,
      conversions: 0,
      conversionRate: "0%",
      message: "✨ New arrivals just dropped! Check out our latest collection"
    },
    {
      id: 3,
      name: "Birthday Rewards",
      status: "Sent",
      date: "2024-01-14",
      time: "2:15 PM",
      recipients: 89,
      conversions: 12,
      conversionRate: "13.5%",
      message: "🎂 Happy Birthday! Enjoy 30% off as our gift to you!"
    },
    {
      id: 4,
      name: "Loyalty Program Update",
      status: "Draft",
      date: "",
      time: "",
      recipients: 284,
      conversions: 0,
      conversionRate: "0%",
      message: "💎 You're now a VIP member! Enjoy exclusive benefits"
    },
    {
      id: 5,
      name: "Back in Stock",
      status: "Sent",
      date: "2024-01-13",
      time: "11:45 AM",
      recipients: 156,
      conversions: 8,
      conversionRate: "5.1%",
      message: "📦 Good news! Your favorite item is back in stock"
    },
    {
      id: 6,
      name: "Winter Collection",
      status: "Scheduled",
      date: "2024-01-18",
      time: "3:00 PM",
      recipients: 1890,
      conversions: 0,
      conversionRate: "0%",
      message: "❄️ Winter Collection: Stay warm and stylish! 40% off"
    }
  ];

  const statuses = ["All", "Sent", "Scheduled", "Draft"];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Sent":
        return "bg-green-100 text-green-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEdit = (campaign: any) => {
    toast.success(`Editing "${campaign.name}"`);
  };

  const handleResend = (campaign: any) => {
    toast.success(`"${campaign.name}" has been resent to ${campaign.recipients} recipients`);
  };

  const handleDelete = (campaign: any) => {
    toast.success(`"${campaign.name}" has been deleted`);
  };

  const totalCampaigns = campaigns.length;
  const sentCampaigns = campaigns.filter(c => c.status === "Sent").length;
  const scheduledCampaigns = campaigns.filter(c => c.status === "Scheduled").length;
  const draftCampaigns = campaigns.filter(c => c.status === "Draft").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaigns</h1>
          <p className="text-gray-600">Manage and track your SMS campaigns</p>
        </div>
        <Button asChild className="bg-[#81D8D0] hover:bg-[#5FBDB7]">
          <Link to="/create-campaign">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Campaign
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{totalCampaigns}</p>
              </div>
              <Send className="h-8 w-8 text-[#81D8D0]" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sent</p>
                <p className="text-2xl font-bold text-green-600">{sentCampaigns}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{scheduledCampaigns}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-gray-600">{draftCampaigns}</p>
              </div>
              <Edit className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          {statuses.map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className={statusFilter === status ? "bg-[#81D8D0] hover:bg-[#5FBDB7]" : ""}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {campaign.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {campaign.message.substring(0, 80)}...
                      </p>
                    </div>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {campaign.date ? `${campaign.date} ${campaign.time}` : "Not scheduled"}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {campaign.recipients.toLocaleString()} recipients
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {campaign.conversions} conversions
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-[#81D8D0]">
                        {campaign.conversionRate} rate
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(campaign)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      {campaign.status === "Sent" && (
                        <DropdownMenuItem onClick={() => handleResend(campaign)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Resend
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => handleDelete(campaign)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <Send className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <Button asChild className="bg-[#81D8D0] hover:bg-[#5FBDB7]">
            <Link to="/create-campaign">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Your First Campaign
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
