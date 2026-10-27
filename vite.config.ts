import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  // Percorsi relativi: il sito funziona sia su https://<utente>.github.io/Interactive-Ticket/
  // sia su un dominio personalizzato, senza dover cambiare configurazione.
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
