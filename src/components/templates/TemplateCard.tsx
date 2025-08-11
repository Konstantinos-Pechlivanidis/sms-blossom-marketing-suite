import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Template } from "@/types";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Centralized color mapping for categories, ensuring consistency across the app.
const CATEGORY_COLOR_MAP: Record<string, string> = {
  "Coffee Shops": "bg-amber-100 text-amber-800",
  "Gyms": "bg-red-100 text-red-800",
  "Fashion Stores": "bg-purple-100 text-purple-800",
  "Beauty": "bg-pink-100 text-pink-800",
  "Restaurants": "bg-orange-100 text-orange-800",
  "All": "bg-gray-100 text-gray-800",
};

/**
 * A reusable component that displays a category badge with a specific color.
 * This encapsulates the logic, making the main card component cleaner.
 */
const TemplateCategoryBadge = ({ category }: { category: string }) => {
  const colorClasses = CATEGORY_COLOR_MAP[category] || "bg-gray-100 text-gray-800";
  return (
    <Badge className={cn("text-xs font-medium", colorClasses)}>
      {category}
    </Badge>
  );
};

interface TemplateCardProps {
  template: Template;
}

/**
 * A modern, professional, and responsive card component for displaying an SMS template.
 * The layout prioritizes key information, making the template's content
 * and performance metrics highly visible and scannable.
 */
export const TemplateCard = ({ template }: TemplateCardProps) => {
  const isHighlighted = template.highlight;

  return (
    <Card
      className={cn(
        "flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer",
        isHighlighted && "ring-2 ring-primary border-transparent"
      )}
    >
      <CardHeader className="space-y-3 p-4 md:p-5 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-grow min-w-0">
            <CardTitle className="text-base font-bold truncate">
              {template.title}
            </CardTitle>
            <TemplateCategoryBadge category={template.category} />
          </div>
          <div className="flex items-center space-x-1 text-sm font-medium text-foreground/80 flex-shrink-0">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span>{template.rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between p-4 md:p-5 pt-0">
        <div className="space-y-3">
          {/* Enhanced message preview with a clear, readable design. */}
          <div className="bg-muted rounded-lg p-3 flex flex-col items-start gap-2 min-h-[100px] justify-center">
            <div className="flex items-start space-x-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground leading-relaxed break-words line-clamp-4">
                {template.message}
              </p>
            </div>
          </div>

          {/* Testimonial section for social proof. */}
          {template.testimonial && (
            <div className="bg-primary/5 border border-primary/20 p-3 rounded-lg">
              <p className="text-sm italic text-primary font-medium">
                "{template.testimonial}"
              </p>
            </div>
          )}
        </div>

        {/* Conversion Rate and CTA are now at the bottom for better flow. */}
        <div className="mt-4 border-t pt-4 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>Conversion Rate</span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>The percentage of recipients who completed a desired action.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-xl font-extrabold text-primary">
              {template.conversionRate}
            </p>
          </div>
          <Button
            asChild
            className="w-full text-base font-semibold py-2"
          >
            <Link to={`/campaigns/create?template=${template.id}`}>
              <span className="mr-2 text-xl">📩</span> Use Template
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};