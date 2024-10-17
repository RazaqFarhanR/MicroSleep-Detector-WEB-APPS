/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scale(0.8)', opacity: 0.3 },
          '50%': { transform: 'scale(1.2)', opacity: 1 },
        },
      },
      animation: {
        wave1: 'wave 1s ease-in-out infinite',
        wave2: 'wave 1s ease-in-out 0.2s infinite',
        wave3: 'wave 1s ease-in-out 0.4s infinite',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  }
}