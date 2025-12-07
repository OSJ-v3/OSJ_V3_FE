import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: [
                "favicon.ico",
                "apple-touch-icon.png",
                "icon-192.png",
                "icon-512.png",
                "splash-2048x2732.png",
                "splash-1668x2224.png",
                "splash-1536x2048.png",
                "splash-1242x2688.png",
                "splash-1125x2436.png",
                "splash-750x1334.png",
                "splash-640x1136.png",
                "splash-828x1792.png",
                "splash-1242x2208.png",
            ],
            manifest: {
                name: "OSJ",
                short_name: "OSJ",
                theme_color: "#000000",
                background_color: "#ffffff",
                display: "standalone",
                icons: [
                    {
                        src: "icon-192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "icon-512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                ],
            },
        }),
    ],
})
