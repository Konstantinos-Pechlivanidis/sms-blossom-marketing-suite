import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Send,
  Calendar,
  Users,
  BarChart3,
  PlusCircle,
  TrendingUp,
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
import { PageHeader } from "@/components/common/PageHeader";
import { useTranslation } from "react-i18next";
import { useFilterAndSearch } from "@/hooks/useFilterAndSearch";
import { Campaign } from "@/types";
import { cn } from "@/lib/utils";

const Campaigns = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data: campaigns, isLoading } = useCampaigns();
  const updateCampaignMutation = useUpdateCampaign();
  const deleteCampaignMutation = useDeleteCampaign();
  const searchTerm = useAppSelector((state) => state.ui.searchTerms.campaigns);
  const statusFilter = useAppSelector(
    (state) => state.ui.activeFilters.campaignStatus
  );

  const statuses = ["All", "Sent", "Scheduled", "Draft"];

  const filteredCampaigns = useFilterAndSearch({
    items: campaigns,
    searchTerm,
    searchFields: ["name", "message"],
    filters: [
      {
        field: "status",
        value: statusFilter,
        allValue: "All",
      },
    ],
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
          hour12: false,
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
      <PageHeader
        title={t("campaigns.title")}
        description={t("campaigns.description")}
      >
        <Link to="/campaigns/create">
          <Button className="bg-primary hover:bg-primary-hover">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("campaigns.actions.create")}
          </Button>
        </Link>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-28" />
            ))
          : [
              {
                title: t("campaigns.totalCampaigns"),
                value: totalCampaigns,
                icon: Send,
                iconColor: "text-primary",
              },
              {
                title: t("campaigns.status.sent"),
                value: sentCampaigns,
                icon: TrendingUp,
                iconColor: "text-success",
              },
              {
                title: t("campaigns.status.scheduled"),
                value: scheduledCampaigns,
                icon: Calendar,
                iconColor: "text-info",
              },
              {
                title: t("campaigns.status.draft"),
                value: draftCampaigns,
                icon: Edit,
                iconColor: "text-muted-foreground",
              },
            ].map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={cn("h-8 w-8", stat.iconColor)} />
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={t("campaigns.search")}
            value={searchTerm}
            onChange={(e) =>
              dispatch(
                setSearchTerm({ type: "campaigns", term: e.target.value })
              )
            }
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() =>
                dispatch(setFilter({ type: "campaignStatus", value: status }))
              }
              className={cn(
                "font-normal",
                statusFilter === status && "bg-primary text-primary-foreground"
              )}
            >
              {t(`campaigns.status.${status.toLowerCase()}`)}
            </Button>
          ))}
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-56" />
            ))
          : filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <Card
                key={String(campaign.id)}
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">
                          {String(campaign.name)}
                        </h3>
                        <StatusBadge status={String(campaign.status)} />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {String(campaign.message)}
                      </p>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span className="truncate">
                            {campaign.date
                              ? `${campaign.date} ${campaign.time}`
                              : t("campaigns.status.notScheduled")}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 shrink-0" />
                          <span className="truncate">
                            {Number(campaign.recipients).toLocaleString()}{" "}
                            {t("campaigns.recipients")}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <BarChart3 className="h-4 w-4 shrink-0" />
                          <span className="truncate">
                            {Number(campaign.conversions).toLocaleString()}{" "}
                            {t("campaigns.conversions")}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 text-sm">
                          <span className="font-semibold text-primary">
                            {String(campaign.conversionRate)}{" "}
                            {t("campaigns.conversionRate")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="self-center"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEdit(campaign as Campaign)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          {t("common.edit")}
                        </DropdownMenuItem>
                        {campaign.status === "Sent" && (
                          <DropdownMenuItem
                            onClick={() => handleResend(campaign as Campaign)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            {t("campaigns.actions.resend")}
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDelete(campaign as Campaign)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {t("common.delete")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <EmptyState
              icon={Send}
              title={t("campaigns.empty.title")}
              description={t("campaigns.empty.description")}
              ctaText={t("campaigns.empty.ctaText")}
              ctaLink="/campaigns/create"
            />
          )}
      </div>
    </div>
  );
};

export default Campaigns;
