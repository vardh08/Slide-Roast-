/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0B0D14',
          secondary: '#111522',
          card: '#171C2C',
          cardHover: '#1E2538',
        },
        roast: {
          purple: '#8B5CF6',
          orange: '#F97316',
          cyan: '#06B6D4',
          green: '#22C55E',
          red: '#EF4444',
          text: '#F8FAFC',
          muted: '#94A3B8',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(139, 92, 246, 0.4)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(249, 115, 22, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
