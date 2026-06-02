import tailwindcss from '@tailwindcss/vite';
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
      cssMinify: 'lightningcss',
      target: ['es2015'],
    },
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist('defaults, Android >= 4.4, Chrome >= 49, Safari >= 9, iOS >= 9'))
      }
    },
    plugins: [
      react(), 
      tailwindcss(),
      legacy({
        targets: ['defaults', 'Android >= 4.4', 'Chrome >= 49', 'Safari >= 9', 'iOS >= 9'],
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
