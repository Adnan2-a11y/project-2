/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <-- এটি যোগ করো
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./App.jsx",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}
