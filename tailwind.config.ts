import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        slate: {
          100: 'rgb(237, 238, 240)',
          150: 'rgba(174, 183, 194, 0.12)',
          200: 'rgb(220, 225, 230)',
        },
        sky: {
          600: 'rgb(68, 123, 186)',
          700: '#4177b5',
          800: '#3f72b0',
        },
        blue: {
          50: 'rgba(235, 242, 250, 0.99)',
          100: 'rgba(223, 234, 246, 0.99)',
          200: 'rgba(213, 226, 241, 0.99)',
        },
        green: {
          500: 'rgb(75, 179, 75)',
          600: '#48ac4a',
          700: '#45a64a',
        }
      }
    },

    container: {
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1100px',
      },
    },

  },
  plugins: [],
};
export default config;
