/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
      },
      backgroundColor: {
        "memoir-light": "rgb(245,241,237)",
        "memoir-dark": "rgb(80,78,77)",
        "memoir-darker": "rgb(58,57,56)",
      },
      borderColor: {
        "memoir-b-dark": "rgb(70,64,61)",
      },
      colors: {
        "memoir-light": "rgb(245,241,237)",
        "memoir-dark": "rgb(70,64,61)",
      },
    },
  },
  plugins: [],
};
