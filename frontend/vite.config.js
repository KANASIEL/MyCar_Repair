// frontend/vite.config.js  ← 이 파일을 아래 내용으로 완전히 교체하세요
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,                    // 기존 포트 그대로
    proxy: {
      '/api': {
        target: 'http://localhost:8484',   // ← 스프링부트 서버 주소
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')  // 필요시 추가
      }
    }
  }
})
