import { type Config } from "tailwindcss";

export default {
  darkMode: ["class", ".dark"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;