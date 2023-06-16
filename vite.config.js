import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
const root = resolve(__dirname, './vue')

// https://vitejs.dev/config/

// build directory is root/public
// assets will be accessible from /vuejs
export default defineConfig({
    root,
    base: '/vuejs/',
    build: {
        outDir: resolve(__dirname, './vue/public')
    },
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('src', import.meta.url))
        }
    }
})