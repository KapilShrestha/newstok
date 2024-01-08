import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    base: 'newstok/frontend/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'auth/login.html'),
        signup: resolve(__dirname, 'auth/signup.html'),
        admin: resolve(__dirname, 'auth/admin.html'),
      },
    },
  },
});