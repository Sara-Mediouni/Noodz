/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  
  theme: {
    extend: {
      colors: {
        violet900: '#805cfc',
      },
    },
  },
  plugins: [],
}

