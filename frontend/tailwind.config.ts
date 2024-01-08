/** @type {import('tailwindcss').Config} */
export default {
  content: ["./auth/**/*.{html,ts}",
    "./src/**/*.{html,ts}",
    "./index.html",],
    
  theme: {
    extend: {
      fontFamily: {
        sans: ['Custom Font', 'Nunito'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}


