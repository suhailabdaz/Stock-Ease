/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        PlusJakartaSans: ['PlusJakartaSans'],
        PlusJakartaSans1000: ['PlusJakartaSans-1000'],
      },
      boxShadow: {
        custom: '0 4px 6px rgba(0, 0, 0, 0.1)',
        neon: '0 0 50px rgba(255, 105, 180, 0.6), 0 5px 10px rgba(126, 34, 206, 0.3)',
        custom_shadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
      },
    },
  },
  plugins: [],
}

