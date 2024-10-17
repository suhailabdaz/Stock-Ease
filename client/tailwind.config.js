/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        shopify: ['shopifysans'],
        shopify1000: ['shopifysans-1000'],
        dunk500:['dunk-it-500']
      },
      boxShadow: {
        custom: '0 4px 6px rgba(0, 0, 0, 0.1)',
        neon: '0 0 50px rgba(255, 105, 180, 0.6), 0 5px 10px rgba(126, 34, 206, 0.3)',
        custom_shadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
      },
      colors: {
        endPurple: '#333053', 
        startPurple :'#D3D1ED',
        endgreen : '#233635',
        startGreen: '#D2EAE4',
        darkestPurple : "#1E1E2C",
        darkestGreen : '#223231',
        buttonBootom: "#414141",
        buttonTop: '#3E3E3E',
        headerBlack:'#1A1A1A',
        sidebarWhite:"#EBEBEB",
        fafawhite:"#FAFAFA",
        AABlack:'#1A1A1A',
        grayButtonColour:"#303030",
        greyText:"#171717",
        gradWhite:"#EAE9ED",
        contentWhite:"#F1F1F1",
        secondaryButton:'#E3E3E3'
      },
    },
  },
  plugins: [],
}

