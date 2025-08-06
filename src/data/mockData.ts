export const kpiData = [
  {
    title: "Total Campaigns Sent",
    value: "247",
    change: "+12%",
    changeType: "positive" as const,
    icon: "Send",
    color: "text-primary"
  },
  {
    title: "Avg Conversion Rate",
    value: "18.4%",
    change: "+3.2%",
    changeType: "positive" as const,
    icon: "TrendingUp",
    color: "text-green-600"
  },
  {
    title: "Active Contacts",
    value: "2,847",
    change: "+156",
    changeType: "positive" as const,
    icon: "Users",
    color: "text-blue-600"
  },
  {
    title: "Scheduled Campaigns",
    value: "12",
    change: "3 today",
    changeType: "neutral" as const,
    icon: "Calendar",
    color: "text-purple-600"
  }
];

export const recentCampaigns = [
  {
    name: "Weekend Special - 30% Off",
    status: "Sent",
    sent: "2 hours ago",
    recipients: 1247,
    conversions: 23
  },
  {
    name: "New Arrivals Alert",
    status: "Scheduled",
    sent: "Tomorrow 9:00 AM",
    recipients: 2108,
    conversions: 0
  },
  {
    name: "Birthday Rewards",
    status: "Sent",
    sent: "Yesterday",
    recipients: 89,
    conversions: 12
  }
];

export const templates = [
  {
    id: 1,
    title: "Weekend Flash Sale",
    category: "Fashion Stores",
    conversionRate: "32%",
    message: "🎉 FLASH SALE! 50% off everything this weekend only! Use code WEEKEND50. Shop now: [link]",
    testimonial: "Increased weekend sales by 200%! - Maria, boutique owner",
    rating: 4.9
  },
  {
    id: 2,
    title: "New Member Welcome",
    category: "Gyms",
    conversionRate: "28%",
    message: "Welcome to FitLife! 💪 Your first personal training session is FREE. Book now: [link]",
    testimonial: "Perfect for converting trial members - Jake, gym manager",
    rating: 4.8
  },
  {
    id: 3,
    title: "Daily Coffee Special",
    category: "Coffee Shops",
    conversionRate: "24%",
    message: "☕ Today's special: Buy any large coffee, get a pastry FREE! Valid until 3 PM.",
    testimonial: "Boosts afternoon sales every time - Emma, café owner",
    rating: 4.7
  },
  {
    id: 4,
    title: "Appointment Reminder",
    category: "Beauty",
    conversionRate: "45%",
    message: "Hi [Name]! Reminder: Your appointment is tomorrow at [time]. Reply CONFIRM or call us.",
    testimonial: "Reduced no-shows by 60% - Lisa, salon owner",
    rating: 4.9
  },
  {
    id: 5,
    title: "Birthday Surprise",
    category: "All",
    conversionRate: "38%",
    message: "🎂 Happy Birthday [Name]! Enjoy 30% off your next visit as our gift to you! Code: BDAY30",
    testimonial: "Creates such a personal touch - customers love it!",
    rating: 4.8
  },
  {
    id: 6,
    title: "Lunch Rush Special",
    category: "Restaurants",
    conversionRate: "29%",
    message: "🍽️ Lunch Special: Any main dish + drink for $12.99! Available until 3 PM today.",
    testimonial: "Perfect for slow lunch hours - Tony, restaurant owner",
    rating: 4.6
  },
  {
    id: 7,
    title: "Class Reminder",
    category: "Gyms",
    conversionRate: "41%",
    message: "Don't forget! Your yoga class starts in 1 hour. See you there! 🧘‍♀️",
    testimonial: "Attendance improved significantly - Sarah, instructor",
    rating: 4.8
  },
  {
    id: 8,
    title: "Seasonal Promotion",
    category: "Fashion Stores",
    conversionRate: "35%",
    message: "🍂 Fall Collection is here! 40% off all sweaters and jackets. Limited time!",
    testimonial: "Great for seasonal inventory - Rachel, store manager",
    rating: 4.7
  }
];

export const creditPacks = [
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