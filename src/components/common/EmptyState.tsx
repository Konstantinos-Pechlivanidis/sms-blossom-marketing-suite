import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MessageSquare, PlusCircle, LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const EmptyState = ({
  icon: Icon = MessageSquare,
  title,
  description,
  ctaText,
  ctaLink,
}: EmptyStateProps) => {
  const { t } = useTranslation();
  return (
    <div className="text-center py-12">
      <Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-4">{description}</p>
      )}
      {ctaText && ctaLink && (
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link to={ctaLink}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {ctaText}
          </Link>
        </Button>
      )}
    </div>
  );
};