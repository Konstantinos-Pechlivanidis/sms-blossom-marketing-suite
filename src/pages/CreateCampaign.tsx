
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  Users, 
  Calendar,
  Send,
  Save,
  Smartphone
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
    scheduleTime: ""
  });

  const [audienceCounts, setAudienceCounts] = useState({
    "all": 2847,
    "women": 1623,
    "men": 1224,
    "vip": 284,
    "new": 156,
    "inactive": 89
  });

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
    toast.success("Campaign sent successfully! 🎉");
    navigate("/campaigns");
  };

  const handleSaveDraft = () => {
    toast.success("Campaign saved as draft");
    navigate("/campaigns");
  };

  const handleSchedule = () => {
    toast.success("Campaign scheduled successfully! 📅");
    navigate("/campaigns");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Campaign</h1>
        <p className="text-gray-600">Build and send targeted SMS campaigns to your customers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Steps Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                      step.id === currentStep 
                        ? "bg-[#81D8D0] text-white" 
                        : step.completed 
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                    }`}>
                      <span className="font-medium">{step.id}</span>
                      <span>{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step 1: Campaign Details */}
          <Card className={currentStep === 1 ? "" : "opacity-50"}>
            <CardHeader 
              className="cursor-pointer" 
              onClick={() => setCurrentStep(1)}
            >
              <CardTitle className="flex items-center justify-between">
                <span>1. Campaign Details</span>
                {currentStep === 1 ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
            {currentStep === 1 && (
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="campaignName">Campaign Name</Label>
                  <Input
                    id="campaignName"
                    placeholder="e.g., Weekend Flash Sale"
                    value={campaignData.name}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Campaign Category</Label>
                  <Select value={campaignData.category} onValueChange={(value) => setCampaignData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
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
                  className="bg-[#81D8D0] hover:bg-[#5FBDB7]"
                >
                  Next: Select Audience
                </Button>
              </CardContent>
            )}
          </Card>

          {/* Step 2: Target Audience */}
          <Card className={currentStep === 2 ? "" : "opacity-50"}>
            <CardHeader 
              className="cursor-pointer" 
              onClick={() => setCurrentStep(2)}
            >
              <CardTitle className="flex items-center justify-between">
                <span>2. Target Audience</span>
                {currentStep === 2 ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
            {currentStep === 2 && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "all", label: "All Contacts", count: audienceCounts.all },
                    { id: "women", label: "Women", count: audienceCounts.women },
                    { id: "men", label: "Men", count: audienceCounts.men },
                    { id: "vip", label: "VIP Customers", count: audienceCounts.vip },
                    { id: "new", label: "New Customers", count: audienceCounts.new },
                    { id: "inactive", label: "Inactive (30+ days)", count: audienceCounts.inactive }
                  ].map((audience) => (
                    <Card 
                      key={audience.id}
                      className={`cursor-pointer transition-all ${
                        campaignData.audience === audience.id 
                          ? "border-[#81D8D0] bg-[#81D8D0]/10" 
                          : "hover:border-gray-300"
                      }`}
                      onClick={() => setCampaignData(prev => ({ ...prev, audience: audience.id }))}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{audience.label}</h4>
                            <p className="text-sm text-gray-500">{audience.count.toLocaleString()} contacts</p>
                          </div>
                          <Users className="h-5 w-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {campaignData.audience && (
                  <div className="bg-[#81D8D0]/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-[#81D8D0]">
                      Selected: {audienceCounts[campaignData.audience as keyof typeof audienceCounts].toLocaleString()} recipients
                    </p>
                  </div>
                )}

                <Button 
                  onClick={() => setCurrentStep(3)}
                  disabled={!campaignData.audience}
                  className="bg-[#81D8D0] hover:bg-[#5FBDB7]"
                >
                  Next: Write Message
                </Button>
              </CardContent>
            )}
          </Card>

          {/* Step 3: Write Message */}
          <Card className={currentStep === 3 ? "" : "opacity-50"}>
            <CardHeader 
              className="cursor-pointer" 
              onClick={() => setCurrentStep(3)}
            >
              <CardTitle className="flex items-center justify-between">
                <span>3. Write Message</span>
                {currentStep === 3 ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
            {currentStep === 3 && (
              <CardContent className="space-y-4">
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
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {(campaignData.useAiVersion ? campaignData.aiMessage : campaignData.message).length}/160 characters
                  </p>
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
                      className={campaignData.useAiVersion ? "bg-[#81D8D0] hover:bg-[#5FBDB7]" : ""}
                    >
                      {campaignData.useAiVersion ? "Using AI Version" : "Use AI Version"}
                    </Button>
                  )}
                </div>

                <Button 
                  onClick={() => setCurrentStep(4)}
                  disabled={!campaignData.message}
                  className="bg-[#81D8D0] hover:bg-[#5FBDB7]"
                >
                  Next: Schedule & Send
                </Button>
              </CardContent>
            )}
          </Card>

          {/* Step 4: Schedule & Send */}
          <Card className={currentStep === 4 ? "" : "opacity-50"}>
            <CardHeader>
              <CardTitle>4. Schedule & Send</CardTitle>
            </CardHeader>
            {currentStep === 4 && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card 
                    className={`cursor-pointer transition-all ${
                      campaignData.scheduleType === "now" 
                        ? "border-[#81D8D0] bg-[#81D8D0]/10" 
                        : "hover:border-gray-300"
                    }`}
                    onClick={() => setCampaignData(prev => ({ ...prev, scheduleType: "now" }))}
                  >
                    <CardContent className="p-4 text-center">
                      <Send className="h-8 w-8 mx-auto mb-2 text-[#81D8D0]" />
                      <h4 className="font-medium">Send Now</h4>
                      <p className="text-sm text-gray-500">Immediate delivery</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all ${
                      campaignData.scheduleType === "later" 
                        ? "border-[#81D8D0] bg-[#81D8D0]/10" 
                        : "hover:border-gray-300"
                    }`}
                    onClick={() => setCampaignData(prev => ({ ...prev, scheduleType: "later" }))}
                  >
                    <CardContent className="p-4 text-center">
                      <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-medium">Schedule Later</h4>
                      <p className="text-sm text-gray-500">Choose date & time</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all ${
                      campaignData.scheduleType === "draft" 
                        ? "border-[#81D8D0] bg-[#81D8D0]/10" 
                        : "hover:border-gray-300"
                    }`}
                    onClick={() => setCampaignData(prev => ({ ...prev, scheduleType: "draft" }))}
                  >
                    <CardContent className="p-4 text-center">
                      <Save className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                      <h4 className="font-medium">Save as Draft</h4>
                      <p className="text-sm text-gray-500">Send later</p>
                    </CardContent>
                  </Card>
                </div>

                {campaignData.scheduleType === "later" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="scheduleDate">Date</Label>
                      <Input
                        id="scheduleDate"
                        type="date"
                        value={campaignData.scheduleDate}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, scheduleDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="scheduleTime">Time</Label>
                      <Input
                        id="scheduleTime"
                        type="time"
                        value={campaignData.scheduleTime}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, scheduleTime: e.target.value }))}
                      />
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex flex-col sm:flex-row gap-3">
                  {campaignData.scheduleType === "now" && (
                    <Button 
                      onClick={handleSendCampaign}
                      className="flex-1 bg-[#81D8D0] hover:bg-[#5FBDB7]"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Campaign Now
                    </Button>
                  )}
                  
                  {campaignData.scheduleType === "later" && (
                    <Button 
                      onClick={handleSchedule}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Campaign
                    </Button>
                  )}
                  
                  {campaignData.scheduleType === "draft" && (
                    <Button 
                      onClick={handleSaveDraft}
                      className="flex-1 bg-gray-600 hover:bg-gray-700"
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

        {/* Mobile Preview */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="mr-2 h-5 w-5" />
                Mobile Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mx-auto w-64 bg-gray-900 rounded-3xl p-4">
                <div className="bg-white rounded-2xl p-4 h-96 overflow-y-auto">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 bg-[#81D8D0] rounded-full flex items-center justify-center text-white text-sm font-bold">
                        B
                      </div>
                      <div>
                        <p className="font-medium text-sm">Bella's Boutique</p>
                        <p className="text-xs text-gray-500">now</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm">
                        {campaignData.useAiVersion && campaignData.aiMessage 
                          ? campaignData.aiMessage 
                          : campaignData.message || "Your SMS message will appear here..."}
                      </p>
                    </div>
                    
                    {campaignData.audience && (
                      <div className="mt-4">
                        <Badge variant="secondary" className="text-xs">
                          To: {audienceCounts[campaignData.audience as keyof typeof audienceCounts].toLocaleString()} recipients
                        </Badge>
                      </div>
                    )}
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
