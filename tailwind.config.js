/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff6600",
        secondary: "#005bff",
        background: "#f5f5f5",
        text: "#333333",
      },
    },
  },
  plugins: [],
};
