import { MessageSquare, Calendar, Settings } from "lucide-react";

export const campaignSteps = [
  { id: 1, title: "Campaign Details", completed: false },
  { id: 2, title: "Target Audience", completed: false },
  { id: 3, title: "Write Message", completed: false },
  { id: 4, title: "Schedule & Send", completed: false }
];

export const automationSteps = [
  { id: 1, title: "Message", icon: MessageSquare, completed: false },
  { id: 2, title: "Schedule", icon: Calendar, completed: false },
  { id: 3, title: "Review", icon: Settings, completed: false }
];