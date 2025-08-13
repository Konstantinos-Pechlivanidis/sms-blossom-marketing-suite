/**
 * An array of predefined template categories.
 * Each object contains a translation key (`key`) and a filter value (`value`).
 */
export const templateCategories = [
  { key: 'templates.categories.all', value: 'All' },
  { key: 'templates.categories.coffeeshops', value: 'Coffee Shops' },
  { key: 'templates.categories.gyms', value: 'Gyms' },
  { key: 'templates.categories.fashionstores', value: 'Fashion Stores' },
  { key: 'templates.categories.beauty', value: 'Beauty' },
  { key: 'templates.categories.restaurants', value: 'Restaurants' },
] as const;

export type TemplateCategory = (typeof templateCategories)[number]['value'];

/**
 * An array of supported template languages.
 */
export const templateLanguages = [
  { code: 'gr', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
] as const;

export type TemplateLanguage = (typeof templateLanguages)[number]['code'];