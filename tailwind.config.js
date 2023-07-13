/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        authBg: "url('/src/assets/images/MainBg.jpeg')",
      },
      colors: {
        "primary-1": "rgba(41,2,2)",
      },
    },
  },
  plugins: [],
};
