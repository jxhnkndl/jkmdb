/** @type {import('tailwindcss').Config} */
module.exports = {
  // paths to all component files
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    container: {
      center: true
    },
    extend: {
      minHeight: {
        '300': '300px',
        '350': '350px',
        '400': '400px'
      }
    }
  },
  daisyui: {
    themes: ["halloween", "dracula", "winter"]
  },
  // import daisyui component library
  plugins: [require('daisyui')],
};
