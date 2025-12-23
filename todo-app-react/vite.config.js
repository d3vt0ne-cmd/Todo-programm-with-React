import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Это заставляет Vite слушать на всех интерфейсах (0.0.0.0), включая IPv4 и IPv6
    port: 5173, // Можно указать любой порт, если хочешь
  },
});