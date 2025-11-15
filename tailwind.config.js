/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Windows 11 color palette
        'win-accent': {
          DEFAULT: '#0078D4',
          hover: '#106EBE',
          light: '#4CC2FF',
          dark: '#005A9E',
        },
        'win-bg': {
          light: '#F3F3F3',
          dark: '#202020',
        },
        'win-surface': {
          light: '#FFFFFF',
          dark: '#2B2B2B',
        },
        'win-border': {
          light: '#E5E5E5',
          dark: '#3F3F3F',
        },
      },
      backdropBlur: {
        'xs': '2px',
        'win': '40px',
      },
      borderRadius: {
        'win': '8px',
        'win-sm': '4px',
      },
      boxShadow: {
        'win': '0 8px 16px 0 rgba(0, 0, 0, 0.14)',
        'win-sm': '0 4px 8px 0 rgba(0, 0, 0, 0.14)',
      },
    },
  },
  plugins: [],
}
