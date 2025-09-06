 
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Lock,
  User,
  Save,
  Eye,
  EyeOff,
  Phone,
  Mail,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import {
  useCurrentUser,
  useUpdateUser,
  useUpdatePassword,
} from "@/hooks/api/useUser";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const Settings = () => {
  const { t } = useTranslation();
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const updateUserMutation = useUpdateUser();
  const updatePasswordMutation = useUpdatePassword();

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  const handlePasswordUpdate = async () => {
    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.error(t("settings.password.errors.fillFields"));
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error(t("settings.password.errors.minLength"));
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error(t("settings.password.errors.match"));
      return;
    }

    updatePasswordMutation.mutate(
      {
        currentPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      },
      {
        onSuccess: () => {
          setPasswordData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          toast.success(t("settings.password.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const handleProfileUpdate = async () => {
    if (!profileData.fullName || !profileData.email) {
      toast.error(t("settings.profile.errors.requiredFields"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      toast.error(t("settings.profile.errors.validEmail"));
      return;
    }

    updateUserMutation.mutate(
      {
        name: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
      },
      {
        onSuccess: () => {
          toast.success(t("settings.profile.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
  <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8 bg-background">
    {/* Header */}
    <header className="mb-10 text-center sm:text-left space-y-2">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">{t('settings.title')}</h1>
      <p className="text-lg text-muted-foreground">{t('settings.description')}</p>
    </header>

    {/* Responsive Grid Layout */}
    <div className="grid gap-10 md:grid-cols-2">
      {/* Profile Section */}
      <Card className="rounded-3xl border border-border bg-white/60 backdrop-blur-md shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
            <User className="h-5 w-5" />
            {t('settings.profile.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {userLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full rounded-2xl" />
              <Skeleton className="h-12 w-full rounded-2xl" />
              <Skeleton className="h-12 w-full rounded-2xl" />
              <Skeleton className="h-12 w-36 rounded-full" />
            </div>
          ) : (
            <>
              {/* Full Name */}
              <div className="space-y-1">
                <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-2 text-muted-foreground">                  {t('settings.profile.fullName')} *
                </Label>
                <Input
                  id="fullName"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder={t('settings.profile.fullNamePlaceholder')}
                  className="rounded-xl text-sm sm:text-base leading-tight"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2 text-muted-foreground">                  {t('settings.profile.email')} *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder={t('settings.profile.emailPlaceholder')}
                  className="rounded-xl text-sm sm:text-base leading-tight"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2 text-muted-foreground">                  {t('settings.profile.phone')}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder={t('settings.profile.phonePlaceholder')}
                  className="rounded-xl text-sm sm:text-sm leading-tight"
                />
              </div>

              {/* Save Profile Button */}
              <Button
                onClick={handleProfileUpdate}
                disabled={updateUserMutation.isPending}
                className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/90 shadow-md"
              >
                {updateUserMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t('common.saving')}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {t('settings.profile.saveButton')}
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Password Section */}
      <Card className="rounded-3xl border border-border bg-white/60 backdrop-blur-md shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
            <Lock className="h-5 w-5" />
            {t('settings.password.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {['current', 'new', 'confirm'].map((field) => (
            <div key={field} className="space-y-1">
              <Label htmlFor={`${field}Password`} className="text-sm font-medium flex items-center gap-2 text-muted-foreground">                {t(`settings.password.${field}`)}
              </Label>
              <div className="relative">
                <Input
                  id={`${field}Password`}
                  type={showPasswords[field] ? 'text' : 'password'}
                  value={passwordData[`${field}Password`]}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, [`${field}Password`]: e.target.value }))}
                  placeholder={t(`settings.password.${field}Placeholder`)}
                  className="rounded-xl text-sm sm:text-base leading-tight pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility(field as 'old' | 'new' | 'confirm')}
                >
                  {showPasswords[field] ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          ))}

          {/* Save Password Button */}
          <Button
            onClick={handlePasswordUpdate}
            disabled={updatePasswordMutation.isPending}
            className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/90 shadow-md"
          >
            {updatePasswordMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t('common.updating')}
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {t('settings.password.saveButton')}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

};

export default Settings;
