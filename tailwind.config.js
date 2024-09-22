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
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('@tailwindcss/typography'),
  ],
}