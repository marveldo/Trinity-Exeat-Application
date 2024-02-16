/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
       fontFamily : {
        sans: ['Inter', 'Open Sans', 'Salsa', 'sans-serif'],
       },
       animation :{
        fadein : 'fadein 3s ease-in-out',
        slidein : 'slidein 2s ease-in-out',
        slideout : 'slideout 1s ',
        fastslidein : 'slidein 0.8s '
        },
       keyframes:{
        fadein: {
          '0%': {opacity : 0},
          '100%': {opacity : 1}
        },
        slidein:{
           '0%' : { transform: 'translateX(90%)'},
          '100%': { transform: 'translateX(0)' }
        },
        slideout:{
          '0%' :  {transform : 'translateX(0%)'},
          '100%': {transform : 'translateX(-90%)'}
        }
       },
     
       
    },
    scrollbar: {
     
      track: {
        'mycolor' : 'bg-#83D0FC'
      },
    
      borderRadius: {
        'rounded-full' : 'rounded-full'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

