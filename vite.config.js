import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:"https://vitalinski.github.io/React-test-task",
  plugins: [react()]
})
