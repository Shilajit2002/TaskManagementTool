/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px', // example custom breakpoint
        'max-md': {'max': '657px'}, // Custom max-width breakpoint
      },
    },
  },
  plugins: [],
}