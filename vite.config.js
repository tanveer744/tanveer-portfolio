import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'vendor-react': ['react', 'react-dom'],
          
          // Animation libraries  
          'vendor-animation': ['framer-motion'],
          
          // Icon libraries (large)
          'vendor-icons': ['react-icons/fi', 'react-icons/io5', 'react-icons/si'],
          
          // Large app components
          'app-vscode': ['./src/components/apps/VSCode.jsx'],
          'app-notepad': ['./src/components/apps/Notepad.jsx'],
          
          // UI utilities
          'vendor-utils': ['zustand', 'react-rnd', 'react-markdown', 'date-fns'],
        }
      }
    },
    // Increase chunk size warning limit to 800KB (from default 500KB)
    chunkSizeWarningLimit: 800,
  }
})
