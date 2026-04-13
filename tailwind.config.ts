import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "mcu-red": "#F0131E",
        "nav-bg": "#202020",
        "mcu-bg": "#ededed",
        "mcu-text": "#1a1a1a",
        "hover-bg": "#363636",
        "mcu-border": "#363636",
        "button-bg": "#1a1a1a",
      },
      fontFamily: {
        avengeance: ["Avengeance", "sans-serif"],
        noto: ['"Noto Sans Pahawh Hmong"', "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      screens: {
        xs: "480px",
      },
    },
  },
};

export default config;
