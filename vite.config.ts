import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",

            workbox: {
                cleanupOutdatedCaches: true,
                navigateFallback: "/index.html",
            },

            includeAssets: [
                "icons/favicon.ico",
                "icons/icon-192.png",
                "icons/icon-512.png",
                "splash/apple-touch-icon.png",
            ],

            manifest: {
                name: "OSJ",
                short_name: "OSJ",
                theme_color: "#000000",
                background_color: "#ffffff",
                display: "standalone",
                icons: [
                    {
                        src: "icons/icon-192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "icons/icon-512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
        }),
    ],
})
