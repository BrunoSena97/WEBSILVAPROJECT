/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sapshell: "#354a60",
        red: "#d73027",
        orange: "#fc8d59",
        yellow: "#F6BE00",
        green: "#91cf60",
        greener: "#1a9850",
      },
    },

    screens: {
      sm: "375px",
      // => @media (min-width: 640px) { ... }

      md: "1280px",
      // => @media (min-width: 1280px) { ... }

      lg: "1920px",
      // => @media (min-width: 1920px) { ... }
    },
  },

  plugins: [],
};
