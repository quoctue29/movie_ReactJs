/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "481px",
      },
      height: {
        128: "32rem",
        184: "46rem",
        240: "60rem",
      },
      width: {
        128: "32rem",
        184: "46rem",
        240: "60rem",
      },
    },
  },
  plugins: [],
};
