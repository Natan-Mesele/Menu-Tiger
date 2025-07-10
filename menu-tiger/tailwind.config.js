/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // enable dark mode via class
  theme: {
    extend: {
      colors: {
        primary: "#14b8a6",
        secondary: "#0d9488",
        danger: "#ef4444",
        muted: "#6b7280",
        third: "#364152",
        fourth: "#2ca58d",
        fifth: "#e6f4f1",
      },
    },
  },
  plugins: [],
};
