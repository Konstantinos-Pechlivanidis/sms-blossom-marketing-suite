
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Lock, 
  User,
  Save,
  Eye,
  EyeOff
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [profileData, setProfileData] = useState({
    fullName: "John Smith",
    email: "john.smith@bellasboutique.com",
    phone: "+1 (555) 123-4567"
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });

  const [loading, setLoading] = useState({
    password: false,
    profile: false
  });

  const handlePasswordUpdate = async () => {
    // Basic validation
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setLoading(prev => ({ ...prev, password: true }));
    
    // Simulate API call
    setTimeout(() => {
      setLoading(prev => ({ ...prev, password: false }));
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Password updated successfully!");
    }, 1500);
  };

  const handleProfileUpdate = async () => {
    // Basic validation
    if (!profileData.fullName || !profileData.email) {
      toast.error("Please fill in required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(prev => ({ ...prev, profile: true }));
    
    // Simulate API call
    setTimeout(() => {
      setLoading(prev => ({ ...prev, profile: false }));
      toast.success("Profile updated successfully!");
    }, 1500);
  };

  const togglePasswordVisibility = (field: 'old' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Change Password Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="mr-2 h-5 w-5 text-[#81D8D0]" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="oldPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="oldPassword"
                type={showPasswords.old ? "text" : "password"}
                value={passwordData.oldPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, oldPassword: e.target.value }))}
                placeholder="Enter your current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility('old')}
              >
                {showPasswords.old ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPasswords.new ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                placeholder="Enter new password (min. 6 characters)"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPasswords.new ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPasswords.confirm ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirm your new password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button 
            onClick={handlePasswordUpdate}
            disabled={loading.password}
            className="bg-[#81D8D0] hover:bg-[#5FBDB7] text-white w-full sm:w-auto"
          >
            {loading.password ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Update Password
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Edit Personal Info Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5 text-[#81D8D0]" />
            Edit Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={profileData.fullName}
              onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter your phone number"
            />
          </div>

          <Button 
            onClick={handleProfileUpdate}
            disabled={loading.profile}
            className="bg-[#81D8D0] hover:bg-[#5FBDB7] text-white w-full sm:w-auto"
          >
            {loading.profile ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
