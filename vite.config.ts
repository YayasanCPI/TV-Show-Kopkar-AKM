import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';

import legacy from '@vitejs/plugin-legacy';

export default defineConfig(() => {
  return {
    base: './',
    build: {
      target: ['es2015'],
    },
    plugins: [
      react(), 
      legacy({
        targets: ['defaults', 'Android >= 4.4', 'Chrome >= 49', 'Safari >= 9', 'iOS >= 9'],
        polyfills: true,
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
