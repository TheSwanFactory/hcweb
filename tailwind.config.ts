import type { Config } from "tailwindcss";
import postcss from "@tailwindcss/postcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  plugins: [
    postcss
  ]
} satisfies Config;
