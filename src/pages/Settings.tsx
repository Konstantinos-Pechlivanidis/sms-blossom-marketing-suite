
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Store, 
  Phone, 
  Globe, 
  CreditCard, 
  Key, 
  Bell,
  Users,
  Shield,
  Crown,
  Copy
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [storeData, setStoreData] = useState({
    name: "Bella's Boutique",
    phone: "+1 (555) 123-4567",
    email: "hello@bellasboutique.com",
    website: "www.bellasboutique.com",
    language: "en",
    timezone: "America/New_York"
  });

  const [apiKey] = useState("sk_live_51H7zNkB2e1K8XxHpQqVv3mN9jR8yT4cL2fG6wE9");

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("API key copied to clipboard!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your store settings and preferences</p>
      </div>

      {/* Store Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Store className="mr-2 h-5 w-5 text-[#81D8D0]" />
            Store Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                value={storeData.name}
                onChange={(e) => setStoreData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={storeData.phone}
                onChange={(e) => setStoreData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={storeData.email}
                onChange={(e) => setStoreData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={storeData.website}
                onChange={(e) => setStoreData(prev => ({ ...prev, website: e.target.value }))}
              />
            </div>
          </div>
          
          <Button onClick={handleSave} className="bg-[#81D8D0] hover:bg-[#5FBDB7]">
            Save Store Information
          </Button>
        </CardContent>
      </Card>

      {/* Account & Billing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-blue-600" />
            Account & Billing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
            <div className="flex items-center space-x-3">
              <Crown className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Pro Plan</h3>
                <p className="text-sm text-gray-600">Unlimited campaigns, advanced analytics</p>
              </div>
            </div>
            <Badge className="bg-purple-100 text-purple-800">Active</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">SMS Credits</p>
                    <p className="text-2xl font-bold text-[#81D8D0]">2,847</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Buy More
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Next Billing</p>
                    <p className="text-lg font-semibold text-gray-900">Feb 15, 2024</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5 text-green-600" />
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={storeData.language} onValueChange={(value) => setStoreData(prev => ({ ...prev, language: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={storeData.timezone} onValueChange={(value) => setStoreData(prev => ({ ...prev, timezone: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="mr-2 h-5 w-5 text-orange-600" />
            API Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="apiKey">API Key</Label>
            <div className="flex space-x-2">
              <Input
                id="apiKey"
                value={apiKey}
                readOnly
                className="font-mono text-sm"
              />
              <Button variant="outline" onClick={handleCopyApiKey}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Use this key to integrate with our API. Keep it secure and don't share it.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-yellow-600" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Campaign Results</h4>
                <p className="text-sm text-gray-600">Get notified when campaigns complete</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Low SMS Credits</h4>
                <p className="text-sm text-gray-600">Alert when credits are running low</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Weekly Reports</h4>
                <p className="text-sm text-gray-600">Receive weekly performance summaries</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-red-600" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline">
              Change Password
            </Button>
            <Button variant="outline">
              Enable 2FA
            </Button>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-800 mb-2">Danger Zone</h4>
            <p className="text-sm text-red-600 mb-3">
              Permanently delete your account and all associated data.
            </p>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
