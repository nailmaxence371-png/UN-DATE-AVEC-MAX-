/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF6F0',
        blush: '#F6E4E4',
        rose: '#E8B4B8',
        'rose-deep': '#C88B90',
        gold: '#C9A15A',
        'gold-soft': '#E4C77E',
        ink: '#4A3B3D',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(200, 139, 144, 0.35)',
        card: '0 8px 30px rgba(74, 59, 61, 0.08)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(4deg)' },
        },
        drift: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(-120vh)', opacity: '0' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 8s linear infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
}
