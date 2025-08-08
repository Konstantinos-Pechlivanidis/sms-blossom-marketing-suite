import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "outline" | "secondary" | "destructive";
  className?: string;
}

export const StatusBadge = ({ status, variant = "default", className }: StatusBadgeProps) => {
  const getStatusStyles = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    
    switch (normalizedStatus) {
      case "sent":
        return "bg-success-light text-success hover:bg-success-light/80 border-success/20";
      case "scheduled":
        return "bg-info-light text-info hover:bg-info-light/80 border-info/20";
      case "draft":
        return "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-200";
      case "failed":
        return "bg-error-light text-error hover:bg-error-light/80 border-error/20";
      case "active":
        return "bg-success-light text-success hover:bg-success-light/80 border-success/20";
      case "inactive":
        return "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-200";
      default:
        return "bg-muted text-muted-foreground hover:bg-muted/80 border-muted/20";
    }
  };

  return (
    <Badge 
      variant={variant}
      className={cn(getStatusStyles(status), className)}
    >
      {status}
    </Badge>
  );
};