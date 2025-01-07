/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
      backgroundColor: {
        light: {
          primary: '#ffffff',
          secondary: '#f3f4f6',
          accent: '#e5e7eb',
        },
        dark: {
          primary: '#111827',
          secondary: '#1f2937',
          accent: '#374151',
        },
      },
      textColor: {
        light: {
          primary: '#111827',
          secondary: '#4b5563',
          accent: '#6b7280',
        },
        dark: {
          primary: '#f9fafb',
          secondary: '#e5e7eb',
          accent: '#d1d5db',
        },
      },
      borderColor: {
        light: {
          primary: '#e5e7eb',
          secondary: '#f3f4f6',
        },
        dark: {
          primary: '#374151',
          secondary: '#1f2937',
        },
      },
    },
  },
  plugins: [],
}


