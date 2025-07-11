
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Store, 
  Palette, 
  MessageSquare, 
  Bell,
  Upload,
  Save
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [businessData, setBusinessData] = useState({
    name: "Bella's Boutique",
    phone: "+1 (555) 123-4567",
    email: "hello@bellasboutique.com",
    address: "123 Fashion Ave, Style City, SC 12345"
  });

  const [brandingData, setBrandingData] = useState({
    primaryColor: "#81D8D0"
  });

  const [smsData, setSmsData] = useState({
    senderName: "Bella's Boutique",
    signature: "Thanks for shopping with us! - Bella's Boutique"
  });

  const [notifications, setNotifications] = useState({
    campaignPerformance: true,
    billingUpdates: true,
    automationActivity: false
  });

  const colorOptions = [
    { name: "Tiffany Blue", value: "#81D8D0" },
    { name: "Coral", value: "#FF6B6B" },
    { name: "Lavender", value: "#A8E6CF" },
    { name: "Gold", value: "#FFD93D" },
    { name: "Rose", value: "#FF8B94" },
    { name: "Mint", value: "#95E1D3" }
  ];

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleLogoUpload = () => {
    toast.success("Logo uploaded successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your business settings and preferences</p>
      </div>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Store className="mr-2 h-5 w-5 text-[#81D8D0]" />
            Business Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={businessData.name}
                onChange={(e) => setBusinessData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="businessPhone">Phone Number</Label>
              <Input
                id="businessPhone"
                value={businessData.phone}
                onChange={(e) => setBusinessData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="businessEmail">Email Address</Label>
              <Input
                id="businessEmail"
                type="email"
                value={businessData.email}
                onChange={(e) => setBusinessData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="businessAddress">Address</Label>
              <Input
                id="businessAddress"
                value={businessData.address}
                onChange={(e) => setBusinessData(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Branding */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="mr-2 h-5 w-5 text-[#81D8D0]" />
            Branding
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Upload */}
          <div>
            <Label>Business Logo</Label>
            <div className="mt-2 flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <Store className="h-6 w-6 text-gray-400" />
              </div>
              <Button variant="outline" onClick={handleLogoUpload}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Logo
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Recommended: 200x200px, PNG or JPG
            </p>
          </div>

          <Separator />

          {/* Primary Color */}
          <div>
            <Label>Primary Brand Color</Label>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-6 gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setBrandingData(prev => ({ ...prev, primaryColor: color.value }))}
                  className={`w-full h-12 rounded-lg border-2 transition-all ${
                    brandingData.primaryColor === color.value 
                      ? 'border-gray-900 scale-105' 
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Selected: {colorOptions.find(c => c.value === brandingData.primaryColor)?.name}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SMS Sender Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-[#81D8D0]" />
            SMS Sender Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="senderName">Sender Name</Label>
            <Input
              id="senderName"
              value={smsData.senderName}
              onChange={(e) => setSmsData(prev => ({ ...prev, senderName: e.target.value }))}
              placeholder="Your Business Name"
            />
            <p className="text-xs text-gray-500 mt-1">
              This name will appear as the sender of your SMS messages
            </p>
          </div>
          
          <div>
            <Label htmlFor="smsSignature">SMS Signature (Optional)</Label>
            <Textarea
              id="smsSignature"
              value={smsData.signature}
              onChange={(e) => setSmsData(prev => ({ ...prev, signature: e.target.value }))}
              placeholder="Add a signature to appear at the end of your messages"
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">
              This will be automatically added to the end of your SMS messages
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-[#81D8D0]" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Campaign Performance</h4>
                <p className="text-sm text-gray-600">Get notified about campaign results and analytics</p>
              </div>
              <Switch
                checked={notifications.campaignPerformance}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, campaignPerformance: checked }))
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Billing Updates</h4>
                <p className="text-sm text-gray-600">Receive notifications about billing and payments</p>
              </div>
              <Switch
                checked={notifications.billingUpdates}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, billingUpdates: checked }))
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Automation Activity</h4>
                <p className="text-sm text-gray-600">Get alerts when automated campaigns are triggered</p>
              </div>
              <Switch
                checked={notifications.automationActivity}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, automationActivity: checked }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          className="bg-[#81D8D0] hover:bg-[#5FBDB7] text-white px-8"
        >
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
