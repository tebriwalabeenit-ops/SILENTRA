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
        // SILENTRA Approved Brand Palette
        forest: {
          DEFAULT: '#245B45',      // Primary Forest Green
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
        // Semantic Status Colors (Restrained & Enterprise)
        status: {
          available: '#245B45',    // Forest Green
          occupied: '#7E8B85',     // Subdued slate grey / occupied
          offline: '#8C918E',      // Muted neutral
          alert: '#B44335',        // Controlled brick red for noise/critical violations
          warning: '#C48A2C',      // Subdued amber for warning/maintenance
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
