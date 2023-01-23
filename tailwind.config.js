/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sapshell: "#354a60"
      }
    },
  },
  screens: {
    sm: "375px",
    // => @media (min-width: 640px) { ... }

    md: "1080px",
    // => @media (min-width: 768px) { ... }

    lg: "1920px",
    // => @media (min-width: 1024px) { ... }
  },

  plugins: [],
};
