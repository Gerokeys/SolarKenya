/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ember: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',  // Warm amber — primary brand
          600: '#D97706',  // Hover
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        coal: {
          DEFAULT: '#111111',
          50:  '#2D2D2D',
          100: '#1C1C1C',
          200: '#141414',
        },
        cream: {
          DEFAULT: '#F8F8F6',
          light: '#FFFFFF',
          dark:  '#EDEDE9',
          deep:  '#DEDEDA',
        },
        citron: '#22C55E',   // Clean forest green — secondary accent
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
