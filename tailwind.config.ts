import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'sky-blue': '#3498DB',
        'emerald-green': '#2ECC71',
        'lemon-yellow': '#F1C40F',
        'cloud-gray': '#ECF0F1',
        'graphite-gray': '#34495E',
      },
    },
  },
  plugins: [],
}
export default config