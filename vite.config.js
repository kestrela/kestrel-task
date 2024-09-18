import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

function resolve(dir) {
  return path.join(__dirname, dir);
}
// https://vitejs.dev/config/
export default defineConfig(async () => ({
  envPrefix: ["VITE_", "TAURI_"],
  clearScreen: false,
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  base: "./", //
  resolve: {
    alias: {
      "@": resolve("src"),
    },
    extensions: [".js", ".json", ".vue"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/index.scss";`,
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 1420,
    https: false,
    open: true,
    proxy: {
      "^/api": {
        target: "https://kestrel-task.cn", // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    path: "./",
    sourcemap: false,
    brotliSize: false,
    chunkSizeWarningLimit: 2500,

    // minify: 'terser',
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //     drop_debugger: true
    //   }
    // },

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split("/")
            : [];
          const fileName =
            facadeModuleId[facadeModuleId.length - 2] || "[name]";
          return `js/${fileName}/[name].[hash].js`;
        },
      },
    },
  },
}));
