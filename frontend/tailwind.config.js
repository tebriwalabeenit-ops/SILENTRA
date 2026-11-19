/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // SILENTRA Approved Exact Palette
        forest: {
          DEFAULT: '#245B45',      // Forest Green
          dark: '#173D30',         // Deep Forest
          light: '#2E7358',
          subtle: '#E8EFEA',
        },
        surface: {
          warm: '#FAFAF7',         // Warm White
          grey: '#F1F3F0',         // Surface Grey
          charcoal: '#252B28',     // Charcoal Text / Accents
          border: '#DDE2DC',       // Border Grey
        },
        status: {
          occupied: '#D95757',     // Occupied (#D95757)
          available: '#39966A',    // Available (#39966A)
          noiseWarning: '#D9A441', // Noise Warning (#D9A441)
          offline: '#929B96',      // Offline (#929B96)
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
