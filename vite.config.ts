import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, 'src') },
        { find: '~', replacement: resolve(__dirname, 'node_modules') },
      ],
    },
    plugins: [
      react(),
      viteMockServe({
        mockPath: 'src/_mock_',
        localEnabled: command === 'serve',
        prodEnabled: false,
        supportTs: true,
        watchFiles: true,
      }),
    ],
  }
})
