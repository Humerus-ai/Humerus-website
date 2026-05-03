import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EBF7FD',
          100: '#D2EEFA',
          200: '#A6DCF5',
          300: '#6FC4EC',
          400: '#3FB1E5',
          500: '#1FA8E0',
          600: '#0F8FC6',
          700: '#0B6FA4',
          800: '#0A5680',
          900: '#0A4566',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'card-hover': '0 12px 32px -12px rgba(11, 111, 164, 0.18)',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
