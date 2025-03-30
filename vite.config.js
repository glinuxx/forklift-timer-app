import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  base: '/forklift-timer-app/',  // Adiciona base URL para GitHub Pages
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
  server: {
    host: true, // Aceita conexões de qualquer IP
    port: 5173, // Porta fixa
    strictPort: true, // Não tenta outras portas se 5173 estiver em uso
    watch: {
      usePolling: true // Melhor compatibilidade em alguns sistemas
    }
  }
})
