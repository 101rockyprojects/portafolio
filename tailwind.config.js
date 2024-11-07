/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          readex: ['Readex Pro', 'sans-serif'],
        },
        colors: {
          primary: '#0f172a',
          secondary: '#64748b'
        }
      }
    },
    plugins: [require('@tailwindcss/forms')]
}