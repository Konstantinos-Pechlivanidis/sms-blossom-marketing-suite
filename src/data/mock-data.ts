import { KPIData, RecentCampaign, Template, CreditPack, Campaign, User, Contact, CustomView } from '@/types';
import { Automation } from '@/types/automation';

export const currentUser: User = {
  id: 'user-1a2b3c',
  name: 'Nikos Papadopoulos',
  email: 'nikos.p@thegroovebar.gr',
  businessName: 'The Groove Bar',
};

export const smsCredits: number = 2450;

export const kpiData: KPIData[] = [
  {
    title: 'Total Sent',
    value: '12,540',
    change: '+15.3%',
    changeType: 'positive',
    icon: 'Send',
    color: 'text-primary',
  },
  {
    title: 'Conversion Rate',
    value: '4.8%',
    change: '+2.1%',
    changeType: 'positive',
    icon: 'TrendingUp',
    color: 'text-green-500',
  },
  {
    title: 'New Subscribers',
    value: '289',
    change: '+32',
    changeType: 'positive',
    icon: 'Users',
    color: 'text-blue-500',
  },
  {
    title: 'Campaigns Sent',
    value: '42',
    change: '-2',
    changeType: 'negative',
    icon: 'Calendar',
    color: 'text-orange-500',
  },
];

export const recentCampaigns: RecentCampaign[] = [
  {
    name: 'Weekend Cocktail Nights',
    sent: 'Sent on Aug 08, 2025',
    recipients: 1200,
    conversions: '78',
    status: 'sent',
  },
  {
    name: 'Mid-Week Coffee Boost',
    sent: 'Sent on Aug 05, 2025',
    recipients: 950,
    conversions: '45',
    status: 'sent',
  },
];

export const campaigns: Campaign[] = [
  {
    id: 1,
    name: 'Weekend Cocktail Nights',
    message: 'Kick off your weekend at The Groove Bar! 🍹 Special 2-for-1 on all cocktails Friday & Saturday after 9 PM. Show this QR to redeem.',
    status: 'Sent',
    recipients: 1200,
    conversions: 78,
    conversionRate: '6.5%',
    sent: 'Aug 08, 2025',
    date: '2025-08-08',
    time: '18:00',
  },
  {
    id: 2,
    name: 'September Live Music Event',
    message: 'Get ready! 🎶 Live acoustic session this Saturday at The Groove Bar. Free entry! Bring your friends for a great night out.',
    status: 'Scheduled',
    recipients: 1500,
    conversions: 0,
    conversionRate: '0%',
    sent: 'N/A',
    date: '2025-09-06',
    time: '20:00',
  },
];

export const greekTemplates: Template[] = [
  {
    lang: 'gr',
    id: 'gr_restaurant_1',
    name: 'Αποκλειστική Προσφορά',
    category: 'Restaurants',
    preview: 'Μόνο για εσάς! Απολαύστε 20% έκπτωση στο επόμενο γεύμα σας. Δείξτε αυτό το μήνυμα για να εξαργυρώσετε την προσφορά σας!',
    tags: ['προσφορά', 'έκπτωση', 'εστιατόριο'],
    conversionRate: '8.2%'
  },
  {
    lang: 'gr',
    id: 'gr_gym_1',
    name: 'Πρόκληση Fitness',
    category: 'Gyms',
    preview: 'Είστε έτοιμοι για την πρόκληση; Ελάτε στο γυμναστήριο αυτή την εβδομάδα και κερδίστε ένα δωρεάν ρόφημα πρωτεΐνης!',
    tags: ['πρόκληση', 'γυμναστήριο', 'προσφορά'],
    conversionRate: '12.5%'
  },
];

export const englishTemplates: Template[] = [
  {
    lang: 'en',
    id: 'en_restaurant_1',
    name: 'Exclusive Offer',
    category: 'Restaurants',
    preview: 'Just for you! Enjoy a 20% discount on your next meal. Show this message to redeem your offer!',
    tags: ['offer', 'discount', 'restaurant'],
    conversionRate: '9.1%'
  },
  {
    lang: 'en',
    id: 'en_gym_1',
    name: 'Fitness Challenge',
    category: 'Gyms',
    preview: 'Are you up for the challenge? Come to the gym this week and get a free protein shake!',
    tags: ['challenge', 'gym', 'offer'],
    conversionRate: '11.8%'
  },
];

export const mockTemplates: Template[] = [...greekTemplates, ...englishTemplates];

