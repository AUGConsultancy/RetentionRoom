/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          accent: '#0052FF', // Tera Logo wala Tech Blue
          dark: '#0f172a', // Slate-900 (Black ki jagah premium dark gray text)
          light: '#f8fafc', // Slate-50 (Ekdum soft off-white background)
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'], // Elegant Italic font ke liye
      }
    },
  },
  plugins: [],
}