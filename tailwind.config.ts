import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#102D24",          // Primary background
          secondary: "#174C3B",     // Secondary background
          emerald: "#247A63",       // Primary brand green
          surface: "#0B211B",       // Dark surface (sidebar, footer)
          gold: "#E3B341",          // Accent gold/yellow
          cream: "#F5F4ED",         // Main light background
          light: "#FFFFFF",         // Pure white
          muted: "#CBD5CE",         // Secondary text
          border: "#29483C",        // Borders
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(11, 33, 27, 0.08), 0 2px 6px -1px rgba(11, 33, 27, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(16, 45, 36, 0.15), 0 4px 12px -2px rgba(16, 45, 36, 0.08)',
        'gold-glow': '0 0 25px -5px rgba(227, 179, 65, 0.35)',
        'emerald-glow': '0 0 30px -5px rgba(36, 122, 99, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
