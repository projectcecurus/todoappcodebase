import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af"
        }
      },
      boxShadow: {
        card: "0 18px 45px -24px rgba(15, 23, 42, 0.28)"
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.18) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
