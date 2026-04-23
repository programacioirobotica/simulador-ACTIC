import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#f3f4f6",
          panel: "#ffffff",
          border: "#d1d5db",
          accent: "#ea580c",
          dark: "#1f2937"
        }
      },
      fontFamily: {
        sans: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;