export const mockAutomations: Automation[] = [
  {
    lang: 'el',
    id: "birthday_promo_gr",
    storeOwnerId: "user-1a2b3c",
    title: "Κέρασμα Γενεθλίων",
    description: "Στείλτε αυτόματα μια ειδική προσφορά στα γενέθλια των πελατών σας.",
    trigger: "Την ημέρα γενεθλίων του πελάτη",
    message: "Χρόνια Πολλά {{name}}! 🎂 Γιόρτασε μαζί μας και πάρε ένα ποτό κερασμένο! Δείξε αυτό το QR code στο ταμείο.",
    active: true,
    icon: "Clock",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    stats: { sent: 430, converted: 95 }
  },
  {
    lang: 'el',
    id: "nameday_promo_gr",
    storeOwnerId: "user-1a2b3c",
    title: "Κέρασμα Γιορτής",
    description: "Στείλτε ευχές και μία προσφορά στην ονομαστική εορτή των πελατών σας.",
    trigger: "Την ημέра ονομαστικής εορτής",
    message: "Χρόνια Πολλά για τη γιορτή σου, {{name}}! Κερνάμε τον καφέ σου σήμερα! Δείξε αυτό το QR code στο ταμείο.",
    active: true,
    icon: "Award",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    stats: { sent: 620, converted: 110 }
  },
  {
    lang: 'en',
    id: "birthday_promo_en",
    storeOwnerId: "user-1a2b3c",
    title: "Birthday Treat",
    description: "Automatically send a special offer on your customers' birthday.",
    trigger: "On customer's birthday",
    message: "Happy Birthday {{name}}! 🎂 Come celebrate with us and get a drink on the house! Show this QR code to redeem.",
    active: true,
    icon: "Clock",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    stats: { sent: 430, converted: 95 }
  },
  {
    lang: 'en',
    id: "welcome_new_customer_en",
    storeOwnerId: "user-1a2b3c",
    title: "New Member Welcome",
    description: "Greet new customers and give them a reason to visit for the first time.",
    trigger: "New contact registration",
    message: "Hey {{name}}, welcome to the club! Get 15% off your first order with us. Show this QR code to redeem.",
    active: true,
    icon: "Zap",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    stats: { sent: 1250, converted: 320 }
  },
];

export const creditPacks: CreditPack[] = [
  {
    id: 'starter',
    title: 'credits.packages.starter_pack', // KEY
    credits: 500,
    price: 10,
    description: 'credits.packageDescriptions.starter', // KEY
    features: [
      'credits.features.sms_credits', // KEY
      'credits.features.basic_support',
      'credits.features.standard_delivery'
    ],
    popular: false,
  },
  {
    id: 'professional',
    title: 'credits.packages.growth_plan', // KEY
    credits: 2500,
    price: 45,
    originalPrice: "50",
    description: 'credits.packageDescriptions.growth', // KEY
    features: [
        'credits.features.sms_credits',
        'credits.features.priority_support',
        'credits.features.fast_delivery'
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    title: 'credits.packages.pro_business', // KEY
    credits: 10000,
    price: 150,
    originalPrice: "200",
    description: 'credits.packageDescriptions.pro', // KEY
    features: [
        'credits.features.sms_credits',
        'credits.features.dedicated_support',
        'credits.features.fast_delivery'
    ],
    popular: false,
  }
];

export const dummyContacts: Contact[] = [
  {
    id: 'contact-01',
    name: 'Elena Georgiou',
    phone: '+306987654321',
    email: 'elena.g@email.com',
    gender: 'female',
    isVip: true,
    tags: ['cocktails', 'live music'],
    lastInteraction: '2025-08-08',
    conversions: 5,
    joinDate: '2024-01-15',
  },
  {
    id: 'contact-02',
    name: 'Yiannis Smirnis',
    phone: '+306971234567',
    gender: 'male',
    isVip: false,
    tags: ['coffee', 'afternoon'],
    lastInteraction: '2025-08-05',
    conversions: 2,
    joinDate: '2024-03-22',
  },
  {
    id: 'contact-03',
    name: 'Maria Dimitriou',
    phone: '+306945551234',
    email: 'maria.d@email.com',
    gender: 'female',
    isVip: false,
    tags: ['weekend', 'cocktails'],
    lastInteraction: '2025-07-21',
    conversions: 3,
    joinDate: '2024-02-10',
  },
];

export const customViews: CustomView[] = [
  {
    id: 'view-all',
    name: 'All Contacts',
    filters: {},
  },
  {
    id: 'view-vip',
    name: 'VIP Customers',
    filters: { isVip: true },
  },
  {
    id: 'view-live-music-fans',
    name: 'Live Music Fans',
    filters: { tags: ['live music'] },
  },
];