import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts(),
    react(),
    svgr({
      include: '**/*.svg'
    })
  ],
});
