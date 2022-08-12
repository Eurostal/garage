import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  base: '/configurator-custom/',
  plugins: [Vue()],
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg'],
  esbuild: {
    minifySyntax: false,
    minifyIdentifiers: false,
    minifyWhitespace: false,
  },
  build: {
    minify: false,
  },
})
