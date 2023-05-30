/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px', // Add your custom breakpoint here
      },
    },
  },
  plugins: [],
}