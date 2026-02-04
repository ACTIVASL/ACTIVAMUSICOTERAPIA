// vite.config.ts
import { defineConfig } from "file:///C:/Users/Usuario/.gemini/antigravity/scratch/monorepo-crm-activa/node_modules/.pnpm/vite@5.4.21_@types+node@25.0.10/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Usuario/.gemini/antigravity/scratch/monorepo-crm-activa/node_modules/.pnpm/@vitejs+plugin-react@4.7.0_vite@5.4.21/node_modules/@vitejs/plugin-react/dist/index.js";
import { VitePWA } from "file:///C:/Users/Usuario/.gemini/antigravity/scratch/monorepo-crm-activa/node_modules/.pnpm/vite-plugin-pwa@0.19.8_vite@5.4.21_workbox-build@7.4.0_workbox-window@7.4.0/node_modules/vite-plugin-pwa/dist/index.js";
import path from "path";
import { fileURLToPath } from "url";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Usuario/.gemini/antigravity/scratch/monorepo-crm-activa/apps/crm-client/vite.config.ts";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = path.dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Activa CRM",
        short_name: "Activa",
        description: "Sovereign Clinical Operating System",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    dedupe: ["react", "react-dom", "@tanstack/react-query", "react-router-dom"]
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@tanstack/react-query"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc3VhcmlvXFxcXC5nZW1pbmlcXFxcYW50aWdyYXZpdHlcXFxcc2NyYXRjaFxcXFxtb25vcmVwby1jcm0tYWN0aXZhXFxcXGFwcHNcXFxcY3JtLWNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVXN1YXJpb1xcXFwuZ2VtaW5pXFxcXGFudGlncmF2aXR5XFxcXHNjcmF0Y2hcXFxcbW9ub3JlcG8tY3JtLWFjdGl2YVxcXFxhcHBzXFxcXGNybS1jbGllbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1VzdWFyaW8vLmdlbWluaS9hbnRpZ3Jhdml0eS9zY3JhdGNoL21vbm9yZXBvLWNybS1hY3RpdmEvYXBwcy9jcm0tY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xyXG5cclxuLy8gRVNNIFNoaW0gZm9yIF9fZGlybmFtZVxyXG5jb25zdCBfX2ZpbGVuYW1lID0gZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpO1xyXG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoX19maWxlbmFtZSk7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHJlYWN0KCksXHJcbiAgICAgICAgVml0ZVBXQSh7XHJcbiAgICAgICAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxyXG4gICAgICAgICAgICBpbmNsdWRlQXNzZXRzOiBbJ2Zhdmljb24uaWNvJywgJ2FwcGxlLXRvdWNoLWljb24ucG5nJywgJ21hc2tlZC1pY29uLnN2ZyddLFxyXG4gICAgICAgICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ0FjdGl2YSBDUk0nLFxyXG4gICAgICAgICAgICAgICAgc2hvcnRfbmFtZTogJ0FjdGl2YScsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NvdmVyZWlnbiBDbGluaWNhbCBPcGVyYXRpbmcgU3lzdGVtJyxcclxuICAgICAgICAgICAgICAgIHRoZW1lX2NvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgICAgICAgICAgICBpY29uczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiAncHdhLTE5MngxOTIucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiAncHdhLTUxMng1MTIucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgICBhbGlhczoge1xyXG4gICAgICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVkdXBlOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdAdGFuc3RhY2svcmVhY3QtcXVlcnknLCAncmVhY3Qtcm91dGVyLWRvbSddXHJcbiAgICB9LFxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgICAgaW5jbHVkZTogWydyZWFjdCcsICdyZWFjdC1kb20nLCAnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5J11cclxuICAgIH1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHFCQUFxQjtBQUwyUCxJQUFNLDJDQUEyQztBQVExVSxJQUFNLGFBQWEsY0FBYyx3Q0FBZTtBQUNoRCxJQUFNLFlBQVksS0FBSyxRQUFRLFVBQVU7QUFHekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ0osY0FBYztBQUFBLE1BQ2QsZUFBZSxDQUFDLGVBQWUsd0JBQXdCLGlCQUFpQjtBQUFBLE1BQ3hFLFVBQVU7QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLE9BQU87QUFBQSxVQUNIO0FBQUEsWUFDSSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDVjtBQUFBLFVBQ0E7QUFBQSxZQUNJLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNWO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxJQUNKLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLEtBQUssUUFBUSxXQUFXLE9BQU87QUFBQSxJQUN4QztBQUFBLElBQ0EsUUFBUSxDQUFDLFNBQVMsYUFBYSx5QkFBeUIsa0JBQWtCO0FBQUEsRUFDOUU7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNWLFNBQVMsQ0FBQyxTQUFTLGFBQWEsdUJBQXVCO0FBQUEsRUFDM0Q7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
