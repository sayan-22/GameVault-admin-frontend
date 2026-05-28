export const COLORS = {
  bg: {
    base: "#121212",
    nav: "#181818",
    card: "#1F1F1F",
    elevated: "#1E1E1E",
  },
  text: {
    primary: "#ECECEC",
    secondary: "#B8C1CC",
    muted: "#8B949E",
  },
  accent: {
    cyan: "#00D9FF",
    soft: "#4C807E",
    glow: "#21C7E5",
    border: "#214A52",
  },
  success: { base: "#00C16A", light: "#36E28A" },
  danger: { base: "#FF5A5F", soft: "#B23A48" },
  border: { card: "#2A2A2A", soft: "#2F2F2F" },
} as const;

export const RADII = {
  sm: "6px",
  md: "10px",
  lg: "14px",
  xl: "20px",
  xxl: "28px",
} as const;
