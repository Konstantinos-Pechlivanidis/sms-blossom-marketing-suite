import type { KPIData, RecentCampaign, Template, CreditPack, Campaign, User } from '@/types';

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

export const englishTemplates: Template[] = [
  {
    id: 1,
    title: "Weekend Flash Sale",
    category: "Fashion Stores",
    message: "🎉 FLASH SALE! 50% off everything this weekend only! Use code WEEKEND50. Shop now: [link]",
    tags: ["sale", "weekend", "fashion"],
    conversionRate: "32.1%",
    testimonial: "Our best performing urgency template for flash sales",
    rating: 4.9,
    highlight: false,
  },
  {
    id: 2,
    title: "New Member Welcome",
    category: "Gyms",
    message: "Welcome to FitLife! 💪 Your first personal training session is FREE. Book now: [link]",
    tags: ["welcome", "fitness", "free"],
    conversionRate: "24.5%",
    testimonial: "This template increased our new customer retention by 40%",
    rating: 4.8,
    highlight: false,
  },
  {
    id: 3,
    title: "Daily Coffee Special",
    category: "Coffee Shops",
    message: "☕ Today's special: Buy any large coffee, get a pastry FREE! Valid until 3 PM.",
    tags: ["coffee", "special", "free"],
    conversionRate: "21.3%",
    testimonial: "Great for introducing new menu items to customers",
    rating: 4.5,
    highlight: false,
  },
  {
    id: 4,
    title: "Appointment Reminder",
    category: "Beauty",
    message: "Hi [Name]! Reminder: Your appointment is tomorrow at [time]. Reply CONFIRM or call us.",
    tags: ["reminder", "appointment", "beauty"],
    conversionRate: "15.8%",
    testimonial: "Reduces no-shows significantly",
    rating: 4.4,
    highlight: false,
  },
  {
    id: 5,
    title: "Birthday Surprise",
    category: "All",
    message: "🎂 Happy Birthday [Name]! Enjoy 30% off your next visit as our gift to you! Code: BDAY30",
    tags: ["birthday", "discount", "personal"],
    conversionRate: "28.7%",
    testimonial: "Customers love personal birthday messages",
    rating: 4.7,
    highlight: false,
  },
  {
    id: 6,
    title: "Lunch Rush Special",
    category: "Restaurants",
    message: "🍽️ Lunch Special: Any main dish + drink for $12.99! Available until 3 PM today.",
    tags: ["lunch", "restaurant", "special"],
    conversionRate: "26.4%",
    testimonial: "Perfect for weekend promotions",
    rating: 4.6,
    highlight: false,
  },
  {
    id: 7,
    title: "Class Reminder",
    category: "Gyms",
    message: "Don't forget! Your yoga class starts in 1 hour. See you there! 🧘‍♀️",
    tags: ["reminder", "class", "yoga"],
    conversionRate: "18.2%",
    testimonial: "Perfect for keeping members engaged and motivated",
    rating: 4.6,
    highlight: false,
  },
  {
    id: 8,
    title: "Seasonal Promotion",
    category: "Fashion Stores",
    message: "🍂 Fall Collection is here! 40% off all sweaters and jackets. Limited time!",
    tags: ["seasonal", "fashion", "promotion"],
    conversionRate: "35.2%",
    testimonial: "Excellent for customer retention",
    rating: 4.8,
    highlight: true,
  }
];

