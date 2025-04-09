import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
// {
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
//   define: {
//     __APP_ENV__: 
//   }
// }
// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: {
      __APP_ENV__: env.APP_ENV,
    }
  }
})
