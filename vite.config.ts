import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  esbuild: false,
  optimizeDeps: {
    exclude: ['@swc/core'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
      },
    },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: false,
    reportCompressedSize: false,
  },
  plugins: [
    react(),
    svgr({ svgrOptions: { icon: true } }),
    {
      name: 'swc',
      async transform(code, id) {
        if (!/\.(jsx?|tsx?)$/.test(id) || /node_modules/.test(id)) return;

        const swc = await import('@swc/core');
        const result = await swc.transform(code, {
          filename: id,
          sourceMaps: true,
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
            target: 'es2022',
            minify: {
              compress: false,
              mangle: false,
            },
          },
          module: {
            type: 'es6',
          },
          isModule: true,
          minify: false,
        });

        return result;
      },
      enforce: 'pre',
    },
  ],
});
