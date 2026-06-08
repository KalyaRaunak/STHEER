import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  build: {
    // Target modern browsers only (UK B2B audience — no IE needed)
    target: 'es2020',

    // Warn if any chunk exceeds 500kb
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom')) {
              return 'react-router';
            }
            if (id.includes('react-dom') || id.includes('react')) {
              return 'react-core';
            }
            if (id.includes('framer-motion') || id.includes('motion')) {
              return 'framer';
            }
            if (id.includes('@studio-freight/lenis') || id.includes('lenis')) {
              return 'lenis';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
          }
        }
      }
    },

    // Minification using Terser to clean up production logs
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,      // Remove all console.log in production
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.debug', 'console.warn']
      }
    }
  },

  // Dev server optimisations
  server: {
    hmr: { overlay: true }
  },

  // Pre-bundle dependencies for faster dev start
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@studio-freight/lenis',
      'lucide-react'
    ]
  }
})
