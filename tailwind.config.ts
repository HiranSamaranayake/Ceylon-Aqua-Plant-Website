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
          white: "#FFFFFF",         // Main background
          secondaryBg: "#F7FAF7",   // Secondary background
          primary: "#176B45",       // Primary green
          darkGreen: "#104D35",     // Dark green
          lightGreen: "#E8F3EC",    // Light green
          yellow: "#F2C94C",        // Accent yellow
          darkText: "#202820",      // Dark text
          muted: "#66736A",         // Secondary text
          border: "#E3EAE4",        // Border
          // Aliases for seamless component compatibility
          dark: "#104D35",
          secondary: "#176B45",
          emerald: "#176B45",
          surface: "#104D35",
          gold: "#F2C94C",
          cream: "#F7FAF7",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(23, 107, 69, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 12px 30px -4px rgba(23, 107, 69, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'yellow-glow': '0 0 20px -3px rgba(242, 201, 76, 0.4)',
        'green-glow': '0 0 25px -4px rgba(23, 107, 69, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
