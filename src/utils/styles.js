// Reusable style constants to reduce duplication and improve maintainability

export const COMMON_STYLES = {
  // Input field styles
  input: {
    base: "w-full bg-slate-600 text-white px-2 py-1 rounded border transition-all text-sm outline-none",
    normal: "border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20",
    error: "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20",
    get default() { return `${this.base} ${this.normal}` },
    get withError() { return `${this.base} ${this.error}` }
  },

  // Button styles
  button: {
    base: "px-3 py-1 rounded transition-colors text-sm font-medium focus:outline-none focus:ring-2",
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-400/20",
    secondary: "bg-slate-600 hover:bg-slate-700 text-white focus:ring-slate-400/20",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-400/20",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-400/20",
    ghost: "bg-transparent hover:bg-slate-700 text-slate-300 focus:ring-slate-400/20",
    get primaryBtn() { return `${this.base} ${this.primary}` },
    get secondaryBtn() { return `${this.base} ${this.secondary}` },
    get successBtn() { return `${this.base} ${this.success}` },
    get dangerBtn() { return `${this.base} ${this.danger}` },
    get ghostBtn() { return `${this.base} ${this.ghost}` }
  },

  // Card/container styles
  card: {
    base: "rounded-lg border",
    primary: "bg-slate-800 border-slate-700",
    secondary: "bg-slate-700 border-slate-600",
    get default() { return `${this.base} ${this.primary}` },
    get nested() { return `${this.base} ${this.secondary}` }
  },

  // Text styles
  text: {
    label: "block text-xs text-slate-400",
    heading: "font-medium text-white",
    subheading: "text-sm font-medium text-slate-300",
    muted: "text-xs text-slate-500",
    error: "text-xs text-red-400",
    success: "text-xs text-green-400"
  },

  // Layout styles
  layout: {
    flexBetween: "flex items-center justify-between",
    flexStart: "flex items-center gap-2",
    flexEnd: "flex items-center gap-2 justify-end",
    grid2: "grid grid-cols-1 sm:grid-cols-2 gap-3",
    spacing: {
      xs: "gap-1",
      sm: "gap-2", 
      md: "gap-3",
      lg: "gap-4"
    }
  },

  // Interactive styles
  interactive: {
    clickable: "cursor-pointer transition-colors",
    focusRing: "focus:outline-none focus:ring-2 focus:ring-blue-400/20 rounded",
    get clickableWithFocus() { return `${this.clickable} ${this.focusRing}` }
  },

  // State styles
  state: {
    loading: "opacity-50 cursor-not-allowed",
    disabled: "opacity-50 cursor-not-allowed",
    hidden: "sr-only"
  }
};

// Helper function to combine styles
export const combineStyles = (...styles) => {
  return styles.filter(Boolean).join(' ');
};

// Utility function for conditional styles
export const conditionalStyle = (condition, trueStyle, falseStyle = '') => {
  return condition ? trueStyle : falseStyle;
};

// Pre-defined common combinations
export const BUTTON_VARIANTS = {
  primary: COMMON_STYLES.button.primaryBtn,
  secondary: COMMON_STYLES.button.secondaryBtn,
  success: COMMON_STYLES.button.successBtn,
  danger: COMMON_STYLES.button.dangerBtn,
  ghost: COMMON_STYLES.button.ghostBtn
};

export const INPUT_VARIANTS = {
  default: COMMON_STYLES.input.default,
  error: COMMON_STYLES.input.withError
};

export const CARD_VARIANTS = {
  primary: `${COMMON_STYLES.card.default} p-4`,
  secondary: `${COMMON_STYLES.card.nested} p-3`,
  compact: `${COMMON_STYLES.card.default} p-2`
};