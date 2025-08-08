// Application Constants

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
export const API_TIMEOUT = 10000;

// Query Keys
export const QUERY_KEYS = {
  CAMPAIGNS: 'campaigns',
  RECENT_CAMPAIGNS: 'recent-campaigns',
  TEMPLATES: 'templates',
  CREDIT_PACKS: 'credit-packs',
  SMS_CREDITS: 'sms-credits',
  CURRENT_USER: 'current-user',
  KPI_DATA: 'kpi-data',
} as const;

// Route Paths
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  TEMPLATES: '/templates',
  CAMPAIGNS: '/campaigns',
  CREATE_CAMPAIGN: '/campaigns/create',
  CONTACTS: '/contacts',
  AUTOMATIONS: '/automations',
  CREDITS: '/credits',
  SETTINGS: '/settings',
  QR_SCAN: '/scan',
  UNSUBSCRIBE: '/unsubscribe',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  LANGUAGE: 'language',
  SMS_CREDITS: 'smsCredits',
  SIDEBAR_STATE: 'sidebarState',
} as const;

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]{10,}$/,
  PASSWORD_MIN_LENGTH: 8,
  SMS_MESSAGE_MAX_LENGTH: 160,
} as const;

// Status Types
export const STATUS_TYPES = {
  SENT: 'sent',
  SCHEDULED: 'scheduled',
  DRAFT: 'draft',
  FAILED: 'failed',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;