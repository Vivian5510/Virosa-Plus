import Tov from './presets'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
	plugins: [Tov(), vueJsx()],
	server: {
		port: 5174,
		proxy: {
			'/api': {
				target: 'http://localhost:9090',
				changeOrigin: true,
				// 不重写路径，保留/api前缀
			},
			'/nodes': {
				target: 'http://localhost:9090/api',
				changeOrigin: true,
				// 将/nodes路径转发到后端的/api/nodes
			},
			'/articles': {
				target: 'http://localhost:9090/api',
				changeOrigin: true,
				// 将/articles路径转发到后端的/api/articles
			},
		},
	},
})
