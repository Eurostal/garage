import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

const fs = require('fs');
const crypto = require('crypto');

const generateHash = () => {
  const hash = crypto.createHash("shake256", { outputLength: 4 }).update(Date.now().toString()).digest('hex');
  return hash;
};

const generateHashFilePlugin = () => ({
  name: 'generate-hash-file',
  writeBundle(){
    const hash = generateHash()
    console.log(hash);
    fs.writeFileSync('dist/assets/hash.env', `HASH=${hash}`);
  },

})

// https://vitejs.dev/config/
export default defineConfig({
  base: '/configurator-custom/',
  plugins: [Vue(),generateHashFilePlugin()],
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp'],
  esbuild: {
    minifySyntax: false,
    minifyIdentifiers: false,
    minifyWhitespace: false,
  },
  build: {
    minify: false,
    rollupOptions:{
      output:{
        entryFileNames: `assets/configurator-engine.js`
      }
    }
  },
})
