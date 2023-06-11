/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        spin: "spin 3s infinite linear",
      },
      keyframes: {
        spin: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(90deg)",
            borderColor: "#fde047",
          },
          "100%": {
            transform: "rotate(180deg)",
            borderColor: "#facc15",
          },
        },
      },
    },
  },
  plugins: [],
};
