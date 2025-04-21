import { defineConfig } from 'vite'

export default defineConfig({
  // 项目根目录
  root: './',
  // 开发服务器配置
  server: {
    port: 3000,
    open: true
  },
  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})