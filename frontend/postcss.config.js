export default {
  plugins: {
    'tailwindcss/nesting': {}, // 1순위: 네스팅 처리
    tailwindcss: {},           // 2순위: 테일윈드 처리
    autoprefixer: {},          // 3순위: 브라우저 호환성
  },
}