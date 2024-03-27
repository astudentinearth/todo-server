import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    test:{
        environment: "jsdom",
        setupFiles: "./src/tests/setup.ts",
        globals: true
    },
    plugins: [react()],
    resolve:{
        alias:{
            '@': path.resolve(__dirname, './src')
        }
    }
})