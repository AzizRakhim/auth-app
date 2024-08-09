/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        orange: "#ff6c00",
        gray: "#f5f5f5",
      },
    },
  },
  plugins: [],
};
