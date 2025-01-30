/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        fontFamily: {
          readex: ['Readex Pro', 'sans-serif'],
          'shadow-light': ['Shadows Into Light', 'cursive'],
        },
        colors: {
          white: '#DCDCDC',
          obscure: '#060421',
          elegant: '#13141A',
          flame: '#FF4E02',
          oxide: '#684809',
          caramel: '#FFC038',
          gold: '#FFB005',
          ocean: '#272156',
        }
      }
    },
    plugins: [require('@tailwindcss/forms')]
}