/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    'src/components/**/*.{js,ts,jsx,tsx}',
    'src/routes/**/*.{js,ts,jsx,tsx}',
    'src/views/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
    },
  },
  plugins: [],
}
