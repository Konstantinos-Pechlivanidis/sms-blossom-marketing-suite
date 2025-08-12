import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setFilter, setSearchTerm } from "@/store/slices/uiSlice";
import {
  useCampaigns,
  useDeleteCampaign,
} from "@/hooks/api/useCampaigns";
import {
  Search,
  MoreHorizontal,
  Edit,
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
    <div className="flex-1 space-y-6 bg-gray-100 dark:bg-gray-950 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={t("campaigns.title")}
        description={t("campaigns.description")}
      >
        <Link to="/campaigns/create">
          <Button className="bg-primary hover:bg-primary-hover rounded-full shadow-soft-sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("campaigns.actions.create")}
          </Button>
        </Link>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-28 rounded-3xl shadow-soft-sm" />
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
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              const iconBgColor = 
                stat.iconColor === 'text-success' ? 'bg-success/10' :
                stat.iconColor === 'text-info' ? 'bg-info/10' :
                stat.iconColor === 'text-muted-foreground' ? 'bg-muted/20' :
                'bg-primary/10';

              return (
                <Card
                  key={index}
                  className="rounded-3xl shadow-soft-sm border border-gray-200 dark:border-gray-800 h-28"
                >
                  <CardContent className="p-4 flex h-full items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn('p-2 rounded-full', iconBgColor)}>
                        {IconComponent && (
                          <IconComponent
                            className={cn('w-6 h-6', stat.iconColor)}
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                    {/* {stat.title === t('campaigns.totalCampaigns') && (
                      <Badge variant="secondary" className="rounded-full px-2 py-1 text-xs font-medium bg-success/10 text-success">
                        +12%
                      </Badge>
                    )} */}
                  </CardContent>
                </Card>
              );
            })}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={t("campaigns.search")}
            value={searchTerm}
            onChange={(e) =>
              dispatch(
                setSearchTerm({ type: "campaigns", term: e.target.value })
              )
            }
            className="pl-10 rounded-2xl border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
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
                "font-normal rounded-full shadow-soft-sm",
                statusFilter === status && "bg-primary text-primary-foreground hover:bg-primary/90"
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
              <Skeleton key={index} className="h-48 w-full rounded-3xl shadow-soft-sm" />
            ))
          : filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <Card
                key={String(campaign.id)}
                className="rounded-3xl shadow-soft-lg border border-gray-200 dark:border-gray-800 transition-shadow duration-200 ease-in-out hover:shadow-soft-xl"
              >
                <CardContent className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {String(campaign.name)}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {String(campaign.message)}
                        </p>
                      </div>
                      <StatusBadge status={String(campaign.status)} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm pt-3 border-t">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span className="truncate">
                          {campaign.date
                            ? `${campaign.date} ${campaign.time}`
                            : t("campaigns.status.notScheduled")}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Users className="h-4 w-4 shrink-0" />
                        <span className="truncate">
                          {Number(campaign.recipients).toLocaleString()}{" "}
                          {t("campaigns.recipients")}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <BarChart3 className="h-4 w-4 shrink-0" />
                        <span className="truncate">
                          {Number(campaign.conversions).toLocaleString()}{" "}
                          {t("campaigns.conversions")}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-primary">
                        <span className="font-semibold">
                          {String(campaign.conversionRate)}{" "}
                          {t("campaigns.conversionRate")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="self-center shrink-0 p-2 rounded-full hover:bg-gray-200">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl p-2 shadow-xl">
                      <Link to="/campaigns/create" state={{ campaignToEdit: campaign }}>
                        <DropdownMenuItem className="rounded-lg p-2 flex items-center gap-2 hover:bg-gray-100">
                          <Edit className="mr-2 h-4 w-4 text-gray-700" />
                          {t("common.edit")}
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        onClick={() => handleDelete(campaign as Campaign)}
                        className="rounded-lg p-2 flex items-center gap-2 text-destructive hover:bg-red-50"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {t("common.delete")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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