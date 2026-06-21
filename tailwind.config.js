/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4fb",
          100: "#d9e7f6",
          200: "#b3cfed",
          300: "#82b0e0",
          400: "#4d8ccf",
          500: "#2c6cb8",
          600: "#1f5499",
          700: "#1c4179",
          800: "#1a3660",
          900: "#152b4d",
        },
        leaf: {
          50: "#eef9ee",
          100: "#d7f0d8",
          200: "#aee0b1",
          300: "#7dca83",
          400: "#52b35a",
          500: "#359b3e",
          600: "#277c30",
          700: "#216128",
          800: "#1d4e23",
          900: "#19421f",
        },
        ink: {
          50: "#f7f8fa",
          100: "#eef0f3",
          200: "#dde1e7",
          300: "#c3cad3",
          400: "#9aa4b2",
          500: "#717d8d",
          600: "#54606f",
          700: "#414a57",
          800: "#2e3540",
          900: "#1c2128",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(16 24 40 / 0.06), 0 1px 3px 0 rgb(16 24 40 / 0.08)",
        cardHover: "0 4px 10px -2px rgb(16 24 40 / 0.10), 0 2px 4px -2px rgb(16 24 40 / 0.06)",
      },
      borderRadius: {
        xl2: "1rem",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.25s ease-out",
      },
    },
  },
  plugins: [],
};
