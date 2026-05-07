/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ember: {
          50:  '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',  // True orange — primary brand (30%)
          600: '#EA580C',  // Hover
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        coal: {
          DEFAULT: '#111111',
          50:  '#2D2D2D',
          100: '#1C1C1C',
          200: '#141414',
        },
        cream: {
          DEFAULT: '#FFFFFF',  // 60% white background
          light: '#FFFFFF',
          dark:  '#F9F9F9',
          deep:  '#F3F3F3',
        },
        citron: '#16A34A',   // Deep green — 10% accent
        ash:    '#6B7280',
        muted:  '#9CA3AF',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'Arial Narrow', 'sans-serif'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow':    'spin 40s linear infinite',
        'spin-reverse': 'spinReverse 60s linear infinite',
        'pulse-ember':  'pulseEmber 3s ease-in-out infinite',
        'float':        'float 8s ease-in-out infinite',
        'pulse-slow':   'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        spinReverse: {
          from: { transform: 'rotate(360deg)' },
          to:   { transform: 'rotate(0deg)' },
        },
        pulseEmber: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':      { opacity: '0.7', transform: 'scale(1.06)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
