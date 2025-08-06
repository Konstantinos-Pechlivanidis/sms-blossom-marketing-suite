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
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "draft":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      case "failed":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "active":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-muted text-muted-foreground hover:bg-muted/80";
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