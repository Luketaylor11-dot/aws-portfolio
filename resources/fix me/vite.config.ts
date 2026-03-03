import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

const distPath = 'c:\\Users\\luket\\Herd\\portfolio\\public\\dist'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../../packages/shared'),
    },
  },
  build: {
    outDir: distPath,
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    port: 5173,
  },
})
