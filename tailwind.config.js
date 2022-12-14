/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@derpyvision/react-speech-synth/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        akzidenz: ['akzidenz']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}