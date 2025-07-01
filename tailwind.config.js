/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B4FE9',
        'primary-hover': '#4A3FD6',
        secondary: '#8B7FFF',
        accent: '#FF6B8A',
        'accent-hover': '#FF4775',
        surface: '#FFFFFF',
        background: '#F7F6FE',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        'priority-high': '#EF4444',
        'priority-medium': '#F59E0B',
        'priority-low': '#10B981',
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-success': 'pulseSuccess 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSuccess: {
          '0%': { transform: 'scale(1)', backgroundColor: '#10B981' },
          '50%': { transform: 'scale(1.1)', backgroundColor: '#34D399' },
          '100%': { transform: 'scale(1)', backgroundColor: '#10B981' },
        },
      },
    },
  },
  plugins: [],
}