import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        "black":{
          "1":"#101012",
          "2":"#15161a",
          "3":"#1F2026"
        },
        "primary":"#1958F0",
        "widget":{
          "normal":"#25272E",
          "hover":"#2C2D36",
          "active":"#282930"
        },
        "red":{
          "light":"#FF3C3C"
        }
      }
    },
  },
  plugins: [],
}
export default config
