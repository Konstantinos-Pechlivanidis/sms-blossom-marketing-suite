import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronRight,
  ChevronLeft,
  Smartphone,
  Repeat,
  Save,
  Sparkles,
  Calendar,
  MessageSquare,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import { automationSteps } from "@/constants/campaign-steps";
import { Automation, EditAutomationData, WeekDay } from "@/types/automation";
import { SIZES, ICON_SIZES, SPACING, MOBILE } from "@/constants/design";

interface EditAutomationModalProps {
  automation: Automation | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedAutomation: Automation) => void;
}

const EditAutomationModal = ({
  automation,
  isOpen,
  onClose,
  onSave,
}: EditAutomationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [editData, setEditData] = useState<EditAutomationData>({
    message: automation?.message || "",
    aiMessage: "",
    useAiVersion: false,
    isRecurring: true,
    recurringDays: ["monday", "wednesday"],
    recurringTime: "10:00",
    recurringEndDate: "",
  });

  const weekDays: WeekDay[] = [
    { id: "monday", label: "Mon" },
    { id: "tuesday", label: "Tue" },
    { id: "wednesday", label: "Wed" },
    { id: "thursday", label: "Thu" },
    { id: "friday", label: "Fri" },
    { id: "saturday", label: "Sat" },
    { id: "sunday", label: "Sun" },
  ];

  const currentSteps = automationSteps.map((step) => {
    switch (step.id) {
      case 1:
        return { ...step, completed: editData.message.length > 0 };
      case 2:
        return {
          ...step,
          completed: editData.isRecurring && editData.recurringDays.length > 0,
        };
      default:
        return step;
    }
  });

  const handleAiImprove = () => {
    if (!automation) return;
    
    const aiVersions = [
      `🎉 Hey [Name]! ${automation.title.toLowerCase()} - here's something special just for you! Use code SPECIAL20 for 20% off your next purchase! 🛍️`,
      `✨ [Name], you're amazing! ${automation.description.toLowerCase()} - enjoy this exclusive offer: SAVE25 for 25% off! Valid until midnight! ⏰`,
      `💎 VIP Alert [Name]! ${automation.trigger} detected - here's your personalized reward: 30% off with code VIP30! Don't miss out! 🎁`,
    ];

    const randomAiVersion =
      aiVersions[Math.floor(Math.random() * aiVersions.length)];
    setEditData((prev) => ({ ...prev, aiMessage: randomAiVersion }));
    toast.success("Message improved with AI!");
  };

  const handleRecurringDayToggle = (dayId: string) => {
    setEditData((prev) => ({
      ...prev,
      recurringDays: prev.recurringDays.includes(dayId)
        ? prev.recurringDays.filter((id) => id !== dayId)
        : [...prev.recurringDays, dayId],
    }));
  };

  const handleSave = () => {
    if (!automation) return;

    const updatedAutomation = {
      ...automation,
      message:
        editData.useAiVersion && editData.aiMessage
          ? editData.aiMessage
          : editData.message,
    };

    onSave(updatedAutomation);
    toast.success(`"${automation.title}" automation updated successfully!`);
    onClose();
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const canProceedToStep = (stepId: number) => {
    if (stepId <= currentStep) return true;

    switch (stepId) {
      case 2:
        return editData.message.length > 0;
      case 3:
        return editData.recurringDays.length > 0;
      default:
        return false;
    }
  };

  const goToStep = (stepId: number) => {
    if (canProceedToStep(stepId)) {
      setCurrentStep(stepId);
    }
  };

  if (!automation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-4 md:p-6 pb-2 md:pb-4 border-b">
          <DialogTitle className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <automation.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg md:text-xl">Edit {automation.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row h-full overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {/* Step Navigation */}
              <div className="flex flex-wrap gap-2 mb-6">
                {currentSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => goToStep(step.id)}
                      disabled={!canProceedToStep(step.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm transition-all ${
                        step.id === currentStep
                          ? "bg-[#5FBDB7] text-white shadow-sm"
                          : step.completed
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 cursor-pointer"
                          : canProceedToStep(step.id)
                          ? "bg-muted text-muted-foreground hover:bg-muted/80 cursor-pointer"
                          : "bg-muted/50 text-muted-foreground/50 cursor-not-allowed"
                      }`}
                    >
                      <step.icon className="h-4 w-4" />
                      <span className="hidden sm:inline font-medium">
                        {step.title}
                      </span>
                    </button>
                    {index < currentSteps.length - 1 && (
                      <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              {currentStep === 1 && (
                <Card className="border-[#5FBDB7]/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>Edit Message</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          Trigger: {automation.trigger}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800">
                          Auto-Generated
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {automation.description}
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="message">SMS Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Customize your automation message..."
                        value={
                          editData.useAiVersion
                            ? editData.aiMessage
                            : editData.message
                        }
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            [editData.useAiVersion ? "aiMessage" : "message"]:
                              e.target.value,
                          }))
                        }
                        rows={4}
                        className="mt-1"
                      />
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm text-muted-foreground">
                          {
                            (editData.useAiVersion
                              ? editData.aiMessage
                              : editData.message
                            ).length
                          }
                          /160 characters
                        </p>
                        <div
                          className={`text-xs px-2 py-1 rounded ${
                            (editData.useAiVersion
                              ? editData.aiMessage
                              : editData.message
                            ).length > 160
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {(editData.useAiVersion
                            ? editData.aiMessage
                            : editData.message
                          ).length <= 160
                            ? "✓ Single SMS"
                            : "⚠ Multiple SMS"}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        onClick={handleAiImprove}
                        className="flex-1"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />✨ Improve with AI
                      </Button>

                      {editData.aiMessage && (
                        <Button
                          variant={
                            editData.useAiVersion ? "default" : "outline"
                          }
                          onClick={() =>
                            setEditData((prev) => ({
                              ...prev,
                              useAiVersion: !prev.useAiVersion,
                            }))
                          }
                          className="flex-1"
                        >
                          {editData.useAiVersion
                            ? "✅ Using AI Version"
                            : "Use AI Version"}
                        </Button>
                      )}
                    </div>

                    <Button
                      onClick={() => setCurrentStep(2)}
                      disabled={!editData.message}
                      className="w-full bg-[#5FBDB7] hover:bg-[#5FBDB7]/90"
                    >
                      Next: Schedule Settings
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )}

              {currentStep === 2 && (
                <Card className="border-[#5FBDB7]/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Schedule Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="recurring"
                        checked={editData.isRecurring}
                        onCheckedChange={(checked) =>
                          setEditData((prev) => ({
                            ...prev,
                            isRecurring: !!checked,
                          }))
                        }
                      />
                      <Label
                        htmlFor="recurring"
                        className="flex items-center space-x-2"
                      >
                        <Repeat className="h-4 w-4" />
                        <span>Enable recurring automation</span>
                      </Label>
                    </div>

                    {editData.isRecurring && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <Label>Select Days</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {weekDays.map((day) => (
                              <Button
                                key={day.id}
                                variant={
                                  editData.recurringDays.includes(day.id)
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => handleRecurringDayToggle(day.id)}
                                className={`min-w-[44px] ${
                                  editData.recurringDays.includes(day.id)
                                    ? "bg-[#5FBDB7] hover:bg-[#5FBDB7]/90"
                                    : ""
                                }`}
                              >
                                {day.label}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="recurringTime">Send Time</Label>
                            <Input
                              id="recurringTime"
                              type="time"
                              value={editData.recurringTime}
                              onChange={(e) =>
                                setEditData((prev) => ({
                                  ...prev,
                                  recurringTime: e.target.value,
                                }))
                              }
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="recurringEndDate">
                              End Date (Optional)
                            </Label>
                            <Input
                              id="recurringEndDate"
                              type="date"
                              value={editData.recurringEndDate}
                              onChange={(e) =>
                                setEditData((prev) => ({
                                  ...prev,
                                  recurringEndDate: e.target.value,
                                }))
                              }
                              className="mt-1"
                              min={new Date().toISOString().split("T")[0]}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        onClick={() => setCurrentStep(3)}
                        disabled={
                          editData.isRecurring &&
                          editData.recurringDays.length === 0
                        }
                        className="flex-1 bg-[#5FBDB7] hover:bg-[#5FBDB7]/90"
                      >
                        Next: Review & Save
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 3 && (
                <Card className="border-[#5FBDB7]/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Review & Save</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                      <div>
                        <h4 className="font-medium mb-2">Message Preview:</h4>
                        <div className="bg-white p-3 rounded border">
                          <p className="text-sm">
                            {editData.useAiVersion && editData.aiMessage
                              ? editData.aiMessage
                              : editData.message}
                          </p>
                        </div>
                      </div>

                      {editData.isRecurring &&
                        editData.recurringDays.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">
                              Recurring Schedule:
                            </h4>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Repeat className="h-4 w-4" />
                              <span>
                                Every {editData.recurringDays.join(", ")} at{" "}
                                {editData.recurringTime}
                                {editData.recurringEndDate &&
                                  ` until ${editData.recurringEndDate}`}
                              </span>
                            </div>
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="flex-1 bg-[#5FBDB7] hover:bg-[#5FBDB7]/90"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Mobile Preview - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:block lg:w-80 xl:w-96 border-l bg-muted/20">
            <div className="p-4 md:p-6 h-full">
              <div className="sticky top-6">
                <div className="flex items-center mb-4">
                  <Smartphone className="mr-2 h-5 w-5" />
                  <h3 className="font-semibold">Mobile Preview</h3>
                </div>

                {/* Realistic Phone Frame */}
                <div className="mx-auto w-full max-w-xs bg-slate-900 rounded-[2.5rem] p-2 shadow-xl">
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
                      <div className="w-10 h-10 bg-[#5FBDB7] rounded-full flex items-center justify-center text-white font-bold text-lg">
                        B
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-slate-900">
                            Bella's Boutique
                          </h3>
                          <span className="text-xs text-slate-500">
                            {getCurrentTime()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Automation: {automation.title}
                        </p>
                      </div>
                    </div>

                    {/* Message Bubble */}
                    <div className="space-y-3">
                      <div className="flex justify-start">
                        <div className="bg-slate-100 rounded-2xl rounded-tl-md p-3 max-w-[85%] shadow-sm">
                          <p className="text-sm text-slate-900 leading-relaxed">
                            {editData.useAiVersion && editData.aiMessage
                              ? editData.aiMessage
                              : editData.message || automation.message}
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

                      {/* Recurring Info */}
                      {editData.isRecurring &&
                        editData.recurringDays.length > 0 && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mt-4">
                            <div className="flex items-center space-x-2 text-xs text-blue-700">
                              <Repeat className="h-3 w-3" />
                              <span>
                                Repeats: {editData.recurringDays.join(", ")} at{" "}
                                {editData.recurringTime}
                              </span>
                            </div>
                          </div>
                        )}
                    </div>

                    {/* Character Count Indicator */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-slate-50 rounded-lg p-2 text-center">
                        <span
                          className={`text-xs font-medium ${
                            (editData.useAiVersion
                              ? editData.aiMessage
                              : editData.message
                            ).length > 160
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {
                            (editData.useAiVersion
                              ? editData.aiMessage
                              : editData.message
                            ).length
                          }
                          /160 chars
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Preview for smaller screens */}
        <div className="lg:hidden border-t bg-muted/20 p-4">
          <div className="flex items-center mb-3">
            <Smartphone className="mr-2 h-4 w-4" />
            <h3 className="font-semibold text-sm">Preview</h3>
          </div>
          <div className="bg-slate-100 rounded-lg p-3">
            <p className="text-sm text-slate-900">
              {editData.useAiVersion && editData.aiMessage
                ? editData.aiMessage
                : editData.message || automation.message}
            </p>
            <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
              <span>
                {
                  (editData.useAiVersion
                    ? editData.aiMessage
                    : editData.message
                  ).length
                }
                /160 chars
              </span>
              <span>Bella's Boutique</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAutomationModal;
