import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ErrorStateProps {
  onRetry?: () => void;
  title?: string;
  description?: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  onRetry,
  title,
  description,
  className = ""
}) => {
  const { t } = useTranslation();

  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {title || "Something went wrong"}
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            {description || "We encountered an error while loading the data. Please try again."}
          </p>
        </div>

        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="mt-4">
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
};