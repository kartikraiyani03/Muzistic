/** @type {import('tailwindcss').Config} */
export default {
  content: [                        
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors : {
        red : 'rgb(172, 3, 3)',
        gray : 'rgb(158, 157, 157)',
      },
      backgroundImage : {
        'radial-gradient': 'radial-gradient(circle, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}

