import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@app": path.resolve(__dirname, "./src/app"),
            "@common": path.resolve(__dirname, "./src/common"),
            "@interfaces": path.resolve(__dirname, "./src/interfaces"),
            "@theme": path.resolve(__dirname, "./src/theme"),
            "@features": path.resolve(__dirname, "./src/features"),
        }
    },
    server: {
        host: "0.0.0.0",
        port: 5173,
        proxy: {
            /*"/api/bsm": {
                target: "http://127.0.0.1:8081",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/bsm/, ""),
            },*/
            "/api": {
                target: "http://192.168.165.34:8080",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    }
});
