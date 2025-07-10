import { useState, useEffect } from "react";
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
  ArrowLeft
} from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateCampaign = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const templateId = searchParams.get('template');
  
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
    recurringEndDate: ""
  });

  const [audienceCounts, setAudienceCounts] = useState({
    "all": 2847,
    "women": 1623,
    "men": 1224,
    "vip": 284,
    "new": 156,
    "inactive": 89
  });

  const weekDays = [
    { id: "monday", label: "Mon" },
    { id: "tuesday", label: "Tue" },
    { id: "wednesday", label: "Wed" },
    { id: "thursday", label: "Thu" },
    { id: "friday", label: "Fri" },
    { id: "saturday", label: "Sat" },
    { id: "sunday", label: "Sun" }
  ];

  // Load template if template ID is provided
  useEffect(() => {
    if (templateId) {
      const templates = {
        "1": {
          name: "Weekend Flash Sale Campaign",
          category: "promotion",
          message: "🎉 FLASH SALE! 50% off everything this weekend only! Use code WEEKEND50. Shop now: [link]"
        },
        "2": {
          name: "New Member Welcome",
          category: "welcome",
          message: "Welcome to FitLife! 💪 Your first personal training session is FREE. Book now: [link]"
        },
        "3": {
          name: "Daily Coffee Special",
          category: "promotion",
          message: "☕ Today's special: Buy any large coffee, get a pastry FREE! Valid until 3 PM."
        }
      };
      
      const template = templates[templateId as keyof typeof templates];
      if (template) {
        setCampaignData(prev => ({
          ...prev,
          name: template.name,
          category: template.category,
          message: template.message
        }));
        setCurrentStep(2);
      }
    }
  }, [templateId]);

  const steps = [
    { id: 1, title: "Campaign Details", completed: campaignData.name && campaignData.category },
    { id: 2, title: "Target Audience", completed: campaignData.audience },
    { id: 3, title: "Write Message", completed: campaignData.message },
    { id: 4, title: "Schedule & Send", completed: false }
  ];

  const handleAiImprove = () => {
    // Simulate AI improvement
    const aiVersions = [
      "🎉 EXCLUSIVE: 50% OFF EVERYTHING this weekend! Don't miss out - use WEEKEND50 at checkout. Limited time only! Shop: [link]",
      "⚡ FLASH ALERT: Half price on ALL items this weekend! Use code WEEKEND50. Hurry - sale ends Sunday! [link]",
      "🛍️ Weekend Special: 50% discount sitewide! Code: WEEKEND50. Two days only - don't wait! [link]"
    ];
    
    const randomAiVersion = aiVersions[Math.floor(Math.random() * aiVersions.length)];
    setCampaignData(prev => ({ ...prev, aiMessage: randomAiVersion }));
    toast.success("Message improved with AI!");
  };

  const handleSendCampaign = () => {
    if (campaignData.isRecurring && campaignData.recurringDays.length === 0) {
      toast.error("Please select at least one day for recurring campaigns");
      return;
    }
    
    const message = campaignData.isRecurring 
      ? `Recurring campaign scheduled for ${campaignData.recurringDays.join(', ')}! 🔄`
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
      ? `Recurring campaign scheduled for ${campaignData.recurringDays.join(', ')}! 📅`
      : "Campaign scheduled successfully! 📅";
    
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

  const canProceedToStep = (stepId: number) => {
    if (stepId <= currentStep) return true;
    
    switch (stepId) {
      case 2: return campaignData.name && campaignData.category;
      case 3: return campaignData.audience;
      case 4: return campaignData.message;
      default: return false;
    }
  };

  const goToStep = (stepId: number) => {
    if (canProceedToStep(stepId)) {
      setCurrentStep(stepId);
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/campaigns")}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Create Campaign</h1>
          <p className="text-muted-foreground">Build and send targeted SMS campaigns to your customers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="xl:col-span-2 space-y-6">
          {/* Steps Progress */}
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => goToStep(step.id)}
                      disabled={!canProceedToStep(step.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm transition-all ${
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
                      <span className="hidden sm:inline">{step.title}</span>
                    </button>
                    {index < steps.length - 1 && (
                      <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step 1: Campaign Details */}
          <Card className={`border-border transition-all duration-300 ${currentStep === 1 ? "ring-2 ring-primary/20" : "opacity-60"}`}>
            <CardHeader 
              className="cursor-pointer" 
              onClick={() => goToStep(1)}
            >
              <CardTitle className="flex items-center justify-between">
                <span>1. Campaign Details</span>
                {currentStep === 1 ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
            {currentStep === 1 && (
              <CardContent className="space-y-4 animate-fade-in">
                <div>
                  <Label htmlFor="campaignName">Campaign Name</Label>
                  <Input
                    id="campaignName"
                    placeholder="e.g., Weekend Flash Sale"
                    value={campaignData.name}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Campaign Category</Label>
                  <Select value={campaignData.category} onValueChange={(value) => setCampaignData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promotion">Promotion</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="welcome">Welcome</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={() => setCurrentStep(2)}
                  disabled={!campaignData.name || !campaignData.category}
                  className="w-full md:w-auto"
                >
                  Next: Select Audience
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            )}
          </Card>

          {/* Step 2: Target Audience */}
          <Card className={`border-border transition-all duration-300 ${currentStep === 2 ? "ring-2 ring-primary/20" : "opacity-60"}`}>
            <CardHeader 
              className="cursor-pointer" 
              onClick={() => goToStep(2)}
            >
              <CardTitle className="flex items-center justify-between">
                <span>2. Target Audience</span>
                {currentStep === 2 ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
            {currentStep === 2 && (
              <CardContent className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "all", label: "All Contacts", count: audienceCounts.all, icon: "👥" },
                    { id: "women", label: "Women", count: audienceCounts.women, icon: "👩" },
                    { id: "men", label: "Men", count: audienceCounts.men, icon: "👨" },
                    { id: "vip", label: "VIP Customers", count: audienceCounts.vip, icon: "💎" },
                    { id: "new", label: "New Customers", count: audienceCounts.new, icon: "🆕" },
                    { id: "inactive", label: "Inactive (30+ days)", count: audienceCounts.inactive, icon: "😴" }
                  ].map((audience) => (
                    <Card 
                      key={audience.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        campaignData.audience === audience.id 
                          ? "border-primary bg-primary/5 shadow-sm" 
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setCampaignData(prev => ({ ...prev, audience: audience.id }))}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{audience.icon}</span>
                            <div>
                              <h4 className="font-medium">{audience.label}</h4>
                              <p className="text-sm text-muted-foreground">{audience.count.toLocaleString()} contacts</p>
                            </div>
                          </div>
                          <Users className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {campaignData.audience && (
                  <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                    <p className="text-sm font-medium text-primary">
                      ✅ Selected: {audienceCounts[campaignData.audience as keyof typeof audienceCounts].toLocaleString()} recipients
                    </p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 md:flex-none"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(3)}
                    disabled={!campaignData.audience}
                    className="flex-1"
                  >
                    Next: Write Message
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Step 3: Write Message */}
          <Card className={`border-border transition-all duration-300 ${currentStep === 3 ? "ring-2 ring-primary/20" : "opacity-60"}`}>
            <CardHeader 
              className="cursor-pointer" 
              onClick={() => goToStep(3)}
            >
              <CardTitle className="flex items-center justify-between">
                <span>3. Write Message</span>
                {currentStep === 3 ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
            {currentStep === 3 && (
              <CardContent className="space-y-4 animate-fade-in">
                <div>
                  <Label htmlFor="message">SMS Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Write your SMS message here..."
                    value={campaignData.useAiVersion ? campaignData.aiMessage : campaignData.message}
                    onChange={(e) => setCampaignData(prev => ({ 
                      ...prev, 
                      [campaignData.useAiVersion ? 'aiMessage' : 'message']: e.target.value 
                    }))}
                    rows={4}
                    className="mt-1"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-muted-foreground">
                      {(campaignData.useAiVersion ? campaignData.aiMessage : campaignData.message).length}/160 characters
                    </p>
                    <div className={`text-xs px-2 py-1 rounded ${
                      (campaignData.useAiVersion ? campaignData.aiMessage : campaignData.message).length > 160 
                        ? "bg-red-100 text-red-800" 
                        : "bg-green-100 text-green-800"
                    }`}>
                      {(campaignData.useAiVersion ? campaignData.aiMessage : campaignData.message).length <= 160 ? "✓ Single SMS" : "⚠ Multiple SMS"}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={handleAiImprove}
                    className="flex-1"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    ✨ Improve with AI
                  </Button>
                  
                  {campaignData.aiMessage && (
                    <Button
                      variant={campaignData.useAiVersion ? "default" : "outline"}
                      onClick={() => setCampaignData(prev => ({ ...prev, useAiVersion: !prev.useAiVersion }))}
                      className={campaignData.useAiVersion ? "flex-1" : "flex-1"}
                    >
                      {campaignData.useAiVersion ? "✅ Using AI Version" : "Use AI Version"}
                    </Button>
                  )}
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 md:flex-none"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(4)}
                    disabled={!campaignData.message}
                    className="flex-1"
                  >
                    Next: Schedule & Send
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Step 4: Schedule & Send */}
          <Card className={`border-border transition-all duration-300 ${currentStep === 4 ? "ring-2 ring-primary/20" : "opacity-60"}`}>
            <CardHeader>
              <CardTitle>4. Schedule & Send</CardTitle>
            </CardHeader>
            {currentStep === 4 && (
              <CardContent className="space-y-6 animate-fade-in">
                {/* Send Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      campaignData.scheduleType === "now" 
                        ? "border-primary bg-primary/5 shadow-sm" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setCampaignData(prev => ({ ...prev, scheduleType: "now", isRecurring: false }))}
                  >
                    <CardContent className="p-4 text-center">
                      <Send className="h-8 w-8 mx-auto mb-3 text-primary" />
                      <h4 className="font-medium mb-1">Send Now</h4>
                      <p className="text-sm text-muted-foreground">Immediate delivery</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      campaignData.scheduleType === "later" 
                        ? "border-primary bg-primary/5 shadow-sm" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setCampaignData(prev => ({ ...prev, scheduleType: "later" }))}
                  >
                    <CardContent className="p-4 text-center">
                      <Calendar className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                      <h4 className="font-medium mb-1">Schedule Later</h4>
                      <p className="text-sm text-muted-foreground">Choose date & time</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      campaignData.scheduleType === "draft" 
                        ? "border-primary bg-primary/5 shadow-sm" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setCampaignData(prev => ({ ...prev, scheduleType: "draft", isRecurring: false }))}
                  >
                    <CardContent className="p-4 text-center">
                      <Save className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                      <h4 className="font-medium mb-1">Save as Draft</h4>
                      <p className="text-sm text-muted-foreground">Send later</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Schedule Options */}
                {campaignData.scheduleType === "later" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="scheduleDate">Date</Label>
                        <Input
                          id="scheduleDate"
                          type="date"
                          value={campaignData.scheduleDate}
                          onChange={(e) => setCampaignData(prev => ({ ...prev, scheduleDate: e.target.value }))}
                          className="mt-1"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="scheduleTime">Time</Label>
                        <Input
                          id="scheduleTime"
                          type="time"
                          value={campaignData.scheduleTime}
                          onChange={(e) => setCampaignData(prev => ({ ...prev, scheduleTime: e.target.value }))}
                          className="mt-1"
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
                        />
                        <Label htmlFor="recurring" className="flex items-center space-x-2">
                          <Repeat className="h-4 w-4" />
                          <span>Make this a recurring campaign</span>
                        </Label>
                      </div>

                      {campaignData.isRecurring && (
                        <div className="ml-6 space-y-3 animate-fade-in">
                          <div>
                            <Label>Select Days</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {weekDays.map((day) => (
                                <Button
                                  key={day.id}
                                  variant={campaignData.recurringDays.includes(day.id) ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleRecurringDayToggle(day.id)}
                                  className="min-w-[44px]"
                                >
                                  {day.label}
                                </Button>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="recurringEndDate">End Date (Optional)</Label>
                            <Input
                              id="recurringEndDate"
                              type="date"
                              value={campaignData.recurringEndDate}
                              onChange={(e) => setCampaignData(prev => ({ ...prev, recurringEndDate: e.target.value }))}
                              className="mt-1"
                              min={campaignData.scheduleDate || new Date().toISOString().split('T')[0]}
                            />
                            <p className="text-xs text-muted-foreground mt-1">Leave empty to run forever</p>
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
                    className="flex-1 md:flex-none"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>

                  {campaignData.scheduleType === "now" && (
                    <Button 
                      onClick={handleSendCampaign}
                      className="flex-1"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Campaign Now
                    </Button>
                  )}
                  
                  {campaignData.scheduleType === "later" && (
                    <Button 
                      onClick={handleSchedule}
                      disabled={!campaignData.scheduleDate || !campaignData.scheduleTime}
                      className="flex-1"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {campaignData.isRecurring ? "Schedule Recurring Campaign" : "Schedule Campaign"}
                    </Button>
                  )}
                  
                  {campaignData.scheduleType === "draft" && (
                    <Button 
                      onClick={handleSaveDraft}
                      variant="secondary"
                      className="flex-1"
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

        {/* Enhanced Mobile Preview */}
        <div className="xl:col-span-1">
          <Card className="sticky top-6 border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="mr-2 h-5 w-5" />
                Mobile Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Realistic Phone Frame */}
              <div className="mx-auto w-72 bg-slate-900 rounded-[2.5rem] p-2 shadow-xl">
                {/* Phone Screen */}
                <div className="bg-white rounded-[2rem] p-4 h-[600px] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center mb-4 text-xs font-medium text-slate-900">
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
                  <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-slate-100">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      B
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">Bella's Boutique</h3>
                        <span className="text-xs text-slate-500">{getCurrentTime()}</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {campaignData.audience ? `To: ${audienceCounts[campaignData.audience as keyof typeof audienceCounts].toLocaleString()} contacts` : 'Select audience'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Message Bubble */}
                  <div className="space-y-3">
                    <div className="flex justify-start">
                      <div className="bg-slate-100 rounded-2xl rounded-tl-md p-3 max-w-[85%] shadow-sm">
                        <p className="text-sm text-slate-900 leading-relaxed">
                          {campaignData.useAiVersion && campaignData.aiMessage 
                            ? campaignData.aiMessage 
                            : campaignData.message || "Your SMS message will appear here..."}
                        </p>
                        <div className="flex justify-between items-center mt-2 pt-1">
                          <span className="text-xs text-slate-500">
                            {getCurrentTime()}
                          </span>
                          <span className="text-xs text-slate-400">Delivered</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Schedule Info */}
                    {campaignData.scheduleType === "later" && campaignData.scheduleDate && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mt-4">
                        <div className="flex items-center space-x-2 text-xs text-blue-700">
                          <Clock className="h-3 w-3" />
                          <span>
                            Scheduled: {new Date(campaignData.scheduleDate + 'T' + campaignData.scheduleTime).toLocaleDateString()} at {campaignData.scheduleTime}
                          </span>
                        </div>
                        {campaignData.isRecurring && campaignData.recurringDays.length > 0 && (
                          <div className="flex items-center space-x-2 text-xs text-blue-700 mt-1">
                            <Repeat className="h-3 w-3" />
                            <span>
                              Repeats: {campaignData.recurringDays.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Character Count Indicator */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-slate-50 rounded-lg p-2 text-center">
                      <span className={`text-xs font-medium ${
                        (campaignData.useAiVersion ? campaignData.aiMessage : campaignData.message).length > 160 
                          ? "text-red-600" 
                          : "text-green-600"
                      }`}>
                        {(campaignData.useAiVersion ? campaignData.aiMessage : campaignData.message).length}/160 chars
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
  );
};

export default CreateCampaign;
