/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './formkit/formkit.config.ts',
    './resources/**/*.{edge,js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require('@formkit/themes/tailwindcss'),
    require('daisyui'),
  ],
  darkMode: 'class',
  daisyui: {
    themes: ['light', 'bumblebee', 'corporate', 'dark', 'dracula', 'valentine'],
    darkTheme: 'dark', // name of one of the included themes for dark mode
    // base: true, // applies background color and foreground color for root element by default
    // styled: true, // include daisyUI colors and design decisions for all components
  },
}
