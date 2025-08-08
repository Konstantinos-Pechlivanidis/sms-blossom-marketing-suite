import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Link,
} from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { campaignSteps } from "@/constants/campaign-steps";

const CreateCampaign = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const templateId = searchParams.get("template");

  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: "",
    category: "",
    audience: "",
    message: "",
    aiMessage: "",
    useAiVersion: false,
    scheduleType: "now",
    scheduleDate: "",
    scheduleTime: "",
    isRecurring: false,
    recurringDays: [] as string[],
    recurringEndDate: "",
  });

  const [audienceCounts, setAudienceCounts] = useState({
    all: 2847,
    women: 1623,
    men: 1224,
    vip: 284,
    new: 156,
    inactive: 89,
  });

  const weekDays = [
    { id: "monday", label: "Mon" },
    { id: "tuesday", label: "Tue" },
    { id: "wednesday", label: "Wed" },
    { id: "thursday", label: "Thu" },
    { id: "friday", label: "Fri" },
    { id: "saturday", label: "Sat" },
    { id: "sunday", label: "Sun" },
  ];

  // Generate QR tracking link
  const generateTrackingLink = () => {
    const campaignId = Math.random().toString(36).substring(2, 10);
    return `https://yourapp.com/track/${campaignId}`;
  };

  const trackingLink = generateTrackingLink();

  // Get full message with tracking link
  const getFullMessage = () => {
    const baseMessage =
      campaignData.useAiVersion && campaignData.aiMessage
        ? campaignData.aiMessage
        : campaignData.message;

    if (!baseMessage) return "Your SMS message will appear here...";

    return `${baseMessage}\n\n📱 Track: ${trackingLink}`;
  };

  // Load template if template ID is provided
  useEffect(() => {
    if (templateId) {
      const templates = {
        "1": {
          name: "Weekend Flash Sale Campaign",
          category: "promotion",
          message:
            "🎉 FLASH SALE! 50% off everything this weekend only! Use code WEEKEND50. Shop now!",
        },
        "2": {
          name: "New Member Welcome",
          category: "welcome",
          message:
            "Welcome to FitLife! 💪 Your first personal training session is FREE. Book now!",
        },
        "3": {
          name: "Daily Coffee Special",
          category: "promotion",
          message:
            "☕ Today's special: Buy any large coffee, get a pastry FREE! Valid until 3 PM.",
        },
      };

      const template = templates[templateId as keyof typeof templates];
      if (template) {
        setCampaignData((prev) => ({
          ...prev,
          name: template.name,
          category: template.category,
          message: template.message,
        }));
        setCurrentStep(2);
      }
    }
  }, [templateId]);

  const currentSteps = campaignSteps.map(step => {
  switch (step.id) {
    case 1:
      return { ...step, completed: !!(campaignData.name && campaignData.category) };
    case 2:
      return { ...step, completed: !!campaignData.audience };
    case 3:
      return { ...step, completed: !!campaignData.message };
    default:
      return step;
  }
});

  const handleAiImprove = () => {
    // Simulate AI improvement
    const aiVersions = [
      "🎉 EXCLUSIVE: 50% OFF EVERYTHING this weekend! Don't miss out - use WEEKEND50 at checkout. Limited time only!",
      "⚡ FLASH ALERT: Half price on ALL items this weekend! Use code WEEKEND50. Hurry - sale ends Sunday!",
      "🛍️ Weekend Special: 50% discount sitewide! Code: WEEKEND50. Two days only - don't wait!",
    ];

    const randomAiVersion =
      aiVersions[Math.floor(Math.random() * aiVersions.length)];
    setCampaignData((prev) => ({ ...prev, aiMessage: randomAiVersion }));
    toast.success("Message improved with AI!");
  };

  const handleSendCampaign = () => {
    if (campaignData.isRecurring && campaignData.recurringDays.length === 0) {
      toast.error("Please select at least one day for recurring campaigns");
      return;
    }

    const message = campaignData.isRecurring
      ? `Recurring campaign scheduled for ${campaignData.recurringDays.join(
          ", "
        )}! 🔄`
      : "Campaign sent successfully! 🎉";

    toast.success(message);
    navigate("/campaigns");
  };

  const handleSaveDraft = () => {
    toast.success("Campaign saved as draft");
    navigate("/campaigns");
  };

  const handleSchedule = () => {
    if (campaignData.isRecurring && campaignData.recurringDays.length === 0) {
      toast.error("Please select at least one day for recurring campaigns");
      return;
    }

    const message = campaignData.isRecurring
      ? `Recurring campaign scheduled for ${campaignData.recurringDays.join(
          ", "
        )}! 📅`
      : "Campaign scheduled successfully! 📅";

    toast.success(message);
    navigate("/campaigns");
  };

  const handleRecurringDayToggle = (dayId: string) => {
    setCampaignData((prev) => ({
      ...prev,
      recurringDays: prev.recurringDays.includes(dayId)
        ? prev.recurringDays.filter((id) => id !== dayId)
        : [...prev.recurringDays, dayId],
    }));
  };

  const canProceedToStep = (stepId: number) => {
    if (stepId <= currentStep) return true;

    switch (stepId) {
      case 2:
        return campaignData.name && campaignData.category;
      case 3:
        return campaignData.audience;
      case 4:
        return campaignData.message;
      default:
        return false;
    }
  };

  const goToStep = (stepId: number) => {
    if (canProceedToStep(stepId)) {
      setCurrentStep(stepId);
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl">
        {/* Header with Back Button */}
        <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/campaigns")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground truncate">
              Create Campaign
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Build and send targeted SMS campaigns to your customers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Form - Takes more space on desktop */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            {/* Steps Progress */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {currentSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <button
                        onClick={() => goToStep(step.id)}
                        disabled={!canProceedToStep(step.id)}
                        className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all ${
                          step.id === currentStep
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : step.completed
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 cursor-pointer"
                            : canProceedToStep(step.id)
                            ? "bg-muted text-muted-foreground hover:bg-muted/80 cursor-pointer"
                            : "bg-muted/50 text-muted-foreground/50 cursor-not-allowed"
                        }`}
                      >
                        <span className="font-medium">{step.id}</span>
                        <span className="hidden sm:inline truncate">
                          {step.title}
                        </span>
                      </button>
                      {index < currentSteps.length - 1 && (
                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mx-1 sm:mx-2 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 1: Campaign Details */}
            <Card
              className={`border-border transition-all duration-300 shadow-sm ${
                currentStep === 1 ? "ring-2 ring-primary/20" : "opacity-60"
              }`}
            >
              <CardHeader
                className="cursor-pointer p-4 sm:p-6"
                onClick={() => goToStep(1)}
              >
                <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                  <span>1. Campaign Details</span>
                  {currentStep === 1 ? (
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </CardTitle>
              </CardHeader>
              {currentStep === 1 && (
                <CardContent className="space-y-4 animate-fade-in p-4 sm:p-6 pt-0">
                  <div className="space-y-2">
                    <Label
                      htmlFor="campaignName"
                      className="text-sm font-medium"
                    >
                      Campaign Name
                    </Label>
                    <Input
                      id="campaignName"
                      placeholder="e.g., Weekend Flash Sale"
                      value={campaignData.name}
                      onChange={(e) =>
                        setCampaignData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">
                      Campaign Category
                    </Label>
                    <Select
                      value={campaignData.category}
                      onValueChange={(value) =>
                        setCampaignData((prev) => ({
                          ...prev,
                          category: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="promotion">Promotion</SelectItem>
                        <SelectItem value="announcement">
                          Announcement
                        </SelectItem>
                        <SelectItem value="reminder">Reminder</SelectItem>
                        <SelectItem value="welcome">Welcome</SelectItem>
                        <SelectItem value="follow-up">Follow-up</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!campaignData.name || !campaignData.category}
                    className="w-full sm:w-auto"
                  >
                    Next: Select Audience
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              )}
            </Card>

            {/* Step 2: Target Audience */}
            <Card
              className={`border-border transition-all duration-300 shadow-sm ${
                currentStep === 2 ? "ring-2 ring-primary/20" : "opacity-60"
              }`}
            >
              <CardHeader
                className="cursor-pointer p-4 sm:p-6"
                onClick={() => goToStep(2)}
              >
                <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                  <span>2. Target Audience</span>
                  {currentStep === 2 ? (
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </CardTitle>
              </CardHeader>
              {currentStep === 2 && (
                <CardContent className="space-y-4 animate-fade-in p-4 sm:p-6 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      {
                        id: "all",
                        label: "All Contacts",
                        count: audienceCounts.all,
                        icon: "👥",
                      },
                      {
                        id: "women",
                        label: "Women",
                        count: audienceCounts.women,
                        icon: "👩",
                      },
                      {
                        id: "men",
                        label: "Men",
                        count: audienceCounts.men,
                        icon: "👨",
                      },
                      {
                        id: "vip",
                        label: "VIP Customers",
                        count: audienceCounts.vip,
                        icon: "💎",
                      },
                      {
                        id: "new",
                        label: "New Customers",
                        count: audienceCounts.new,
                        icon: "🆕",
                      },
                      {
                        id: "inactive",
                        label: "Inactive (30+ days)",
                        count: audienceCounts.inactive,
                        icon: "😴",
                      },
                    ].map((audience) => (
                      <Card
                        key={audience.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          campaignData.audience === audience.id
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() =>
                          setCampaignData((prev) => ({
                            ...prev,
                            audience: audience.id,
                          }))
                        }
                      >
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                              <span className="text-lg sm:text-2xl">
                                {audience.icon}
                              </span>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-sm sm:text-base truncate">
                                  {audience.label}
                                </h4>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                  {audience.count.toLocaleString()} contacts
                                </p>
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
                        ✅ Selected:{" "}
                        {audienceCounts[
                          campaignData.audience as keyof typeof audienceCounts
                        ].toLocaleString()}{" "}
                        recipients
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="w-full sm:w-auto"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(3)}
                      disabled={!campaignData.audience}
                      className="w-full sm:flex-1"
                    >
                      Next: Write Message
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Step 3: Write Message */}
            <Card
              className={`border-border transition-all duration-300 shadow-sm ${
                currentStep === 3 ? "ring-2 ring-primary/20" : "opacity-60"
              }`}
            >
              <CardHeader
                className="cursor-pointer p-4 sm:p-6"
                onClick={() => goToStep(3)}
              >
                <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                  <span>3. Write Message</span>
                  {currentStep === 3 ? (
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </CardTitle>
              </CardHeader>
              {currentStep === 3 && (
                <CardContent className="space-y-4 animate-fade-in p-4 sm:p-6 pt-0">
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      SMS Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Write your SMS message here..."
                      value={
                        campaignData.useAiVersion
                          ? campaignData.aiMessage
                          : campaignData.message
                      }
                      onChange={(e) =>
                        setCampaignData((prev) => ({
                          ...prev,
                          [campaignData.useAiVersion ? "aiMessage" : "message"]:
                            e.target.value,
                        }))
                      }
                      rows={4}
                      className="w-full resize-none"
                    />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs sm:text-sm">
                      <p className="text-muted-foreground">
                        {
                          (campaignData.useAiVersion
                            ? campaignData.aiMessage
                            : campaignData.message
                          ).length
                        }
                        /160 characters
                      </p>
                      <div
                        className={`px-2 py-1 rounded text-xs ${
                          (campaignData.useAiVersion
                            ? campaignData.aiMessage
                            : campaignData.message
                          ).length > 160
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {(campaignData.useAiVersion
                          ? campaignData.aiMessage
                          : campaignData.message
                        ).length <= 160
                          ? "✓ Single SMS"
                          : "⚠ Multiple SMS"}
                      </div>
                    </div>
                  </div>

                  {/* QR Link Info */}
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Link className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-blue-800">
                          Tracking Link Added
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          A tracking link will be automatically added to your
                          message: {trackingLink}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      onClick={handleAiImprove}
                      className="w-full sm:flex-1"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />✨ Improve with AI
                    </Button>

                    {campaignData.aiMessage && (
                      <Button
                        variant={
                          campaignData.useAiVersion ? "default" : "outline"
                        }
                        onClick={() =>
                          setCampaignData((prev) => ({
                            ...prev,
                            useAiVersion: !prev.useAiVersion,
                          }))
                        }
                        className="w-full sm:flex-1"
                      >
                        {campaignData.useAiVersion
                          ? "✅ Using AI Version"
                          : "Use AI Version"}
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                      className="w-full sm:w-auto"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(4)}
                      disabled={!campaignData.message}
                      className="w-full sm:flex-1"
                    >
                      Next: Schedule & Send
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Step 4: Schedule & Send */}
            <Card
              className={`border-border transition-all duration-300 shadow-sm ${
                currentStep === 4 ? "ring-2 ring-primary/20" : "opacity-60"
              }`}
            >
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">
                  4. Schedule & Send
                </CardTitle>
              </CardHeader>
              {currentStep === 4 && (
                <CardContent className="space-y-6 animate-fade-in p-4 sm:p-6 pt-0">
                  {/* Send Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <Card
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        campaignData.scheduleType === "now"
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() =>
                        setCampaignData((prev) => ({
                          ...prev,
                          scheduleType: "now",
                          isRecurring: false,
                        }))
                      }
                    >
                      <CardContent className="p-3 sm:p-4 text-center">
                        <Send className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-primary" />
                        <h4 className="font-medium mb-1 text-sm sm:text-base">
                          Send Now
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Immediate delivery
                        </p>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        campaignData.scheduleType === "later"
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() =>
                        setCampaignData((prev) => ({
                          ...prev,
                          scheduleType: "later",
                        }))
                      }
                    >
                      <CardContent className="p-3 sm:p-4 text-center">
                        <Calendar className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-blue-600" />
                        <h4 className="font-medium mb-1 text-sm sm:text-base">
                          Schedule Later
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Choose date & time
                        </p>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        campaignData.scheduleType === "draft"
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() =>
                        setCampaignData((prev) => ({
                          ...prev,
                          scheduleType: "draft",
                          isRecurring: false,
                        }))
                      }
                    >
                      <CardContent className="p-3 sm:p-4 text-center">
                        <Save className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-muted-foreground" />
                        <h4 className="font-medium mb-1 text-sm sm:text-base">
                          Save as Draft
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Send later
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Schedule Options */}
                  {campaignData.scheduleType === "later" && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="scheduleDate"
                            className="text-sm font-medium"
                          >
                            Date
                          </Label>
                          <Input
                            id="scheduleDate"
                            type="date"
                            value={campaignData.scheduleDate}
                            onChange={(e) =>
                              setCampaignData((prev) => ({
                                ...prev,
                                scheduleDate: e.target.value,
                              }))
                            }
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="scheduleTime"
                            className="text-sm font-medium"
                          >
                            Time
                          </Label>
                          <Input
                            id="scheduleTime"
                            type="time"
                            value={campaignData.scheduleTime}
                            onChange={(e) =>
                              setCampaignData((prev) => ({
                                ...prev,
                                scheduleTime: e.target.value,
                              }))
                            }
                            className="w-full"
                          />
                        </div>
                      </div>

                      {/* Recurring Options */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="recurring"
                            checked={campaignData.isRecurring}
                            onCheckedChange={(checked) =>
                              setCampaignData((prev) => ({
                                ...prev,
                                isRecurring: !!checked,
                              }))
                            }
                          />
                          <Label
                            htmlFor="recurring"
                            className="flex items-center space-x-2 text-sm"
                          >
                            <Repeat className="h-4 w-4" />
                            <span>Make this a recurring campaign</span>
                          </Label>
                        </div>

                        {campaignData.isRecurring && (
                          <div className="ml-6 space-y-3 animate-fade-in">
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">
                                Select Days
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                {weekDays.map((day) => (
                                  <Button
                                    key={day.id}
                                    variant={
                                      campaignData.recurringDays.includes(
                                        day.id
                                      )
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    onClick={() =>
                                      handleRecurringDayToggle(day.id)
                                    }
                                    className="min-w-[44px] text-xs"
                                  >
                                    {day.label}
                                  </Button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label
                                htmlFor="recurringEndDate"
                                className="text-sm font-medium"
                              >
                                End Date (Optional)
                              </Label>
                              <Input
                                id="recurringEndDate"
                                type="date"
                                value={campaignData.recurringEndDate}
                                onChange={(e) =>
                                  setCampaignData((prev) => ({
                                    ...prev,
                                    recurringEndDate: e.target.value,
                                  }))
                                }
                                min={
                                  campaignData.scheduleDate ||
                                  new Date().toISOString().split("T")[0]
                                }
                                className="w-full"
                              />
                              <p className="text-xs text-muted-foreground">
                                Leave empty to run forever
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(3)}
                      className="w-full sm:w-auto"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>

                    {campaignData.scheduleType === "now" && (
                      <Button
                        onClick={handleSendCampaign}
                        className="w-full sm:flex-1"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send Campaign Now
                      </Button>
                    )}

                    {campaignData.scheduleType === "later" && (
                      <Button
                        onClick={handleSchedule}
                        disabled={
                          !campaignData.scheduleDate ||
                          !campaignData.scheduleTime
                        }
                        className="w-full sm:flex-1"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {campaignData.isRecurring
                          ? "Schedule Recurring Campaign"
                          : "Schedule Campaign"}
                      </Button>
                    )}

                    {campaignData.scheduleType === "draft" && (
                      <Button
                        onClick={handleSaveDraft}
                        variant="secondary"
                        className="w-full sm:flex-1"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save as Draft
                      </Button>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Enhanced Mobile Preview - Responsive positioning */}
          <div className="lg:col-span-4">
            <div className="sticky top-6">
              <Card className="border-border shadow-lg">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <Smartphone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Mobile Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  {/* Realistic Phone Frame */}
                  <div className="mx-auto max-w-sm bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] p-2 shadow-2xl">
                    {/* Phone Screen */}
                    <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-3 sm:p-4 h-[500px] sm:h-[600px] overflow-hidden relative">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center mb-3 sm:mb-4 text-xs font-medium text-slate-900">
                        <span>{getCurrentTime()}</span>
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-slate-900 rounded-full"></div>
                            <div className="w-1 h-1 bg-slate-900 rounded-full"></div>
                            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                          </div>
                          <span className="ml-2">📶</span>
                          <span>🔋</span>
                        </div>
                      </div>

                      {/* SMS Header */}
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b border-slate-100">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                          B
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-slate-900 text-sm sm:text-base truncate">
                              Bella's Boutique
                            </h3>
                            <span className="text-xs text-slate-500">
                              {getCurrentTime()}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 truncate">
                            {campaignData.audience
                              ? `To: ${audienceCounts[
                                  campaignData.audience as keyof typeof audienceCounts
                                ].toLocaleString()} contacts`
                              : "Select audience"}
                          </p>
                        </div>
                      </div>

                      {/* Message Bubble */}
                      <div className="space-y-3">
                        <div className="flex justify-start">
                          <div className="bg-slate-100 rounded-2xl rounded-tl-md p-2.5 sm:p-3 max-w-[85%] shadow-sm">
                            <p className="text-xs sm:text-sm text-slate-900 leading-relaxed whitespace-pre-wrap break-words">
                              {getFullMessage()}
                            </p>
                            <div className="flex justify-between items-center mt-2 pt-1">
                              <span className="text-xs text-slate-500">
                                {getCurrentTime()}
                              </span>
                              <span className="text-xs text-slate-400">
                                Delivered
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Schedule Info */}
                        {campaignData.scheduleType === "later" &&
                          campaignData.scheduleDate && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mt-4">
                              <div className="flex items-center space-x-2 text-xs text-blue-700">
                                <Clock className="h-3 w-3" />
                                <span className="truncate">
                                  Scheduled:{" "}
                                  {new Date(
                                    campaignData.scheduleDate +
                                      "T" +
                                      campaignData.scheduleTime
                                  ).toLocaleDateString()}{" "}
                                  at {campaignData.scheduleTime}
                                </span>
                              </div>
                              {campaignData.isRecurring &&
                                campaignData.recurringDays.length > 0 && (
                                  <div className="flex items-center space-x-2 text-xs text-blue-700 mt-1">
                                    <Repeat className="h-3 w-3" />
                                    <span className="truncate">
                                      Repeats:{" "}
                                      {campaignData.recurringDays.join(", ")}
                                    </span>
                                  </div>
                                )}
                            </div>
                          )}
                      </div>

                      {/* Character Count Indicator */}
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                        <div className="bg-slate-50 rounded-lg p-2 text-center">
                          <span
                            className={`text-xs font-medium ${
                              getFullMessage().length > 160
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {getFullMessage().length}/160 chars
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
