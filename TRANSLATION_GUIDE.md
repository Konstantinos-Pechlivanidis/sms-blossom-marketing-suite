# Translation Guide - react-i18next

This guide shows how to translate components in your project using react-i18next.

## Basic Usage Example

Here's how to translate a component step by step:

### Before Translation (Hardcoded Text)
```tsx
// ❌ Before - with hardcoded strings
import { Button } from "@/components/ui/button";

export const MyComponent = () => {
  return (
    <div>
      <h1>Welcome to SMS Marketing</h1>
      <p>Create powerful SMS campaigns</p>
      <Button>Get Started</Button>
    </div>
  );
};
```

### After Translation (Using t() function)
```tsx
// ✅ After - using translations
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <p>{t('welcome.description')}</p>
      <Button>{t('common.getStarted')}</Button>
    </div>
  );
};
```

### Translation Files
Add corresponding keys to your translation files:

**src/i18n/locales/en.json**
```json
{
  "welcome": {
    "title": "Welcome to SMS Marketing",
    "description": "Create powerful SMS campaigns"
  },
  "common": {
    "getStarted": "Get Started"
  }
}
```

**src/i18n/locales/gr.json**
```json
{
  "welcome": {
    "title": "Καλώς ήρθατε στο SMS Μάρκετινγκ",
    "description": "Δημιουργήστε ισχυρές καμπάνιες SMS"
  },
  "common": {
    "getStarted": "Ξεκινήστε"
  }
}
```

## Translation Best Practices

### 1. Organize Keys Hierarchically
```tsx
// ✅ Good - organized by feature/section
t('dashboard.stats.totalUsers')
t('campaigns.actions.create')
t('settings.profile.email')

// ❌ Avoid - flat structure
t('dashboardStatsotalUsers')
t('campaignsActionsCreate')
```

### 2. Use Common Keys for Repeated Text
```tsx
// ✅ Good - reusable common keys
t('common.save')
t('common.cancel')
t('common.loading')

// ❌ Avoid - duplicating similar text
t('user.save')
t('campaign.save')
t('template.save')
```

### 3. Handle Dynamic Content
```tsx
// With interpolation
t('welcome.greeting', { name: user.name })
// Translation: "Hello, {{name}}!"

// With pluralization
t('campaigns.count', { count: campaignCount })
// Translations: 
// "campaigns.count_zero": "No campaigns"
// "campaigns.count_one": "{{count}} campaign"
// "campaigns.count_other": "{{count}} campaigns"
```

### 4. Handle Arrays and Complex Structures
```tsx
// For navigation items
const navItems = [
  { name: t('navigation.dashboard'), href: "/" },
  { name: t('navigation.campaigns'), href: "/campaigns" },
  { name: t('navigation.settings'), href: "/settings" }
];

// For form labels
<label>{t('forms.email.label')}</label>
<input placeholder={t('forms.email.placeholder')} />
```

## Component Translation Checklist

When translating a component:

1. ✅ Import `useTranslation` hook
2. ✅ Add `const { t } = useTranslation();`
3. ✅ Replace all hardcoded strings with `t('key')`
4. ✅ Add translation keys to both `en.json` and `gr.json`
5. ✅ Test language switching
6. ✅ Verify text fits UI in both languages

## Common Translation Patterns

### Form Components
```tsx
const { t } = useTranslation();

return (
  <form>
    <label>{t('forms.campaignName.label')}</label>
    <input 
      placeholder={t('forms.campaignName.placeholder')}
      aria-label={t('forms.campaignName.ariaLabel')}
    />
    <Button type="submit">{t('common.submit')}</Button>
  </form>
);
```

### Error Messages
```tsx
const { t } = useTranslation();

if (error) {
  return <div>{t('errors.networkError')}</div>;
}

if (notFound) {
  return <div>{t('errors.pageNotFound')}</div>;
}
```

### Status and Actions
```tsx
const { t } = useTranslation();

const getStatusLabel = (status: string) => {
  return t(`campaigns.status.${status.toLowerCase()}`);
};

const actionButtons = [
  { label: t('common.edit'), action: handleEdit },
  { label: t('common.delete'), action: handleDelete }
];
```

## Language Switching

The LanguageSwitcher component is available throughout the app:

```tsx
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";

// Use in any component where you want language switching
<LanguageSwitcher />
```

The selected language is automatically:
- Saved to localStorage
- Applied to all components using useTranslation
- Persisted across browser sessions

## Adding New Languages

1. Create new locale file: `src/i18n/locales/[code].json`
2. Add translations for all existing keys
3. Update the language list in `LanguageSwitcher.tsx`
4. Add import in `src/i18n/index.ts`

This setup ensures your entire app supports multiple languages with minimal effort!