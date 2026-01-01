/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Annual Report Colors
        'primary-amber': '#F97316',
        'bg-light': '#FAF6F0',
        'bg-dark': '#334155',
        'bg-top': '#FAF6F0', // Light mode gradient top
        'bg-bottom': '#FEE2D0', // Light mode gradient bottom
        
        // Existing Colors
        'light-bg': '#FAFAFA',
        'light-bg1': '#f8fafc',
        'light-text1': '#333333',
        'light-text2': '#2C3E50',
        'light-text3': '#34495E',
        'light-beige': '#FAFAFA',
        'light-gray': '#F5F5F5',
        'light-warm-white': '#FDFDFD',
        'dark-gray-blue': '#282C34',
        'dark-navy': '#1E293B',
        'dark-warm-gray': '#333333',
        'light-dark-gray': '#333333',
        'light-charcoal': '#2C3E50',
        'light-blue-gray': '#34495E',
        'dark-text-warm-gray': '#E0E0E0',
        'dark-blue-gray': '#CBD5E1',
        'dark-gray-yellow': '#E6E2AF',
        'accent-fresh-blue': '#4FC3F7',
        'accent-fresh-mint': '#4DB6AC',
        'accent-fresh-purple': '#9575CD',
        'accent-natural-brown': '#8D6E63',
        'accent-natural-gray-blue': '#78909C',
        'accent-natural-light-cyan': '#5F9EA0',
      },
      // Custom Utilities
      utilities: {
        '.page-item': {
          '@apply snap-start h-screen w-full flex flex-col justify-center items-center p-6 box-border': {},
        }
      }
    },
  },
  plugins: [],
}
