/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        host: '0.0.0.0',
        cors: true,
    },
    base: './',
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vitest'],
            dts: true, // generate TypeScript declaration
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    test: {
        environment: 'jsdom',
        server: {
            deps: {
                inline: ['element-plus'],
            }
        }
    }
})
