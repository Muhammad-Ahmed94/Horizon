/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        color_head: "#254336",
        color_main: "#6B8A7A",
        color_main2: "#B7B597",
        color_foot: "#DAD3BE",
      },
    },
  },
  plugins: [],
};
