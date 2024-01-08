/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.{html,js}",
    "./src/**/*.{html,js,ts}"],
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


