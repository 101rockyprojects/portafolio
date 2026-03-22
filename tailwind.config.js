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
          white: '#D5DAEB',          // Azul grisáceo claro
          gold: '#F0B30F',           // Oro neón
          ocean: '#203F7E',          // Azul medio vibrante

          surface: '#060e20',
          'surface-container-low': '#081329',
          'surface-container': '#0c1934',
          'surface-container-high': '#101e3e',
          'surface-container-lowest': '#000000',
          'surface-variant': '#142449',
          'surface-bright': '#172b54',
          'outline-variant': '#38476d',
          primary: '#FDA059',
          'primary-container': '#EDAD5F',
          secondary: '#ffd16f',
          'on-surface': '#dee5ff',
          'on-surface-variant': '#9baad6',
        }
      }
    }
}
