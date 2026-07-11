import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,

  plugins: [
    react(),
  ],

  resolve: {
    alias: {
      "react-native$": "react-native-web",
      "react-native": "react-native-web",
      "@": path.resolve(__dirname, "../src"),
      "@react-native-community/blur": path.resolve(__dirname, "./components/blur.tsx"),
      "react-native-exception-handler": path.resolve(__dirname, "./components/native-stubs.tsx"),
      "react-native-app-auth": path.resolve(__dirname, "./components/native-stubs.tsx"),
      "react-native-ui-lib": path.resolve(__dirname, "./components/ui-lib.tsx"),
      "react-native-safe-area-context": path.resolve(__dirname, "./components/safe-area-context.tsx"),
      "react-native-screens": path.resolve(__dirname, "./components/screens.tsx"),
      "react-native-vector-icons/MaterialCommunityIcons": path.resolve(__dirname, "./components/icons.tsx"),
      "react-native-vector-icons/MaterialIcons": path.resolve(__dirname, "./components/icons.tsx"),
      "react-native-vector-icons/Feather": path.resolve(__dirname, "./components/icons.tsx"),
      "react-native-vector-icons/Ionicons": path.resolve(__dirname, "./components/icons.tsx"),
      "react-native-vector-icons": path.resolve(__dirname, "./components/icons.tsx"),
    },

    extensions: [
      ".web.tsx",
      ".web.ts",
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".json",
    ],
  },

  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },

  optimizeDeps: {
    include: [
      "react-native-web",
    ],
  },

  define: {
    __DEV__: true,
    global: "globalThis",
    "process.env": {},
  },
});
