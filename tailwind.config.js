/** @type {import('tailwindcss').Config} */
module.exports = {
  // paths to all component files
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    container: {
      center: true
    }
  },
  daisyui: {
    themes: ["halloween", "dracula", "winter"]
  },
  // import daisyui component library
  plugins: [require('daisyui')],
};
