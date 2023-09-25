import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/punch/',
  plugins: [vue()],
  // server: {
  //   port: 5173, // 配置端口号
  // },
})
