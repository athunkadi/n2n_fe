import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills(),
    react(),
    svgr(),
    tailwindcss(),
    autoprefixer(),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@global': path.resolve(__dirname, 'src/global'),
      crypto: "empty-module",
      assert: "empty-module",
      http: "empty-module",
      https: "empty-module",
      os: "empty-module",
      url: "empty-module",
      zlib: "empty-module",
      stream: "empty-module",
      _stream_duplex: "empty-module",
      _stream_passthrough: "empty-module",
      _stream_readable: "empty-module",
      _stream_writable: "empty-module",
      _stream_transform: "empty-module",
    },
  },
  define: {
    global: "globalThis",
  },
})
