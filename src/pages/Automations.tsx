import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Gift, 
  Star, 
  ShoppingBag, 
  Calendar,
  UserPlus,
  Clock,
  TrendingUp,
  MessageSquare,
  Zap,
  Settings,
  Edit
} from "lucide-react";
import { toast } from "sonner";
import EditAutomationModal from "@/components/EditAutomationModal";

const Automations = () => {
  const [automations, setAutomations] = useState([
    {
      id: 1,
      title: "Birthday Rewards",
      description: "Send special offers on customer birthdays",
      trigger: "Birthday",
      message: "🎂 Happy Birthday [Name]! Enjoy 30% off your next visit as our gift to you! Use code BDAY30",
      active: true,
      icon: Gift,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      stats: { sent: 89, converted: 23 }
    },
    {
      id: 2,
      title: "Post-Purchase Review Request",
      description: "Ask for Google reviews after successful purchases",
      trigger: "Purchase Completion",
      message: "Thanks for your purchase! 🌟 Love your experience? Leave us a review: [review_link]",
      active: true,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      stats: { sent: 156, converted: 45 }
    },
    {
      id: 3,
      title: "Loyalty Milestone Rewards",
      description: "Reward customers after 10 purchases",
      trigger: "10th Purchase",
      message: "🎉 Congratulations! You've made 10 purchases. Here's 20% off your next order: CODE20",
      active: false,
      icon: ShoppingBag,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      stats: { sent: 23, converted: 8 }
    },
    {
      id: 4,
      title: "Inactive Customer Win-Back",
      description: "Re-engage customers who haven't visited in 30+ days",
      trigger: "30 Days Inactive",
      message: "We miss you! 💙 Come back and enjoy 25% off your next visit. Code: COMEBACK25",
      active: true,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      stats: { sent: 67, converted: 12 }
    },
    {
      id: 5,
      title: "New Customer Welcome",
      description: "Welcome new customers with a special offer",
      trigger: "First Purchase",
      message: "Welcome to Bella's Boutique! 👋 Here's 15% off your next purchase: WELCOME15",
      active: true,
      icon: UserPlus,
      color: "text-green-600",
      bgColor: "bg-green-100",
      stats: { sent: 234, converted: 78 }
    },
    {
      id: 6,
      title: "VIP High Spender Alert",
      description: "Thank high-value customers and offer VIP perks",
      trigger: "High Spend ($500+)",
      message: "🌟 You're now a VIP customer! Enjoy free shipping, early access & exclusive discounts",
      active: false,
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      stats: { sent: 12, converted: 9 }
    }
  ]);

  const [editingAutomation, setEditingAutomation] = useState<typeof automations[0] | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleAutomation = (id: number) => {
    setAutomations(prev => prev.map(automation => {
      if (automation.id === id) {
        const newActive = !automation.active;
        toast.success(
          newActive 
            ? `"${automation.title}" automation activated` 
            : `"${automation.title}" automation deactivated`
        );
        return { ...automation, active: newActive };
      }
      return automation;
    }));
  };

  const handleEditAutomation = (automation: typeof automations[0]) => {
    setEditingAutomation(automation);
    setIsEditModalOpen(true);
  };

  const handleSaveAutomation = (updatedAutomation: typeof automations[0]) => {
    setAutomations(prev => prev.map(automation => 
      automation.id === updatedAutomation.id ? updatedAutomation : automation
    ));
    setIsEditModalOpen(false);
    setEditingAutomation(null);
  };

  const activeAutomations = automations.filter(a => a.active).length;
  const totalSent = automations.reduce((sum, a) => sum + a.stats.sent, 0);
  const totalConverted = automations.reduce((sum, a) => sum + a.stats.converted, 0);
  const avgConversionRate = totalSent > 0 ? ((totalConverted / totalSent) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Automations</h1>
        <p className="text-gray-600">Set up automated SMS campaigns that trigger based on customer behavior</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Automations</p>
                <p className="text-2xl font-bold text-[#81D8D0]">{activeAutomations}</p>
              </div>
              <Zap className="h-8 w-8 text-[#81D8D0]" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages Sent</p>
                <p className="text-2xl font-bold text-blue-600">{totalSent}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversions</p>
                <p className="text-2xl font-bold text-green-600">{totalConverted}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Conv. Rate</p>
                <p className="text-2xl font-bold text-purple-600">{avgConversionRate}%</p>
              </div>
              <Star className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automation Rules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Automation Rules</h2>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Configure Settings
          </Button>
        </div>

        {automations.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No automations configured</h3>
            <p className="text-muted-foreground mb-4">Set up automated SMS campaigns to engage customers based on their behavior</p>
            <Button className="bg-primary hover:bg-primary/90">
              <Settings className="w-4 h-4 mr-2" />
              Create Automation
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {automations.map((automation) => (
            <Card key={automation.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${automation.bgColor}`}>
                      <automation.icon className={`h-6 w-6 ${automation.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{automation.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{automation.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditAutomation(automation)}
                      className="shrink-0"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Switch
                      checked={automation.active}
                      onCheckedChange={() => toggleAutomation(automation.id)}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        Trigger: {automation.trigger}
                      </Badge>
                      <Badge 
                        className={automation.active 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                        }
                      >
                        {automation.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <MessageSquare className="inline h-4 w-4 mr-1 text-gray-400" />
                        {automation.message}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{automation.stats.sent}</p>
                      <p className="text-xs text-gray-500">Sent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{automation.stats.converted}</p>
                      <p className="text-xs text-gray-500">Converted</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-[#81D8D0]">
                        {automation.stats.sent > 0 
                          ? ((automation.stats.converted / automation.stats.sent) * 100).toFixed(1)
                          : "0"
                        }%
                      </p>
                      <p className="text-xs text-gray-500">Rate</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        )}
      </div>

      {/* Tips Section */}
      <Card className="bg-gradient-to-r from-[#81D8D0]/10 to-[#5FBDB7]/10 border-[#81D8D0]/20">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Automation Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Best Practices:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Keep messages personal and relevant</li>
                <li>• Test different timing for triggers</li>
                <li>• Monitor conversion rates regularly</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">High-Converting Triggers:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Post-purchase thank you messages</li>
                <li>• Birthday and anniversary offers</li>
                <li>• Win-back campaigns for inactive users</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Automation Modal */}
      <EditAutomationModal
        automation={editingAutomation}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingAutomation(null);
        }}
        onSave={handleSaveAutomation}
      />
    </div>
  );
};

export default Automations;
