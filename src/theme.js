// Central design tokens for the whole app. Keeping these in one place means
// every tool tile and screen stays visually consistent as the toolkit grows.

export const colors = {
  bg: '#0B1220', // deep navy app background
  surface: '#141E33', // raised cards
  surfaceAlt: '#1C2942',
  border: '#26334D',
  text: '#F4F7FF',
  textDim: '#B4BFD6', // brighter for legibility
  textFaint: '#8A95AE', // brighter for legibility (elderly-friendly contrast)
  accent: '#5B8CFF', // primary action blue
  accentSoft: '#1E2C4D',
  success: '#3DD68C',
  warning: '#F6C453',
  danger: '#FF6B6B',
  white: '#FFFFFF',
};

// A palette of tile accent colors so each tool gets its own identity.
export const tileColors = {
  blue: '#5B8CFF',
  green: '#3DD68C',
  amber: '#F6C453',
  pink: '#FF7AA2',
  purple: '#A98CFF',
  teal: '#43C6DB',
  orange: '#FF9F5B',
  slate: '#7C8AA8',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  pill: 999,
};

// Sizes nudged up for readability (the app should be comfortable for older eyes).
export const font = {
  h1: 32,
  h2: 23,
  h3: 19,
  body: 17,
  small: 14,
  tiny: 12,
};
