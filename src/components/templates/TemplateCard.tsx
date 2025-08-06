import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

interface Template {
  id: number;
  title: string;
  category: string;
  conversionRate: string;
  message: string;
  testimonial: string;
  rating: number;
}

interface TemplateCardProps {
  template: Template;
  getCategoryColor: (category: string) => string;
}

export const TemplateCard = ({ template, getCategoryColor }: TemplateCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-lg">{template.title}</CardTitle>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{template.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Badge className={getCategoryColor(template.category)}>
            {template.category}
          </Badge>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Conversion Rate</p>
            <p className="text-xl font-bold text-primary">{template.conversionRate}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="flex items-start space-x-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{template.message}</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-700 italic">"{template.testimonial}"</p>
          </div>
          
          <Button 
            asChild 
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Link to={`/create-campaign?template=${template.id}`}>
              📩 Use Template
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};