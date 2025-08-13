import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, PlusCircle, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Template } from "@/types";

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  const { t } = useTranslation();

  return (
    <Card 
      className="rounded-3xl shadow-soft-lg border-0 flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]"
    >
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-lg font-bold truncate">{template.name}</CardTitle>
            <Badge variant="secondary" className="rounded-full shrink-0 py-1 px-3">
                <Tag className="w-3 h-3 mr-1.5" />
                {template.category}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {template.preview}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end items-center gap-2 pt-4 mt-2 border-t">
        <Button variant="ghost" size="sm" className="rounded-full">
            <Eye className="w-4 h-4 mr-2" />
            {t('common.preview')}
        </Button>
        <Button size="sm" className="rounded-full" onClick={() => onSelect(template)}>
            <PlusCircle className="w-4 h-4 mr-2" />
            {t('common.use')}
        </Button>
      </CardFooter>
    </Card>
  );
};