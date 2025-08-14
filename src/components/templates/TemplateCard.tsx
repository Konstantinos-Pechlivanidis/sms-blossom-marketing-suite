import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, PlusCircle, Tag, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Template } from "@/types";

interface TemplateCardProps {
  template: Template;
  onUse: (template: Template) => void;
  onPreview: (template: Template) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onUse, onPreview }) => {
  const { t } = useTranslation();

  return (
    <Card 
      className="rounded-3xl shadow-soft-lg border-0 flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]"
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-bold">{template.name}</CardTitle>
            <Badge variant="secondary" className="rounded-full shrink-0 py-1 px-3 text-xs">
                <Tag className="w-3 h-3 mr-1.5" />
                {template.category}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
          {template.preview}
        </p>
        {template.conversionRate && (
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
             <div className="p-2 bg-background rounded-full shadow-sm">
               <TrendingUp className="w-4 h-4 text-success" />
             </div>
             <div>
               <p className="text-xs text-muted-foreground">{t('campaigns.conversionRate')}</p>
               <p className="font-bold text-base text-foreground">{template.conversionRate}</p>
             </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end items-center gap-2 pt-4 mt-2 border-t">
        <Button variant="ghost" size="sm" className="rounded-full" onClick={() => onPreview(template)}>
            <Eye className="w-4 h-4" />
            {t('common.preview')}
        </Button>
        <Button size="sm" className="rounded-full" onClick={() => onUse(template)}>
            <PlusCircle className="w-4 h-4" />
            {t('common.use')}
        </Button>
      </CardFooter>
    </Card>
  );
};