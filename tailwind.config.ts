import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors:{
        "modal":{
          "1":"rgb(var(--color-bg-1) / <alpha-value>)",
          "2":"rgb(var(--color-bg-2) / <alpha-value>)",
          "3":"rgb(var(--color-bg-3) / <alpha-value>)"
        },
        "primary":"rgb(var(--color-primary) / <alpha-value>)",
        "widget":{
          "normal":"rgb(var(--color-widget-normal) / <alpha-value>)",
          "hover":"rgb(var(--color-widget-hover) / <alpha-value>)",
          "active":"rgb(var(--color-widget-active) / <alpha-value>)",
          "disabled":"rgb(var(--color-widget-disabled) / <alpha-value>)",
        },
        "danger":"rgb(var(--color-danger) / <alpha-value>)",
        "body": "rgb(var(--color-text) / <alpha-value>)",
        "card":{
          "normal":"rgb(var(--color-card) / <alpha-value>)",
          "hover":"rgb(var(--color-card-hover) / <alpha-value>)",
          "active":"rgb(var(--color-card-active) / <alpha-value>)",
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config