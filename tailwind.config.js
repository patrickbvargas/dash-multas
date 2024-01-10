/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        layout: "auto 1fr",
      },
      gridTemplateRows: {
        layout: "auto 1fr",
      },
      colors: {
        accent: "#ffdd21",
        white: "#ffffff",
        black: {
          50: "#dcdcdc",
          100: "#b7b7b7",
          200: "#888888",
          300: "#656565",
          400: "#4d4d4d",
          500: "#383838",
          600: "#2f2f2f",
          700: "#272727",
          800: "#232323",
          900: "#1e1e1e",
          950: "#121212",
        },
        administrativo: {
          dark: "#4075bf",
          light: "#528ee0",
        },
        judicial: {
          dark: "#6c46b8",
          light: "#9167e4",
        },
        juridico: {
          dark: "#c5397f",
          light: "#e05299",
        },
        liberado: {
          dark: "#227762",
          light: "#009973",
        },
        autosuspensiva: {
          dark: "#c63939",
          light: "#d74242",
        },
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
