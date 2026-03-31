/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#006d47',
        'primary-container': '#dde6e1',
        'primary-dim': '#00603d',
        'on-primary': '#ffffff',
        'secondary': '#4e6456',
        'secondary-container': '#d0e8d7',
        'tertiary': '#2d686b',
        'tertiary-container': '#b0ecef',
        'surface': '#f8f9fa',
        'surface-bright': '#f8f9fa',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f1f4f5',
        'surface-container': '#e8ecee',
        'surface-container-high': '#e5e9eb',
        'on-surface': '#2d3335',
        'on-surface-variant': '#5a6062',
        'outline-variant': '#adb3b5',
        'error': '#a83836',
        'error-container': '#fde8e8',
        'on-error': '#ffffff',
        'warning': '#b45309',
        'warning-container': '#fef3c7',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'ambient': '0px 4px 16px rgba(26, 28, 28, 0.04)',
        'card': 'none',
      },
    },
  },
  plugins: [],
}
