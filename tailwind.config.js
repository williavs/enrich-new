/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          50: '#EEF2FF',
          // ... (keep other shades as they were)
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}