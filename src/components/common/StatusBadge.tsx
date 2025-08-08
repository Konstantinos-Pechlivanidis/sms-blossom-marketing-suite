import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const getStatusStyles = (status: string) => {
  const normalizedStatus = status.toLowerCase();

  switch (normalizedStatus) {
    case "sent":
    case "active":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "scheduled":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "draft":
    case "inactive":
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    case "failed":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-muted text-muted-foreground hover:bg-muted/80";
  }
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <Badge
      variant="default" // You can keep a default or remove it
      className={cn(getStatusStyles(status), className)}
    >
      {status}
    </Badge>
  );
};
