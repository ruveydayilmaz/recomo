/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#03a9f4',
          200: '#4ab2f5',
          300: '#6abcf7',
          400: '#84c5f8',
          500: '#9bcefa',
          600: '#b1d8fb',
        },
        dark: {
          100: '#121212',
          200: '#282828',
          300: '#3f3f3f',
          400: '#575757',
          500: '#717171',
          600: '#8b8b8b',
        },
        mixed: {
          100: '#191f25',
          200: '#2e3439',
          300: '#454a4f',
          400: '#5d6166',
          500: '#76797e',
          600: '#8f9396',
        },
      },
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
