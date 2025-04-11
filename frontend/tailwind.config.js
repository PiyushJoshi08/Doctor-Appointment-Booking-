/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#5f6FFF" /*set up primary color */
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill,minmax(200px,1fr))' /*custom tailwind prop */
      }
    },
  },
  plugins: [],
}