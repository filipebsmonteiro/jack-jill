/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'resources/**/*.{edge,js,ts,vue,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  darkMode: 'class',
  // daisyUI config (optional)
  daisyui: {
    themes: ['cupcake', 'dark'],
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
  },
}

