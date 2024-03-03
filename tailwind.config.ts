import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
  plugins: [],
  darkMode: "selector"
}
export default config
