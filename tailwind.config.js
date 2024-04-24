/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      background: '#EADEB9',
      primary: '#FFC13B',
      secondary : '#FF6E40',
      main : '#1E3D59',
      hovers : '#FFAE00',
      dark : '#E5CE9A',
      white : '#FFFFFF',
      cards : '#FFF6F4',
      gray : '#6b7280',
      whiteBg : '#FFF6F4',
      bgYellow : '#FFFAA0',
      overlay : '#030712',
      slate : '#E5E4E2',
      red : '#ff0000',
      secRed : '#ff5252',
      green : 'rgb(34 197 94)',
      secHovers : '#FF8D21'
    },
    extend: {},
  },
  plugins: [],
}