export const greekTemplates: Template[] = [
  {
    id: 9,
    title: "Καλοκαιρινή Έκπτωση",
    category: "Fashion Stores",
    message: "☀️ Καλοκαιρινές Εκπτώσεις! 50% σε όλα τα είδη! Χρησιμοποιήστε τον κωδικό SUMMER50. Αγοράστε τώρα: [link]",
    tags: ["έκπτωση", "καλοκαίρι", "μόδα"],
    conversionRate: "35.5%",
    testimonial: "Αυξήσαμε τις πωλήσεις κατά 150% - Μαρία, ιδιοκτήτρια μπουτίκ",
    rating: 4.9,
    highlight: false,
  },
  {
    id: 10,
    title: "Καλωσόρισμα Νέου Μέλους",
    category: "Gyms",
    message: "Καλωσόρισμα στη FitLife! 💪 Η πρώτη σας προπόνηση είναι ΔΩΡΕΑΝ. Κάντε κράτηση τώρα: [link]",
    tags: ["καλωσόρισμα", "γυμναστήριο", "δωρεάν"],
    conversionRate: "28.1%",
    testimonial: "Ιδανικό για την απόκτηση νέων μελών - Γιάννης, manager γυμναστηρίου",
    rating: 4.8,
    highlight: false,
  },
  {
    id: 11,
    title: "Καθημερινή Προσφορά Καφέ",
    category: "Coffee Shops",
    message: "☕ Σημερινή προσφορά: Αγοράστε έναν μεγάλο καφέ, και πάρτε ένα γλυκό ΔΩΡΕΑΝ! Ισχύει μέχρι τις 3 μ.μ.",
    tags: ["καφές", "προσφορά", "γλυκό"],
    conversionRate: "23.9%",
    testimonial: "Αυξάνει τις απογευματινές πωλήσεις - Ελένη, ιδιοκτήτρια καφέ",
    rating: 4.7,
    highlight: false,
  },
  {
    id: 12,
    title: "Υπενθύμιση Ραντεβού",
    category: "Beauty",
    message: "Γεια σας [Name]! Υπενθύμιση: Το ραντεβού σας είναι αύριο στις [time]. Απαντήστε ΕΠΙΒΕΒΑΙΩΣΗ ή καλέστε μας.",
    tags: ["υπενθύμιση", "ραντεβού", "ομορφιά"],
    conversionRate: "17.4%",
    testimonial: "Μειώνει σημαντικά τις ακυρώσεις - Λίνα, ιδιοκτήτρια κομμωτηρίου",
    rating: 4.6,
    highlight: false,
  },
  {
    id: 13,
    title: "Γενέθλια Έκπληξη",
    category: "All",
    message: "🎂 Χρόνια Πολλά [Name]! Απολαύστε 30% έκπτωση στην επόμενη επίσκεψή σας ως δώρο από εμάς! Κωδικός: BDAY30",
    tags: ["γενέθλια", "έκπτωση", "προσωπική"],
    conversionRate: "31.2%",
    testimonial: "Οι πελάτες λατρεύουν τα προσωπικά μηνύματα γενεθλίων",
    rating: 4.8,
    highlight: true,
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

export const campaigns: Campaign[] = [
  {
    id: 1,
    name: "Weekend Special - 30% Off",
    status: "Sent",
    sent: "2 hours ago",
    recipients: 1247,
    conversions: 23,
    conversionRate: "1.8%",
    message: "🎉 Weekend Special! Get 30% off all items. Use code WEEKEND30. Limited time offer!",
    date: "2024-01-15",
    time: "10:30 AM"
  },
  {
    id: 2,
    name: "New Arrivals Alert",
    status: "Scheduled",
    sent: "Tomorrow 9:00 AM",
    recipients: 2108,
    conversions: 0,
    conversionRate: "0%",
    message: "🆕 New arrivals are here! Check out our latest collection. Shop now for early bird discounts!",
    date: "2024-01-16",
    time: "09:00 AM"
  },
  {
    id: 3,
    name: "Birthday Rewards",
    status: "Sent",
    sent: "Yesterday",
    recipients: 89,
    conversions: 12,
    conversionRate: "13.5%",
    message: "🎂 Happy Birthday! Enjoy a special 25% discount as our gift to you. Code: BIRTHDAY25",
    date: "2024-01-14",
    time: "02:00 PM"
  },
  {
    id: 4,
    name: "Flash Sale Alert",
    status: "Draft",
    recipients: 0,
    conversions: 0,
    conversionRate: "0%",
    message: "⚡ FLASH SALE! 50% off everything for the next 2 hours only! Don't miss out!"
  }
];

export const currentUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 234 567 8900'
};

export const smsCredits: number = 2847;
