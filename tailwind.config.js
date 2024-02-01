/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f3dc0a',
        dark: '#362f34',
        rBlue: '#0abce4',
        rGreen: '#a2cb5d',
        rYellow: '#fed554',
        rRed: '#ee453e',
        pOrange: '#e77f00',
        pBlue: '#0cbbe6',
        pRed: '#f0443e'
      }
    },
    screens: {
      'sm': {'max': '500px'}
    }
  },
  plugins: [],
}
