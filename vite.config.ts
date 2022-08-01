import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})


export declare function loadEnv(mode: string, envDir: string, prefix?: string): Record<string, string>;
