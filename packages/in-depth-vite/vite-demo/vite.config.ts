import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'
import stylelint from 'vite-plugin-stylelint';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import viteImagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    stylelint({
      // exclude: '/node_modules/'
    }),
    svgr(),
    viteImagemin({
      optipng: {
        optimizationLevel: 7
      }
    }),
  ],
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]"
    },
    // 进行 PostCSS 配置
    // postcss: {
    //   plugins: [
    //     postcssPresetEnv()
    //   ]
    // }
  },
  resolve: {
    alias: {
      '@assets': path.join(__dirname,'src/assets'),
      '@': path.join(__dirname,'src')
    },
  },
})
