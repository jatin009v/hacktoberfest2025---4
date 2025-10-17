import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Clean Vite config for production build
export default defineConfig({
  plugins: [react()],
  base: './', // important for relative paths in production
})
