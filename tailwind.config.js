/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        formal: ["Italianno", "serif"]
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}