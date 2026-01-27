/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#0F4C81', // Classic Blue - Professional & Trustworthy
        secondary: '#F5A623', // Warm accent
        accent: '#2C3E50',
      }
    },
  },
  plugins: [],
}
