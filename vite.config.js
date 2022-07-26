import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  base: '/configurator-custom/',
  appType: 'custom',
  plugins: [vue()],
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg'],
  esbuild: {
    minify: false,
    minifySyntax: false,
    minifyIdentifiers: false,
    minifyWhitespace: false,
  },
  build: {
    minify: false,
    minifySyntax: false,
    minifyIdentifiers: false,
    minifyWhitespace: false,
  },
})
