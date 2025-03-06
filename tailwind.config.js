/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "screen-width": "calc(1920px / 2)",
        "screen-height": "calc(1080px / 2)",
      },
    },
  },
  plugins: [],
};
