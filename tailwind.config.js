/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sf': ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      colors: {
        // Apple iOS color palette
        'ios-blue': '#007AFF',
        'ios-green': '#34C759',
        'ios-orange': '#FF9500',
        'ios-red': '#FF3B30',
        'ios-purple': '#AF52DE',
        'ios-pink': '#FF2D92',
        'ios-teal': '#5AC8FA',
        'ios-yellow': '#FFCC00',
        'ios-gray': '#8E8E93',
        'ios-gray-2': '#AEAEB2',
        'ios-gray-3': '#C7C7CC',
        'ios-gray-4': '#D1D1D6',
        'ios-gray-5': '#E5E5EA',
        'ios-gray-6': '#F2F2F7',
        // Semantic colors
        'label-primary': '#000000',
        'label-secondary': '#3C3C43',
        'label-tertiary': '#3C3C43',
        'label-quaternary': '#3C3C43',
        'fill-primary': '#787880',
        'fill-secondary': '#787880',
        'fill-tertiary': '#767680',
        'fill-quaternary': '#747480',
        'background-primary': '#FFFFFF',
        'background-secondary': '#F2F2F7',
        'background-tertiary': '#FFFFFF',
        'grouped-background-primary': '#F2F2F7',
        'grouped-background-secondary': '#FFFFFF',
        'grouped-background-tertiary': '#F2F2F7',
        'separator-opaque': '#C6C6C8',
        'separator-non-opaque': '#3C3C43',
        'link': '#007AFF',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
          '40%, 43%': { transform: 'translate3d(0, -8px, 0)' },
          '70%': { transform: 'translate3d(0, -4px, 0)' },
          '90%': { transform: 'translate3d(0, -2px, 0)' },
        },
      },
      boxShadow: {
        'apple': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'apple-lg': '0 8px 40px rgba(0, 0, 0, 0.12)',
        'apple-glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'apple': '16px',
        'apple-lg': '20px',
        'apple-xl': '24px',
      },
    },
  },
  plugins: [
    // Add custom utilities
    function({ addUtilities }) {
      addUtilities({
        '.glass-morphism': {
          'background': 'rgba(255, 255, 255, 0.8)',
          'backdrop-filter': 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-morphism-dark': {
          'background': 'rgba(0, 0, 0, 0.3)',
          'backdrop-filter': 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
      })
    }
  ],
}