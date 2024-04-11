import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
  }
})
