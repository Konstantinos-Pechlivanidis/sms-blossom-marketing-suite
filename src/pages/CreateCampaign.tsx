import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Sparkles,
  Users,
  Calendar,
  Send,
  Save,
  Smartphone,
  Clock,
  Repeat,
  ArrowLeft,
  Link as LinkIcon
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { campaignSteps } from "@/constants/campaign-steps";
import { StepProgress } from "@/components/campaign/StepProgress";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { campaigns as mockCampaigns } from '@/data/mock-data';

const CreateCampaign = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    id: '',
    name: "",
    category: "",
    audience: "",
    message: "",
    scheduleType: "now",
    scheduleDate: "",
    scheduleTime: "",
    isRecurring: false,
    recurringDays: [] as string[],
    recurringEndDate: "",
    status: "Draft"
  });

  const [aiMessage, setAiMessage] = useState("");
  const [useAiVersion, setUseAiVersion] = useState(false);

  const [audienceCounts] = useState({
    "all": 2847,
    "women": 1623,
    "men": 1224,
    "vip": 284,
    "new": 156,
    "inactive": 89
  });

  const weekDays = [
    { id: "monday", label: t('createCampaign.recurring.days.mon') },
    { id: "tuesday", label: t('createCampaign.recurring.days.tue') },
    { id: "wednesday", label: t('createCampaign.recurring.days.wed') },
    { id: "thursday", label: "createCampaign.recurring.days.thu" }, 
    { id: "friday", label: t('createCampaign.recurring.days.fri') },
    { id: "saturday", label: t('createCampaign.recurring.days.sat') },
    { id: "sunday", label: t('createCampaign.recurring.days.sun') }
  ];

  useEffect(() => {
    const { campaignToEdit } = location.state || {};
    if (campaignToEdit) {
      setCampaignData({
        id: campaignToEdit.id,
        name: campaignToEdit.name,
        category: campaignToEdit.category,
        audience: campaignToEdit.audience,
        message: campaignToEdit.message || campaignToEdit.preview,
        scheduleType: campaignToEdit.scheduleType,
        scheduleDate: "",
        scheduleTime: "",
        isRecurring: false,
        recurringDays: [],
        recurringEndDate: "",
        status: campaignToEdit.status
      });
      setAiMessage(campaignToEdit.message);
      setUseAiVersion(false);
      // If it's a template, start from step 1, otherwise it's an edit of an existing campaign
      setCurrentStep(campaignToEdit.preview ? 1 : 3);
      if (campaignToEdit.preview) {
        toast.info(t('createCampaign.notifications.templateLoaded', { name: campaignToEdit.name }));
      } else {
        toast.info(t('createCampaign.editTitle') + ': ' + campaignToEdit.name);
      }
    }
  }, [location.state, t]);

  const getActiveMessage = () => {
    return useAiVersion && aiMessage ? aiMessage : campaignData.message;
  };

  const updateMessage = (message: string) => {
    setCampaignData(prev => ({ ...prev, message }));
  };
  
  const generateTrackingLink = () => {
    const campaignId = campaignData.id || Math.random().toString(36).substring(2, 10);
    return `https://yourapp.com/track/${campaignId}`;
  };

  const trackingLink = generateTrackingLink();

  const getFullMessage = () => {
    const baseMessage = getActiveMessage();
    if (!baseMessage) return t('createCampaign.preview.placeholder');
    return `${baseMessage}\n\n📱 ${t('createCampaign.preview.link')}: ${trackingLink}`;
  };

  const steps = campaignSteps.map(step => {
    switch (step.id) {
      case 1:
        return { ...step, completed: !!(campaignData.name && campaignData.category) };
      case 2:
        return { ...step, completed: !!campaignData.audience };
      case 3:
        return { ...step, completed: !!getActiveMessage() };
      default:
        return step;
    }
  });

  const canProceedToStep = (stepId: number) => {
    if (stepId <= currentStep) return true;
    
    switch (stepId) {
      case 2: return !!(campaignData.name && campaignData.category);
      case 3: return !!campaignData.audience;
      case 4: return !!getActiveMessage();
      default: return false;
    }
  };

  const goToStep = (stepId: number) => {
    if (canProceedToStep(stepId)) {
      setCurrentStep(stepId);
    }
  };

  const handleAiImprove = () => {
    const aiVersions = [
      "🎉 EXCLUSIVE: 50% OFF EVERYTHING this weekend! Don't miss out - use WEEKEND50 at checkout. Limited time only!",
      "⚡ FLASH ALERT: Half price on ALL items this weekend! Use code WEEKEND50. Hurry - sale ends Sunday!",
      "🛍️ Weekend Special: 50% discount sitewide! Code: WEEKEND50. Two days only - don't wait!"
    ];
    
    const randomAiVersion = aiVersions[Math.floor(Math.random() * aiVersions.length)];
    setAiMessage(randomAiVersion);
    setUseAiVersion(true);
    toast.success(t('createCampaign.ai.success'));
  };

  const handleSendCampaign = () => {
    if (campaignData.isRecurring && campaignData.recurringDays.length === 0) {
      toast.error(t('createCampaign.recurring.selectDayError'));
      return;
    }
    
    const message = campaignData.isRecurring 
      ? t('createCampaign.success.recurring', { days: campaignData.recurringDays.join(', ') })
      : t('createCampaign.success.sent');
    
    toast.success(message);
    navigate("/campaigns");
  };

  const handleSaveDraft = () => {
    toast.success(t('createCampaign.success.draft'));
    navigate("/campaigns");
  };

  const handleSchedule = () => {
    if (campaignData.isRecurring && campaignData.recurringDays.length === 0) {
      toast.error(t('createCampaign.recurring.selectDayError'));
      return;
    }
    
    const message = campaignData.isRecurring
      ? t('createCampaign.success.recurring', { days: campaignData.recurringDays.join(', ') })
      : t('createCampaign.success.scheduled');
    
    toast.success(message);
    navigate("/campaigns");
  };

  const handleRecurringDayToggle = (dayId: string) => {
    setCampaignData(prev => ({
      ...prev,
      recurringDays: prev.recurringDays.includes(dayId)
        ? prev.recurringDays.filter(id => id !== dayId)
        : [...prev.recurringDays, dayId]
    }));
  };

  const getCurrentTime = useCallback(() => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl">
        {/* Header with Back Button */}
        <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/campaigns")}
            className="text-muted-foreground hover:text-foreground rounded-full"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t('common.back')}
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground truncate">
              {campaignData.id ? t('createCampaign.editTitle') : t('createCampaign.title')}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">{t('createCampaign.description')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Form - Takes more space on desktop */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            {/* Steps Progress */}
            <StepProgress
              steps={steps}
              currentStep={currentStep}
              onStepClick={goToStep}
              canProceedToStep={canProceedToStep}
            />

            {/* Step 1: Campaign Details */}
            <Card className={cn("rounded-3xl border-border transition-all duration-300 shadow-soft-sm", currentStep === 1 ? "ring-2 ring-primary/20" : "opacity-60")}>
              <CardHeader 
                className="cursor-pointer p-4 sm:p-6 flex flex-row items-center justify-between" 
                onClick={() => goToStep(1)}
              >
                <CardTitle className="text-base sm:text-lg">
                  <span>{t('createCampaign.steps.step1.title')}</span>
                </CardTitle>
                {currentStep === 1 ? <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />}
              </CardHeader>
              {currentStep === 1 && (
                <CardContent className="space-y-4 animate-fade-in p-4 sm:p-6 pt-0">
                  <div className="space-y-2">
                    <Label htmlFor="campaignName" className="text-sm font-medium">{t('createCampaign.steps.step1.nameLabel')}</Label>
                    <Input
                      id="campaignName"
                      placeholder={t('createCampaign.steps.step1.namePlaceholder')}
                      value={campaignData.name}
                      onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full rounded-2xl border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">{t('createCampaign.steps.step1.categoryLabel')}</Label>
                    <Select value={campaignData.category} onValueChange={(value) => setCampaignData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger className="w-full rounded-2xl border-gray-300 dark:border-gray-700">
                        <SelectValue placeholder={t('createCampaign.steps.step1.categoryPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="promotion">{t('createCampaign.steps.step1.categoryOptions.promotion')}</SelectItem>
                        <SelectItem value="announcement">{t('createCampaign.steps.step1.categoryOptions.announcement')}</SelectItem>
                        <SelectItem value="reminder">{t('createCampaign.steps.step1.categoryOptions.reminder')}</SelectItem>
                        <SelectItem value="welcome">{t('createCampaign.steps.step1.categoryOptions.welcome')}</SelectItem>
                        <SelectItem value="follow-up">{t('createCampaign.steps.step1.categoryOptions.followUp')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={() => goToStep(2)}
                    disabled={!campaignData.name || !campaignData.category}
                    className="w-full sm:w-auto rounded-full"
                  >
                    {t('createCampaign.steps.next')}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              )}
            </Card>

            {/* Step 2: Target Audience */}
            <Card className={cn("rounded-3xl border-border transition-all duration-300 shadow-soft-sm", currentStep === 2 ? "ring-2 ring-primary/20" : "opacity-60")}>
              <CardHeader 
                className="cursor-pointer p-4 sm:p-6 flex flex-row items-center justify-between" 
                onClick={() => goToStep(2)}
              >
                <CardTitle className="text-base sm:text-lg">
                  <span>{t('createCampaign.steps.step2.title')}</span>
                </CardTitle>
                {currentStep === 2 ? <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />}
              </CardHeader>
              {currentStep === 2 && (
                <CardContent className="space-y-4 animate-fade-in p-4 sm:p-6 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { id: "all", label: t('contacts.filters.all'), count: audienceCounts.all, icon: "👥" },
                      { id: "women", label: t('contacts.filters.women'), count: audienceCounts.women, icon: "👩" },
                      { id: "men", label: t('contacts.filters.men'), count: audienceCounts.men, icon: "👨" },
                      { id: "vip", label: t('contacts.filters.vip'), count: audienceCounts.vip, icon: "💎" },
                      { id: "new", label: t('createCampaign.steps.step2.newCustomers'), count: audienceCounts.new, icon: "🆕" },
                      { id: "inactive", label: t('createCampaign.steps.step2.inactiveCustomers'), count: audienceCounts.inactive, icon: "😴" }
                    ].map((audience) => (
                      <Card 
                        key={audience.id}
                        className={cn("cursor-pointer transition-all rounded-2xl p-3 sm:p-4 hover:shadow-soft-md hover:bg-gray-50 dark:hover:bg-gray-800",
                          campaignData.audience === audience.id 
                            ? "border-primary bg-primary/5 shadow-soft-sm" 
                            : "border-gray-200 dark:border-gray-800"
                        )}
                        onClick={() => setCampaignData(prev => ({ ...prev, audience: audience.id }))}
                      >
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                              <span className="text-lg sm:text-2xl">{audience.icon}</span>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-sm sm:text-base truncate">{audience.label}</h4>
                                <p className="text-xs sm:text-sm text-muted-foreground">{audience.count.toLocaleString()} {t('contacts.actions.recipients')}</p>
                              </div>
                            </div>
                            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {campaignData.audience && (
                    <div className="bg-primary/10 border border-primary/20 p-3 sm:p-4 rounded-lg">
                      <p className="text-sm font-medium text-primary">
                        ✅ {t('createCampaign.steps.step2.selectedRecipients', { count: audienceCounts[campaignData.audience as keyof typeof audienceCounts] })}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => goToStep(1)}
                      className="w-full sm:w-auto rounded-full"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      {t('common.back')}
                    </Button>
                    <Button 
                      onClick={() => goToStep(3)}
                      disabled={!campaignData.audience}
                      className="w-full sm:flex-1 rounded-full bg-primary hover:bg-primary/90"
                    >
                      {t('createCampaign.steps.next')}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Step 3: Write Message */}
            <Card className={cn("rounded-3xl border-border transition-all duration-300 shadow-soft-sm", currentStep === 3 ? "ring-2 ring-primary/20" : "opacity-60")}>
              <CardHeader 
                className="cursor-pointer p-4 sm:p-6 flex flex-row items-center justify-between" 
                onClick={() => goToStep(3)}
              >
                <CardTitle className="text-base sm:text-lg">
                  <span>{t('createCampaign.steps.step3.title')}</span>
                </CardTitle>
                {currentStep === 3 ? <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />}
              </CardHeader>
              {currentStep === 3 && (
                <CardContent className="space-y-4 animate-fade-in p-4 sm:p-6 pt-0">
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">{t('createCampaign.steps.step3.messageLabel')}</Label>
                    <Textarea
                      id="message"
                      placeholder={t('createCampaign.steps.step3.messagePlaceholder')}
                      value={getActiveMessage()}
                      onChange={(e) => updateMessage(e.target.value)}
                      rows={4}
                      className="w-full resize-none rounded-2xl border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                    />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs sm:text-sm">
                      <p className="text-muted-foreground">
                        {t('createCampaign.steps.step3.charCount', { count: getActiveMessage().length })}
                      </p>
                      <Badge className={cn("rounded-full px-2 py-1 text-xs font-medium",
                        getActiveMessage().length > 160 
                          ? "bg-destructive/10 text-destructive" 
                          : "bg-success/10 text-success"
                      )}>
                        {getActiveMessage().length <= 160 ? t('createCampaign.steps.step3.singleSMS') : t('createCampaign.steps.step3.multiSMS')}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 p-3 sm:p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <LinkIcon className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-blue-800">{t('createCampaign.preview.linkAdded')}</p>
                        <p className="text-xs text-blue-600 mt-1">{t('createCampaign.preview.linkDescription', { link: trackingLink })}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      onClick={handleAiImprove}
                      className="w-full sm:flex-1 rounded-full"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      {t('createCampaign.ai.improveButton')}
                    </Button>
                    
                    {aiMessage && (
                      <Button
                        variant={useAiVersion ? "default" : "outline"}
                        onClick={() => setUseAiVersion(prev => !prev)}
                        className="w-full sm:flex-1 rounded-full"
                      >
                        {useAiVersion ? t('createCampaign.ai.useAI') : t('createCampaign.ai.original')}
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => goToStep(2)}
                      className="w-full sm:w-auto rounded-full"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      {t('common.back')}
                    </Button>
                    <Button 
                      onClick={() => goToStep(4)}
                      disabled={!getActiveMessage()}
                      className="w-full sm:flex-1 rounded-full bg-primary hover:bg-primary/90"
                    >
                      {t('createCampaign.steps.next')}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Step 4: Schedule & Send */}
            <Card className={cn("rounded-3xl border-border transition-all duration-300 shadow-soft-sm", currentStep === 4 ? "ring-2 ring-primary/20" : "opacity-60")}>
              <CardHeader 
                className="cursor-pointer p-4 sm:p-6 flex flex-row items-center justify-between"
                onClick={() => goToStep(4)}
              >
                <CardTitle className="text-base sm:text-lg">
                  <span>{t('createCampaign.steps.step4.title')}</span>
                </CardTitle>
                {currentStep === 4 ? <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />}
              </CardHeader>
              {currentStep === 4 && (
                <CardContent className="space-y-6 animate-fade-in p-4 sm:p-6 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <Card 
                      className={cn("cursor-pointer transition-all rounded-2xl p-3 sm:p-4 hover:shadow-soft-md",
                        campaignData.scheduleType === "now" ? "border-primary bg-primary/5 shadow-soft-sm" : "border-gray-200 dark:border-gray-800"
                      )}
                      onClick={() => setCampaignData(prev => ({ ...prev, scheduleType: "now", isRecurring: false }))}
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col items-center text-center">
                          <Send className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-primary" />
                          <h4 className="font-medium mb-1 text-sm sm:text-base">{t('createCampaign.steps.step4.sendNow')}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">{t('createCampaign.steps.step4.immediate')}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card 
                      className={cn("cursor-pointer transition-all rounded-2xl p-3 sm:p-4 hover:shadow-soft-md",
                        campaignData.scheduleType === "later" ? "border-primary bg-primary/5 shadow-soft-sm" : "border-gray-200 dark:border-gray-800"
                      )}
                      onClick={() => setCampaignData(prev => ({ ...prev, scheduleType: "later" }))}
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col items-center text-center">
                          <Calendar className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-info" />
                          <h4 className="font-medium mb-1 text-sm sm:text-base">{t('createCampaign.steps.step4.scheduleLater')}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">{t('createCampaign.steps.step4.chooseTime')}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card 
                      className={cn("cursor-pointer transition-all rounded-2xl p-3 sm:p-4 hover:shadow-soft-md",
                        campaignData.scheduleType === "draft" ? "border-primary bg-primary/5 shadow-soft-sm" : "border-gray-200 dark:border-gray-800"
                      )}
                      onClick={() => setCampaignData(prev => ({ ...prev, scheduleType: "draft", isRecurring: false }))}
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col items-center text-center">
                          <Save className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-muted-foreground" />
                          <h4 className="font-medium mb-1 text-sm sm:text-base">{t('createCampaign.steps.step4.saveDraft')}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">{t('createCampaign.steps.step4.sendLater')}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {campaignData.scheduleType === "later" && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="scheduleDate" className="text-sm font-medium">{t('createCampaign.steps.step4.date')}</Label>
                          <Input
                            id="scheduleDate"
                            type="date"
                            value={campaignData.scheduleDate}
                            onChange={(e) => setCampaignData(prev => ({ ...prev, scheduleDate: e.target.value }))}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full rounded-2xl border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="scheduleTime" className="text-sm font-medium">{t('createCampaign.steps.step4.time')}</Label>
                          <Input
                            id="scheduleTime"
                            type="time"
                            value={campaignData.scheduleTime}
                            onChange={(e) => setCampaignData(prev => ({ ...prev, scheduleTime: e.target.value }))}
                            className="w-full rounded-2xl border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Recurring Options */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="recurring"
                            checked={campaignData.isRecurring}
                            onCheckedChange={(checked) => setCampaignData(prev => ({ ...prev, isRecurring: !!checked }))}
                            className="rounded-md"
                          />
                          <Label htmlFor="recurring" className="flex items-center space-x-2 text-base font-medium text-muted-foreground">
                            <Repeat className="h-4 w-4" />
                            <span>{t('createCampaign.recurring.title')}</span>
                          </Label>
                        </div>

                        {campaignData.isRecurring && (
                          <div className="ml-6 space-y-3 animate-fade-in">
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">{t('createCampaign.recurring.selectDays')}</Label>
                              <div className="flex flex-wrap gap-2">
                                {weekDays.map((day) => (
                                  <Button
                                    key={day.id}
                                    variant={campaignData.recurringDays.includes(day.id) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleRecurringDayToggle(day.id)}
                                    className="min-w-[44px] text-xs font-medium rounded-full shadow-soft-sm"
                                  >
                                    {day.label}
                                  </Button>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="recurringEndDate" className="text-sm font-medium">{t('createCampaign.recurring.endDate')}</Label>
                              <Input
                                id="recurringEndDate"
                                type="date"
                                value={campaignData.recurringEndDate}
                                onChange={(e) => setCampaignData(prev => ({ ...prev, recurringEndDate: e.target.value }))}
                                min={campaignData.scheduleDate || new Date().toISOString().split('T')[0]}
                                className="w-full rounded-2xl border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                              />
                              <p className="text-xs text-muted-foreground">{t('createCampaign.recurring.forever')}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <Separator className="bg-gray-200 dark:bg-gray-700" />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => goToStep(3)}
                      className="w-full sm:w-auto rounded-full"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      {t('common.back')}
                    </Button>

                    {campaignData.scheduleType === "now" && (
                      <Button 
                        onClick={handleSendCampaign}
                        className="w-full sm:flex-1 rounded-full bg-primary hover:bg-primary/90"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        {t('createCampaign.steps.step4.sendNowButton')}
                      </Button>
                    )}
                    
                    {campaignData.scheduleType === "later" && (
                      <Button 
                        onClick={handleSchedule}
                        disabled={!campaignData.scheduleDate || !campaignData.scheduleTime}
                        className="w-full sm:flex-1 rounded-full bg-primary hover:bg-primary/90"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {campaignData.isRecurring ? t('createCampaign.recurring.scheduleRecurringButton') : t('createCampaign.steps.step4.scheduleButton')}
                      </Button>
                    )}
                    
                    {campaignData.scheduleType === "draft" && (
                      <Button 
                        onClick={handleSaveDraft}
                        variant="secondary"
                        className="w-full sm:flex-1 rounded-full"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {t('createCampaign.steps.step4.saveDraftButton')}
                      </Button>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Enhanced Mobile Preview - Responsive positioning */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 p-4 rounded-3xl bg-white dark:bg-gray-900 shadow-soft-lg">
              <Card className="border-none shadow-none">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <Smartphone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    {t('createCampaign.preview.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  {/* Realistic Phone Frame */}
                  <div className="mx-auto max-w-sm bg-gray-900 rounded-[2rem] sm:rounded-[2.5rem] p-2 shadow-2xl">
                    {/* Phone Screen */}
                    <div className="bg-white dark:bg-gray-950 rounded-[1.5rem] sm:rounded-[2rem] p-3 sm:p-4 h-[500px] sm:h-[600px] overflow-hidden relative">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center mb-3 sm:mb-4 text-xs font-medium text-gray-900 dark:text-gray-100">
                        <span>{getCurrentTime()}</span>
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                          </div>
                          <span className="ml-2">📶</span>
                          <span>🔋</span>
                        </div>
                      </div>

                      {/* SMS Header */}
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b border-gray-200 dark:border-gray-800">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                          B
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-50 text-sm sm:text-base truncate">{t('createCampaign.preview.senderName')}</h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{getCurrentTime()}</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {campaignData.audience ? t('createCampaign.preview.toRecipients', { count: audienceCounts[campaignData.audience as keyof typeof audienceCounts] }) : t('createCampaign.preview.selectAudience')}
                          </p>
                        </div>
                      </div>
                      
                      {/* Message Bubble */}
                      <div className="space-y-3">
                        <div className="flex justify-start">
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-md p-2.5 sm:p-3 max-w-[85%] shadow-soft-sm">
                            <p className="text-sm text-gray-900 dark:text-gray-50 leading-relaxed whitespace-pre-wrap break-words">
                              {getFullMessage()}
                            </p>
                            <div className="flex justify-between items-center mt-2 pt-1">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {getCurrentTime()}
                              </span>
                              <span className="text-xs text-gray-400 dark:text-gray-600">{t('createCampaign.preview.status')}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Schedule Info */}
                        {campaignData.scheduleType === "later" && campaignData.scheduleDate && (
                          <div className="bg-blue-50 border border-blue-200 p-2 sm:p-3 rounded-lg mt-4">
                            <div className="flex items-center space-x-2 text-xs text-blue-700">
                              <Clock className="h-3 w-3" />
                              <span className="truncate">
                                {t('createCampaign.preview.scheduled')}: {new Date(campaignData.scheduleDate + 'T' + campaignData.scheduleTime).toLocaleDateString()} at {campaignData.scheduleTime}
                              </span>
                            </div>
                            {campaignData.isRecurring && campaignData.recurringDays.length > 0 && (
                              <div className="flex items-center space-x-2 text-xs text-blue-700 mt-1">
                                <Repeat className="h-3 w-3" />
                                <span className="truncate">
                                  {t('createCampaign.preview.repeats')}: {campaignData.recurringDays.join(', ')}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Character Count Indicator */}
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
                          <span className={cn("text-xs font-medium",
                            getFullMessage().length > 160 
                              ? "text-destructive" 
                              : "text-success"
                          )}>
                            {t('createCampaign.preview.charCount', { count: getFullMessage().length })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;