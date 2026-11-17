import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        brand: {
          white: "#FFFFFF",             // Main background
          lightGray: "#F8FAFC",         // Light gray background
          secondaryBg: "#F8FAFC",       // Secondary background
          sectionBg: "#EFF6FF",         // Light section background
          lightGreenBg: "#F0FDF4",      // Alternative section background
          darkGreen: "#0B7A0B",         // Primary brand colour
          green: "#34C759",             // Secondary brand colour
          lightGreen: "#A6E22E",        // Accent colour
          oceanBlue: "#0E7CDB",         // Primary blue
          skyBlue: "#4FC3F7",           // Blue accent
          yellow: "#F7C600",            // Buttons and highlights
          yellowHover: "#E5B700",       // Primary button hover
          navy: "#0A2D5B",              // Main text (Navy Blue)
          darkText: "#0A2D5B",          // Main text
          secondaryText: "#6B7280",     // Secondary text
          muted: "#6B7280",             // Secondary text
          border: "#E5E7EB",            // Borders and dividers
          // Aliases for seamless component compatibility
          primary: "#0B7A0B",
          dark: "#0B7A0B",
          secondary: "#34C759",
          emerald: "#0B7A0B",
          surface: "#0B7A0B",
          gold: "#F7C600",
          cream: "#F8FAFC",
        },
      },
      backgroundImage: {
        'gradient-green': 'linear-gradient(to right, #0B7A0B, #A6E22E)',
        'gradient-blue': 'linear-gradient(to right, #0E7CDB, #4FC3F7)',
      },
      fontFamily: {
        poppins: ["Poppins", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(11, 122, 11, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 12px 30px -4px rgba(11, 122, 11, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'yellow-glow': '0 0 20px -3px rgba(247, 198, 0, 0.4)',
        'green-glow': '0 0 25px -4px rgba(11, 122, 11, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
