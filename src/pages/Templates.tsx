
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Star, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Coffee Shops", "Gyms", "Fashion Stores", "Beauty", "Restaurants"];

  const templates = [
    {
      id: 1,
      title: "Weekend Flash Sale",
      category: "Fashion Stores",
      conversionRate: "32%",
      message: "🎉 FLASH SALE! 50% off everything this weekend only! Use code WEEKEND50. Shop now: [link]",
      testimonial: "Increased weekend sales by 200%! - Maria, boutique owner",
      rating: 4.9
    },
    {
      id: 2,
      title: "New Member Welcome",
      category: "Gyms",
      conversionRate: "28%",
      message: "Welcome to FitLife! 💪 Your first personal training session is FREE. Book now: [link]",
      testimonial: "Perfect for converting trial members - Jake, gym manager",
      rating: 4.8
    },
    {
      id: 3,
      title: "Daily Coffee Special",
      category: "Coffee Shops",
      conversionRate: "24%",
      message: "☕ Today's special: Buy any large coffee, get a pastry FREE! Valid until 3 PM.",
      testimonial: "Boosts afternoon sales every time - Emma, café owner",
      rating: 4.7
    },
    {
      id: 4,
      title: "Appointment Reminder",
      category: "Beauty",
      conversionRate: "45%",
      message: "Hi [Name]! Reminder: Your appointment is tomorrow at [time]. Reply CONFIRM or call us.",
      testimonial: "Reduced no-shows by 60% - Lisa, salon owner",
      rating: 4.9
    },
    {
      id: 5,
      title: "Birthday Surprise",
      category: "All",
      conversionRate: "38%",
      message: "🎂 Happy Birthday [Name]! Enjoy 30% off your next visit as our gift to you! Code: BDAY30",
      testimonial: "Creates such a personal touch - customers love it!",
      rating: 4.8
    },
    {
      id: 6,
      title: "Lunch Rush Special",
      category: "Restaurants",
      conversionRate: "29%",
      message: "🍽️ Lunch Special: Any main dish + drink for $12.99! Available until 3 PM today.",
      testimonial: "Perfect for slow lunch hours - Tony, restaurant owner",
      rating: 4.6
    },
    {
      id: 7,
      title: "Class Reminder",
      category: "Gyms",
      conversionRate: "41%",
      message: "Don't forget! Your yoga class starts in 1 hour. See you there! 🧘‍♀️",
      testimonial: "Attendance improved significantly - Sarah, instructor",
      rating: 4.8
    },
    {
      id: 8,
      title: "Seasonal Promotion",
      category: "Fashion Stores",
      conversionRate: "35%",
      message: "🍂 Fall Collection is here! 40% off all sweaters and jackets. Limited time!",
      testimonial: "Great for seasonal inventory - Rachel, store manager",
      rating: 4.7
    }
  ];

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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SMS Templates</h1>
        <p className="text-gray-600">High-converting SMS templates proven by successful businesses</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-[#81D8D0] hover:bg-[#5FBDB7]" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow duration-200">
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
                  <p className="text-sm text-gray-500">Conversion Rate</p>
                  <p className="text-xl font-bold text-[#81D8D0]">{template.conversionRate}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{template.message}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-700 italic">"{template.testimonial}"</p>
                </div>
                
                <Button 
                  asChild 
                  className="w-full bg-[#81D8D0] hover:bg-[#5FBDB7]"
                >
                  <Link to={`/create-campaign?template=${template.id}`}>
                    📩 Use Template
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Templates;
