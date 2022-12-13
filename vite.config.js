import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // 代理服务器，解决浏览器跨域问题
    proxy: {
      "/api": {
        // 后端服务器API访问地址
        target: "http://127.0.0.1:8080/",
        // 请求host是否改变端口，默认true
        changeOrigin: true,
        // 是否支持websocket，，默认true
        ws: true,
        // 重写请求URL，去除'/api'
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
})
