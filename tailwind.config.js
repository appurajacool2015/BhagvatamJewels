/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#F7F2E9',
          200: '#EFE8DC',
          300: '#E5DCCE',
          400: '#D5C9B5',
        },
        champagne: {
          50: '#FAF7F2',
          100: '#F3EDE2',
          200: '#E4D7C2',
          300: '#D8C4A3',
          400: '#C2AA83',
        },
        obsidian: {
          950: '#141312',
          900: '#252321',
          800: '#383532',
          700: '#4D4945',
          600: '#68625D',
          500: '#8A837C',
        },
        antiquegold: {
          300: '#C4A16C',
          400: '#B59056',
          500: '#A9824B',
          600: '#8F6C3A',
        },
        gold: {
          100: '#FAF4E1',
          200: '#F4E5BD',
          300: '#E7C875',
          400: '#D4AF37',
          500: '#B8972E',
          600: '#8C7221',
        },
        alabaster: {
          50: '#FCFAF7',
          100: '#F6F2EC',
          200: '#EAE4DA',
          300: '#CCC4B6',
          400: '#A39C8F',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cinzel', 'Georgia', 'serif'],
        display: ['Cinzel', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 35px -5px rgba(212, 175, 55, 0.25)',
        'gold-sm': '0 0 15px -2px rgba(212, 175, 55, 0.2)',
        'vault-card': '0 10px 40px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(212, 175, 55, 0.15)',
        'vault-elevated': '0 20px 60px -15px rgba(0, 0, 0, 0.9), inset 0 1px 1px rgba(244, 229, 189, 0.2)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F4E5BD 0%, #D4AF37 50%, #B8972E 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #D4AF37 0%, #FAF4E1 50%, #D4AF37 100%)',
        'dark-radial': 'radial-gradient(circle at 50% 30%, #1A1C24 0%, #0B0B0E 70%)',
      },
      keyframes: {
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      },
      animation: {
        'shimmer': 'shimmer 4s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
