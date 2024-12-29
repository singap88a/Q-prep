/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px", // الشاشات الصغيرة
      md: "768px", // الشاشات المتوسطة
      lg: "1024px", // الشاشات الكبيرة
      xl: "1280px",
    },
    extend: {
      colors: {
        primary: "#4395AD",
        secondary: "#462775",
        hover_secondary: "#33728C",
        bac_bg: "#8349DB0D",
      },
    },
  },
  plugins: [],
};
