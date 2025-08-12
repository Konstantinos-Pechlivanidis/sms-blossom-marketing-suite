import type { KPIData, RecentCampaign, Template, CreditPack, Campaign, User, Contact, CustomView } from '@/types';

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
    message: "� Χρόνια Πολλά [Name]! Απολαύστε 30% έκπτωση στην επόμενη επίσκεψή σας ως δώρο από εμάς! Κωδικός: BDAY30",
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

export const dummyContacts: Contact[] = [
  { id: '1', name: 'Sarah Johnson', phone: '+1 (555) 123-4567', email: 'sarah.johnson@email.com', gender: 'female', isVip: true, tags: ['Regular Customer'], lastInteraction: 'Last Campaign: Dec 15', conversions: 8, joinDate: '2023-06-15', notes: 'Prefers evening campaigns' },
  { id: '2', name: 'Mike Chen', phone: '+1 (555) 234-5678', email: 'mike.chen@email.com', gender: 'male', isVip: false, tags: ['New Customer'], lastInteraction: 'Last Campaign: Dec 10', conversions: 2, joinDate: '2023-11-20', notes: 'Interested in tech products' },
  { id: '3', name: 'Emma Rodriguez', phone: '+1 (555) 345-6789', email: 'emma.rodriguez@email.com', gender: 'female', isVip: true, tags: ['VIP', 'Birthday Club'], lastInteraction: 'Last Campaign: Dec 18', conversions: 12, joinDate: '2023-01-10', notes: 'High-value customer, responds well to personalized offers' },
  { id: '4', name: 'James Wilson', phone: '+1 (555) 456-7890', email: 'james.wilson@email.com', gender: 'male', isVip: false, tags: ['Gym Member'], lastInteraction: 'Last Campaign: Dec 5', conversions: 3, joinDate: '2023-08-22', notes: 'Fitness enthusiast' },
  { id: '5', name: 'Lisa Park', phone: '+1 (555) 567-8901', email: 'lisa.park@email.com', gender: 'female', isVip: true, tags: ['VIP', 'Fashion Lover'], lastInteraction: 'Last Campaign: Dec 20', conversions: 15, joinDate: '2023-03-05', notes: 'Fashion trendsetter, loves exclusive deals' },
  { id: '6', name: 'David Brown', phone: '+1 (555) 678-9012', email: 'david.brown@email.com', gender: 'male', isVip: false, tags: ['Coffee Regular'], lastInteraction: 'Last Campaign: Dec 12', conversions: 4, joinDate: '2023-09-18', notes: 'Coffee lover, morning person' },
  { id: '7', name: 'Anna Martinez', phone: '+1 (555) 789-0123', email: 'anna.martinez@email.com', gender: 'female', isVip: true, tags: ['VIP', 'Beauty Services'], lastInteraction: 'Last Campaign: Dec 19', conversions: 9, joinDate: '2023-02-28', notes: 'Beauty and wellness focused' },
  { id: '8', name: 'Tom Anderson', phone: '+1 (555) 890-1234', email: 'tom.anderson@email.com', gender: 'male', isVip: false, tags: ['Seasonal'], lastInteraction: 'Last Campaign: Nov 28', conversions: 1, joinDate: '2023-10-05', notes: 'Seasonal shopper' },
  { id: '9', name: 'Rachel Green', phone: '+1 (555) 901-2345', email: 'rachel.green@email.com', gender: 'female', isVip: true, tags: ['VIP', 'High Spender'], lastInteraction: 'Last Campaign: Dec 21', conversions: 18, joinDate: '2023-01-15', notes: 'Premium customer, high lifetime value' },
  { id: '10', name: 'Alex Kim', phone: '+1 (555) 012-3456', email: 'alex.kim@email.com', gender: 'male', isVip: false, tags: ['Tech Enthusiast'], lastInteraction: 'Last Campaign: Dec 8', conversions: 2, joinDate: '2023-11-12', notes: 'Tech savvy, likes gadgets' },
  { id: '11', name: 'Sofia Gonzalez', phone: '+1 (555) 111-2222', email: 'sofia.gonzalez@email.com', gender: 'female', isVip: true, tags: ['VIP', 'Loyal Customer'], lastInteraction: 'Last Campaign: Dec 22', conversions: 11, joinDate: '2023-04-10', notes: 'Loyal customer, great referrer' },
  { id: '12', name: 'Ryan O\'Connor', phone: '+1 (555) 222-3333', email: 'ryan.oconnor@email.com', gender: 'male', isVip: false, tags: ['Sports Fan'], lastInteraction: 'Last Campaign: Dec 7', conversions: 3, joinDate: '2023-07-25', notes: 'Sports enthusiast' },
  { id: '13', name: 'Maya Patel', phone: '+1 (555) 333-4444', email: 'maya.patel@email.com', gender: 'female', isVip: true, tags: ['VIP', 'Wellness'], lastInteraction: 'Last Campaign: Dec 23', conversions: 14, joinDate: '2023-05-08', notes: 'Health and wellness focused' },
  { id: '14', name: 'Chris Taylor', phone: '+1 (555) 444-5555', email: 'chris.taylor@email.com', gender: 'male', isVip: false, tags: ['Foodie'], lastInteraction: 'Last Campaign: Dec 11', conversions: 4, joinDate: '2023-06-30', notes: 'Food lover, restaurant deals' },
  { id: '15', name: 'Nicole White', phone: '+1 (555) 555-6666', email: 'nicole.white@email.com', gender: 'female', isVip: true, tags: ['VIP', 'Fashion'], lastInteraction: 'Last Campaign: Dec 24', conversions: 16, joinDate: '2023-02-14', notes: 'Fashion forward, trend setter' },
  { id: '16', name: 'Daniel Lee', phone: '+1 (555) 666-7777', email: 'daniel.lee@email.com', gender: 'male', isVip: false, tags: ['Student'], lastInteraction: 'Last Campaign: Dec 3', conversions: 1, joinDate: '2023-09-01', notes: 'Student discounts work well' },
  { id: '17', name: 'Jessica Thompson', phone: '+1 (555) 777-8888', email: 'jessica.thompson@email.com', gender: 'female', isVip: true, tags: ['VIP', 'Premium'], lastInteraction: 'Last Campaign: Dec 25', conversions: 13, joinDate: '2023-03-20', notes: 'Premium service customer' },
  { id: '18', name: 'Marcus Johnson', phone: '+1 (555) 888-9999', email: 'marcus.johnson@email.com', gender: 'male', isVip: false, tags: ['Casual Shopper'], lastInteraction: 'Last Campaign: Dec 6', conversions: 2, joinDate: '2023-10-15', notes: 'Casual buyer, price sensitive' },
  { id: '19', name: 'Amanda Davis', phone: '+1 (555) 999-0000', email: 'amanda.davis@email.com', gender: 'female', isVip: true, tags: ['VIP', 'Exclusive'], lastInteraction: 'Last Campaign: Dec 26', conversions: 20, joinDate: '2023-01-05', notes: 'VIP customer, exclusive offers only' },
  { id: '20', name: 'Kevin Zhang', phone: '+1 (555) 000-1111', email: 'kevin.zhang@email.com', gender: 'male', isVip: false, tags: ['New Member'], lastInteraction: 'Last Campaign: Dec 1', conversions: 1, joinDate: '2023-11-30', notes: 'New member, onboarding phase' }
];

export const customViews: CustomView[] = [
  {
    id: 'high-conversions',
    name: 'High Conversions',
    filters: {}
  },
  {
    id: 'birthday-club',
    name: 'Birthday Club',
    filters: {}
  }
];