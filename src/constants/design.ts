// Design System Constants
// All design-related magic numbers and values should be defined here

// Breakpoints (Tailwind defaults)
export const BREAKPOINTS = {
  SM: 'sm', // 640px
  MD: 'md', // 768px
  LG: 'lg', // 1024px
  XL: 'xl', // 1280px
  '2XL': '2xl', // 1536px
} as const;

// Spacing Scale (Tailwind spacing units)
export const SPACING = {
  XS: '1', // 0.25rem / 4px
  SM: '2', // 0.5rem / 8px
  MD: '4', // 1rem / 16px
  LG: '6', // 1.5rem / 24px
  XL: '8', // 2rem / 32px
  '2XL': '12', // 3rem / 48px
  '3XL': '16', // 4rem / 64px
} as const;

// Icon Sizes
export const ICON_SIZES = {
  XS: '3', // 12px
  SM: '4', // 16px
  MD: '5', // 20px
  LG: '6', // 24px
  XL: '8', // 32px
  '2XL': '12', // 48px
} as const;

// Border Radius
export const BORDER_RADIUS = {
  SM: 'rounded-sm', // 2px
  DEFAULT: 'rounded-md', // 6px
  LG: 'rounded-lg', // 8px
  XL: 'rounded-xl', // 12px
  '2XL': 'rounded-2xl', // 16px
  FULL: 'rounded-full',
} as const;

// Animation Durations
export const ANIMATION = {
  FAST: 'duration-150',
  DEFAULT: 'duration-200',
  SLOW: 'duration-300',
  SLOWER: 'duration-500',
} as const;

// Transition Classes
export const TRANSITIONS = {
  DEFAULT: 'transition-all',
  COLORS: 'transition-colors',
  SHADOW: 'transition-shadow',
  TRANSFORM: 'transition-transform',
  OPACITY: 'transition-opacity',
} as const;

// Sizes for common elements
export const SIZES = {
  TOUCH_TARGET: '44px', // Minimum touch target size for mobile
  BUTTON_HEIGHT: {
    SM: 'h-8',
    DEFAULT: 'h-10',
    LG: 'h-11',
  },
  INPUT_HEIGHT: 'h-10',
  MODAL_WIDTH: {
    SM: 'max-w-sm',
    MD: 'max-w-md',
    LG: 'max-w-lg',
    XL: 'max-w-xl',
    '2XL': 'max-w-2xl',
    '4XL': 'max-w-4xl',
    '7XL': 'max-w-7xl',
  },
  CONTAINER_WIDTH: {
    SM: 'max-w-sm',
    MD: 'max-w-md',
    LG: 'max-w-lg',
    XL: 'max-w-xl',
    '2XL': 'max-w-2xl',
    '4XL': 'max-w-4xl',
    '6XL': 'max-w-6xl',
    FULL: 'max-w-full',
  },
  MIN_WIDTH: {
    DROPDOWN: 'min-w-[8rem]',
    TOUCH: 'min-w-[44px]',
    BUTTON: 'min-w-[100px]',
  },
} as const;

// Z-Index Layers
export const Z_INDEX = {
  DROPDOWN: 'z-50',
  MODAL: 'z-50',
  OVERLAY: 'z-40',
  STICKY: 'z-30',
  FIXED: 'z-20',
  BASE: 'z-10',
} as const;

// Shadow Levels
export const SHADOWS = {
  SM: 'shadow-sm',
  DEFAULT: 'shadow',
  MD: 'shadow-md',
  LG: 'shadow-lg',
  XL: 'shadow-xl',
  NONE: 'shadow-none',
} as const;

// Opacity Levels
export const OPACITY = {
  DISABLED: 'opacity-50',
  MUTED: 'opacity-75',
  HOVER: 'opacity-80',
  FULL: 'opacity-100',
  OVERLAY: 'opacity-80',
} as const;

// Typography Sizes
export const TEXT_SIZES = {
  XS: 'text-xs', // 12px
  SM: 'text-sm', // 14px
  BASE: 'text-base', // 16px
  LG: 'text-lg', // 18px
  XL: 'text-xl', // 20px
  '2XL': 'text-2xl', // 24px
  '3XL': 'text-3xl', // 30px
} as const;

// Grid Columns
export const GRID_COLS = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
} as const;

// Responsive Grid Patterns
export const RESPONSIVE_GRID = {
  CARDS_2_4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  CARDS_1_2_3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  CARDS_1_2: 'grid-cols-1 md:grid-cols-2',
  STATS_4: 'grid-cols-1 md:grid-cols-4',
  LAYOUT_MAIN: 'grid-cols-1 lg:grid-cols-3',
} as const;

// Common Layout Patterns
export const LAYOUT = {
  FLEX_CENTER: 'flex items-center justify-center',
  FLEX_BETWEEN: 'flex items-center justify-between',
  FLEX_COL_CENTER: 'flex flex-col items-center justify-center',
  FLEX_RESPONSIVE: 'flex flex-col md:flex-row',
  SPACE_Y_DEFAULT: 'space-y-4',
  SPACE_Y_LG: 'space-y-6',
  GAP_DEFAULT: 'gap-4',
  GAP_LG: 'gap-6',
} as const;

// Animation Classes
export const ANIMATIONS = {
  FADE_IN: 'animate-fade-in',
  SPIN: 'animate-spin',
  PULSE: 'animate-pulse',
  BOUNCE: 'animate-bounce',
  ACCORDION_DOWN: 'animate-accordion-down',
  ACCORDION_UP: 'animate-accordion-up',
} as const;

// Common Class Combinations
export const COMPONENTS = {
  CARD_HOVER: `${TRANSITIONS.SHADOW} ${ANIMATION.DEFAULT} hover:shadow-lg`,
  BUTTON_TRANSITION: `${TRANSITIONS.COLORS} ${ANIMATION.FAST}`,
  INPUT_FOCUS: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  MODAL_OVERLAY: `fixed inset-0 ${Z_INDEX.MODAL} bg-black/80`,
  TOUCH_TARGET: `min-h-[${SIZES.TOUCH_TARGET}] min-w-[${SIZES.TOUCH_TARGET}]`,
} as const;

// Device-specific constants
export const MOBILE = {
  SAFE_AREA_TOP: 'safe-area-top',
  SAFE_AREA_BOTTOM: 'safe-area-bottom',
  MIN_TOUCH_TARGET: '44px',
  VIEWPORT_HEIGHT: 'h-[90vh]',
} as const;

// Sidebar specific constants (if any remain)
export const SIDEBAR = {
  WIDTH_DESKTOP: 'w-64',
  WIDTH_MOBILE: 'w-full',
  KEYBOARD_SHORTCUT: 'SIDEBAR_KEYBOARD_SHORTCUT',
} as const;