/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    './public/**/*.html',
  ],
  
  theme: {
    extend: {
      fontFamily: {
        'fantasy': ['Fantasy', 'cursive'],
      },
    },
  },
  
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],  
}

