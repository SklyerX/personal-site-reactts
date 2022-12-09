/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        av: { max: "920px" },
        md: { max: "767px" },
        sm: { max: "639px" },
        xsm: { max: "487px" },
        "2xs": { max: "364px" },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
