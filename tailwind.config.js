/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        md: "32px",
        xl: "64px",
      },
    },
    extend: {
      colors: {
        dark: "#1a1a1a",
        "dark-light": "#333",
        "dark-soft": "#444444",
        "dark-medium": "#2c2c2c",
        white: "#fff",
        "white-soft": "#f8f9fa",
        "white-muted": "#dee2e6",
        "white-off": "#ddd",
        blue: "#0d6efd",
        "blue-light": "#0b5ed7",
        "blue-soft": "#e7f1ff",
        "blue-muted": "#b6d4fe",
        red: "#dc3545",
        "red-dark": "#bb2d3b",
      },
    },
  },
  plugins: [],
};
