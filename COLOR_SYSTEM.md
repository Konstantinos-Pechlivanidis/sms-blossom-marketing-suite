# Color System Documentation

## Overview
This project uses a comprehensive semantic color system built on CSS custom properties and Tailwind CSS. All colors are defined centrally and can be easily customized.

## Color Structure

### Base Colors
- `bg-background` - Main background color
- `bg-surface` - Card/surface backgrounds
- `bg-surface-secondary` - Secondary surface backgrounds

### Text Colors
- `text-primary` - Primary text color
- `text-secondary` - Secondary text color
- `text-heading` - Heading text color
- `text-muted` - Muted/subtle text
- `text-accent` - Accent text color

### Brand Colors
- `bg-primary` - Primary brand color
- `bg-primary-hover` - Primary hover state
- `bg-primary-light` - Light variant of primary
- `text-primary-foreground` - Text on primary background

### Status Colors
- `bg-success` / `text-success` - Success states
- `bg-warning` / `text-warning` - Warning states
- `bg-error` / `text-error` - Error states
- `bg-info` / `text-info` - Info states

Each status color has a `light` variant for backgrounds:
- `bg-success-light`
- `bg-warning-light`
- `bg-error-light`
- `bg-info-light`

### Neutral Scale
Use for borders, subtle backgrounds, and text hierarchy:
- `bg-neutral-50` to `bg-neutral-900`
- `text-neutral-50` to `text-neutral-900`
- `border-neutral-300`, `border-neutral-400`, etc.

## Usage Examples

### Component with Semantic Colors
```tsx
export const MyComponent = () => {
  return (
    <div className="bg-surface border border-neutral-200 rounded-lg">
      <h2 className="text-heading text-xl font-bold">Heading</h2>
      <p className="text-secondary">Secondary text content</p>
      <button className="bg-primary text-primary-foreground hover:bg-primary-hover">
        Primary Action
      </button>
      <div className="bg-success-light text-success border border-success/20 p-2 rounded">
        Success message
      </div>
    </div>
  );
};
```

### Status Badge Component
```tsx
const StatusBadge = ({ status }: { status: 'success' | 'warning' | 'error' }) => {
  const variants = {
    success: "bg-success-light text-success border-success/20",
    warning: "bg-warning-light text-warning border-warning/20",
    error: "bg-error-light text-error border-error/20"
  };

  return (
    <span className={`px-2 py-1 rounded border ${variants[status]}`}>
      {status}
    </span>
  );
};
```

## Customizing Colors

### To Change the Primary Brand Color:
1. Update `--primary` in `src/index.css`:
```css
:root {
  --primary: 220 70% 50%; /* New HSL values */
}
```

### To Add a New Status Color:
1. Add to `src/index.css`:
```css
:root {
  --custom: 280 70% 50%;
  --custom-light: 280 70% 95%;
  --custom-foreground: 0 0% 100%;
}
```

2. Add to `tailwind.config.ts`:
```ts
colors: {
  custom: {
    DEFAULT: 'hsl(var(--custom))',
    light: 'hsl(var(--custom-light))',
    foreground: 'hsl(var(--custom-foreground))'
  }
}
```

### To Modify Text Hierarchy:
Update the text color variables in `src/index.css`:
```css
:root {
  --text-primary: 222 84% 5%;    /* Darkest text */
  --text-secondary: 215 16% 47%; /* Medium text */
  --text-muted: 215 16% 65%;     /* Lightest text */
}
```

## Dark Mode Support
All colors automatically adapt to dark mode. The system switches between light and dark variants defined in the `.dark` class in `src/index.css`.

## Migration Guide
When converting hardcoded colors to semantic tokens:

### Before:
```tsx
<div className="bg-blue-100 text-blue-800 border-blue-200">
  <h3 className="text-gray-900">Title</h3>
  <p className="text-gray-600">Description</p>
</div>
```

### After:
```tsx
<div className="bg-info-light text-info border-info/20">
  <h3 className="text-heading">Title</h3>
  <p className="text-secondary">Description</p>
</div>
```

## Best Practices
1. Always use semantic tokens instead of hardcoded colors
2. Use status colors for their intended purpose (success, warning, error, info)
3. Prefer neutral colors for borders and subtle elements
4. Test color changes in both light and dark modes
5. Maintain sufficient contrast ratios for accessibility