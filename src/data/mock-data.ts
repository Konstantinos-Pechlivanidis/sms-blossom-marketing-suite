import type { KPIData, RecentCampaign, Template, CreditPack } from '@/types';

export const kpiData: KPIData[] = [
  {
    title: "Total Campaigns Sent",
    value: "247",
    change: "+12%",
    changeType: "positive",
    icon: "Send",
    color: "text-primary"
  },
  {
    title: "Avg Conversion Rate",
    value: "18.4%",
    change: "+3.2%",
    changeType: "positive",
    icon: "TrendingUp",
    color: "text-success"
  },
  {
    title: "Active Contacts",
    value: "2,847",
    change: "+156",
    changeType: "positive",
    icon: "Users",
    color: "text-info"
  },
  {
    title: "Scheduled Campaigns",
    value: "12",
    change: "3 today",
    changeType: "neutral",
    icon: "Calendar",
    color: "text-warning"
  }
];

export const recentCampaigns: RecentCampaign[] = [
  {
    name: "Weekend Special - 30% Off",
    status: "sent",
    sent: "2 hours ago",
    recipients: 1247,
    conversions: 23
  },
  {
    name: "New Arrivals Alert",
    status: "scheduled",
    sent: "Tomorrow 9:00 AM",
    recipients: 2108,
    conversions: 0
  },
  {
    name: "Birthday Rewards",
    status: "sent",
    sent: "Yesterday",
    recipients: 89,
    conversions: 12
  }
];

export const templates: Template[] = [
  {
    id: 1,
    title: "Weekend Flash Sale",
    category: "Fashion Stores",
    message: "🎉 FLASH SALE! 50% off everything this weekend only! Use code WEEKEND50. Shop now: [link]",
    tags: ["sale", "weekend", "fashion"]
  },
  {
    id: 2,
    title: "New Member Welcome",
    category: "Gyms",
    message: "Welcome to FitLife! 💪 Your first personal training session is FREE. Book now: [link]",
    tags: ["welcome", "fitness", "free"]
  },
  {
    id: 3,
    title: "Daily Coffee Special",
    category: "Coffee Shops",
    message: "☕ Today's special: Buy any large coffee, get a pastry FREE! Valid until 3 PM.",
    tags: ["coffee", "special", "free"]
  },
  {
    id: 4,
    title: "Appointment Reminder",
    category: "Beauty",
    message: "Hi [Name]! Reminder: Your appointment is tomorrow at [time]. Reply CONFIRM or call us.",
    tags: ["reminder", "appointment", "beauty"]
  },
  {
    id: 5,
    title: "Birthday Surprise",
    category: "All",
    message: "🎂 Happy Birthday [Name]! Enjoy 30% off your next visit as our gift to you! Code: BDAY30",
    tags: ["birthday", "discount", "personal"]
  },
  {
    id: 6,
    title: "Lunch Rush Special",
    category: "Restaurants",
    message: "🍽️ Lunch Special: Any main dish + drink for $12.99! Available until 3 PM today.",
    tags: ["lunch", "restaurant", "special"]
  },
  {
    id: 7,
    title: "Class Reminder",
    category: "Gyms",
    message: "Don't forget! Your yoga class starts in 1 hour. See you there! 🧘‍♀️",
    tags: ["reminder", "class", "yoga"]
  },
  {
    id: 8,
    title: "Seasonal Promotion",
    category: "Fashion Stores",
    message: "🍂 Fall Collection is here! 40% off all sweaters and jackets. Limited time!",
    tags: ["seasonal", "fashion", "promotion"]
  }
];

export const creditPacks: CreditPack[] = [
  {
    id: "starter",
    title: "Starter Pack",
    credits: 100,
    price: "€3.99",
    description: "Perfect for small campaigns",
    features: ["100 SMS messages", "Basic analytics", "24/7 support"],
    popular: false
  },
  {
    id: "business",
    title: "Business Pack",
    credits: 500,
    price: "€14.99",
    description: "Best value for growing businesses",
    features: ["500 SMS messages", "Advanced analytics", "Priority support", "5% bonus credits"],
    popular: true,
    originalPrice: "€19.95"
  },
  {
    id: "enterprise",
    title: "Enterprise Pack",
    credits: 1000,
    price: "€27.99",
    description: "For high-volume campaigns",
    features: ["1,000 SMS messages", "Premium analytics", "Dedicated support", "10% bonus credits"],
    popular: false,
    originalPrice: "€39.99"
  }
];

export const mockTemplates = templates;