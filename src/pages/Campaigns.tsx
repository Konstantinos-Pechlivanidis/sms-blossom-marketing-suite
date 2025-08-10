import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setFilter, setSearchTerm } from "@/store/slices/uiSlice";
import {
  useCampaigns,
  useUpdateCampaign,
  useDeleteCampaign,
} from "@/hooks/api/useCampaigns";
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
  PlusCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { t } from "i18next";
import { useFilteredItems } from "@/hooks/useFilteredItems";
import { Campaign } from "@/types";

const Campaigns = () => {
  const dispatch = useAppDispatch();
  const { data: campaigns, isLoading } = useCampaigns();
  const updateCampaignMutation = useUpdateCampaign();
  const deleteCampaignMutation = useDeleteCampaign();
  const searchTerm = useAppSelector((state) => state.ui.searchTerms.campaigns);
  const statusFilter = useAppSelector(
    (state) => state.ui.activeFilters.campaignStatus
  );

  const statuses = ["All", "Sent", "Scheduled", "Draft"];

  const filteredCampaigns = useFilteredItems({
    items: campaigns,
    searchTerm,
    activeFilter: statusFilter,
    searchFields: ['name', 'message'],
    filterField: 'status',
    allFilterValue: 'All'
  });

  const handleEdit = (campaign: Campaign) => {
    toast.success(`Editing "${campaign.name}"`);
  };

  const handleResend = (campaign: Campaign) => {
    updateCampaignMutation.mutate({
      id: campaign.id,
      updates: {
        status: "Sent" as const,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    });
    toast.success(
      `"${campaign.name}" has been resent to ${campaign.recipients} recipients`
    );
  };

  const handleDelete = (campaign: Campaign) => {
    deleteCampaignMutation.mutate(campaign.id);
    toast.success(`"${campaign.name}" has been deleted`);
  };

  const totalCampaigns = campaigns?.length || 0;
  const sentCampaigns =
    campaigns?.filter((c) => c.status === "Sent").length || 0;
  const scheduledCampaigns =
    campaigns?.filter((c) => c.status === "Scheduled").length || 0;
  const draftCampaigns =
    campaigns?.filter((c) => c.status === "Draft").length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaigns</h1>
          <p className="text-gray-600">Manage and track your SMS campaigns</p>
        </div>
        <Button asChild className="bg-[#81D8D0] hover:bg-[#5FBDB7]">
          <Link to="/campaigns/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Campaign
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-24" />
          ))
        ) : (
          <>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Campaigns
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalCampaigns}
                    </p>
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
                    <p className="text-2xl font-bold text-green-600">
                      {sentCampaigns}
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Scheduled
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {scheduledCampaigns}
                    </p>
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
                    <p className="text-2xl font-bold text-gray-600">
                      {draftCampaigns}
                    </p>
                  </div>
                  <Edit className="h-8 w-8 text-gray-600" />
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) =>
              dispatch(
                setSearchTerm({ type: "campaigns", term: e.target.value })
              )
            }
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          {statuses.map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() =>
                dispatch(setFilter({ type: "campaignStatus", value: status }))
              }
              className={
                statusFilter === status ? "bg-[#81D8D0] hover:bg-[#5FBDB7]" : ""
              }
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-48" />
            ))
            : filteredCampaigns.map((campaign) => (
              <Card
                key={String(campaign.id)}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {String(campaign.name)}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {String(campaign.message).substring(0, 80)}...
                          </p>
                        </div>
                        <StatusBadge status={String(campaign.status)} />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">
                            {campaign.date
                              ? `${campaign.date} ${campaign.time}`
                              : "Not scheduled"}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">
                            {Number(campaign.recipients).toLocaleString()} recipients
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <BarChart3 className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">
                            {String(campaign.conversions)} conversions
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-[#81D8D0]">
                            {String(campaign.conversionRate)} rate
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
                          <DropdownMenuItem
                            onClick={() => handleEdit(campaign as Campaign)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          {campaign.status === "Sent" && (
                            <DropdownMenuItem
                              onClick={() => handleResend(campaign as Campaign)}
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Resend
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDelete(campaign as Campaign)}
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

      {!isLoading && filteredCampaigns.length === 0 && (
        <EmptyState
          icon={Send}
          title="No campaigns found"
          description="Create your first campaign to start sending SMS messages to your customers"
          ctaText="Create Campaign"
          ctaLink="/campaigns/create"
        />
      )}
    </div>
  );
};

export default Campaigns;
