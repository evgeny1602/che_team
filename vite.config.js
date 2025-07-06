import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/che_team/api': {
        target: 'https://tvsboy.com',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => {
        //   return path.replace(/\/kucoin_api_base_url/, '')
        // },
      },
    },
  },
})
