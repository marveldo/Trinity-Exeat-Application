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
       colors: {
        'custom-rgba': 'rgba(52, 52, 59, 0.7)',
      },
       animation :{
        fadein : 'fadein 0.5s ease-in-out',
        slidein : 'slidein 0.5s ease-in-out',
        slideout : 'slideout 1s ',
        slideoutslower : 'slideout 2s',
        fastslidein : 'slidein 0.8s ',
        upgradedslidein : 'upgradedslidein 1s ease-in-out',
        upgradedslideout : 'upgradedslideout 1s ease-in-out',
        increasewidth : 'increasewidth 1s ease-in-out'
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
        },
        upgradedslideout: {
          '0%' : {transform : 'translateX(0%)'},
          '100%': {transform : 'translateX(-200%)'}
        },
        upgradedslidein : {
          '0%': {transform : 'translateX(100%)'},
          '100%': {transform : 'translateX(0%)'}
        },
        increasewidth :{
          '0%' : {width : '0%'},
          '100%': {width : '100%'}
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

