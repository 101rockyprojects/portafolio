import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? './' : '/',
  plugins: [svelte()],
  resolve: {
    alias: {
      '@App': resolve(__dirname, './src'),
      '@Shared': resolve(__dirname, './src/Shared'),
    },
  },
}))
