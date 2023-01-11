import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    // proxy: {
    //   '/song': {
    //     target: 'https://music-api-two-beta.vercel.app',
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/song/, ''),
    //   },
    // },
  },
})
