import vue from '@vitejs/plugin-vue'
import path from 'path'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/assets/scss/global.scss";`
      }
    }
  },
  server: {
    host: '0.0.0.0',
    hmr: {
      port: 443,
    }
  }
}
