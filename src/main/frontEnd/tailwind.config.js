/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  
  ],
  theme: {
    extend: {
      backgroundImage: {
        '404': "url('./assets/404/404.jpeg')",
      },
      keyframes: {
        fadeIn: {
          from: { 
            opacity: '0',
            transform: "scale(0.5)" 
          },
          to: { 
            opacity: '1',
            transform: "scale(1.0)" 
          },
        },
        fadeOut: {
          from: {
            opacity: '0',
            transform: 'translateX(-50%)'
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)'
          }
        }
      },
      animation: {
        fadeIn: "fadeIn 400ms ease-in-out",
        fadeOut: "fadeOut 1000ms ease-in-out"
      },
    },
    fontFamily: {
      Cafe24Shiningstar: ["Cafe24Shiningstar"],
    },
  },
  plugins: [],
}