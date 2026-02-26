/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eliseo: {
          50:  '#F0EFFE',
          100: '#E4E1FD',
          200: '#C9C4FB',
          300: '#A9A0F8',
          400: '#8577F5',
          500: '#5B4CF5',
          600: '#4A3DE3',
          700: '#3B30C5',
          800: '#2E2699',
          900: '#1C176B',
        },
        mint: {
          50:  '#EAFBF5',
          100: '#D0F7E8',
          200: '#A3EED3',
          300: '#6EE2B8',
          400: '#2FD19B',
          500: '#10B981',
          600: '#0D9668',
          700: '#0A7A54',
          800: '#085F41',
          900: '#054330',
        },
        coral: {
          500: '#FF6B57',
        },
        surface: '#FFFFFF',
        background: '#F7F8FF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 24px rgba(91, 76, 245, 0.08)',
        'card-hover': '0 8px 32px rgba(91, 76, 245, 0.16)',
        'float': '0 8px 40px rgba(15, 15, 35, 0.12)',
      },
      backgroundImage: {
        'gradient-eliseo': 'linear-gradient(135deg, #5B4CF5 0%, #4A3DE3 50%, #3B30C5 100%)',
        'gradient-mint': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        'gradient-card': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-gold': 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
        'gradient-platinum': 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)',
        'gradient-black': 'linear-gradient(135deg, #434343 0%, #000000 100%)',
        'gradient-coral': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-teal': 'linear-gradient(135deg, #4ecdc4 0%, #2196f3 100%)',
        'gradient-green': 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
