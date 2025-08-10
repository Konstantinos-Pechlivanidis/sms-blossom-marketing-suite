import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


interface PageHeaderProps {
  title: string;
  description?: string;
  backTo?: string;
  children?: React.ReactNode;
}

export const PageHeader = ({ title, description, backTo, children }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {backTo && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate(backTo)}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      )}
      
      <div className="flex flex-col md:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground mt-2">
              {description}
            </p>
          )}
        </div>
        {children && (
          <div className="flex-shrink-0">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};