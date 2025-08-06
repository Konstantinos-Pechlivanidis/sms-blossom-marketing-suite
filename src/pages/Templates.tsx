
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateFilters } from "@/components/templates/TemplateFilters";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { templates } from "@/data/mockData";

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Coffee Shops", "Gyms", "Fashion Stores", "Beauty", "Restaurants"];


  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      "Coffee Shops": "bg-amber-100 text-amber-800",
      "Gyms": "bg-red-100 text-red-800",
      "Fashion Stores": "bg-purple-100 text-purple-800",
      "Beauty": "bg-pink-100 text-pink-800",
      "Restaurants": "bg-orange-100 text-orange-800",
      "All": "bg-gray-100 text-gray-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="SMS Templates"
        description="High-converting SMS templates proven by successful businesses"
      />

      <TemplateFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            getCategoryColor={getCategoryColor}
          />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Templates;
