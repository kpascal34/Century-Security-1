/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'century-blue': '#1E3A8A',
        'century-gold': '#B7791F',
        'century-gold-dark': '#975A16',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 