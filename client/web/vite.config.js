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
      "@react-native-community/blur": path.resolve(__dirname, "./mocks/react-native-community-blur.jsx"),
      "react-native-exception-handler": path.resolve(__dirname, "./mocks/native-stubs.js"),
      "react-native-app-auth": path.resolve(__dirname, "./mocks/native-stubs.js"),
      "react-native-ui-lib": path.resolve(__dirname, "./mocks/react-native-ui-lib.jsx"),
      "react-native-safe-area-context": path.resolve(__dirname, "./mocks/safe-area-context.jsx"),
      "react-native-screens": path.resolve(__dirname, "./mocks/screens.jsx"),
      "react-native-vector-icons/MaterialCommunityIcons": path.resolve(__dirname, "./mocks/react-native-vector-icons.jsx"),
      "react-native-vector-icons/MaterialIcons": path.resolve(__dirname, "./mocks/react-native-vector-icons.jsx"),
      "react-native-vector-icons/Feather": path.resolve(__dirname, "./mocks/react-native-vector-icons.jsx"),
      "react-native-vector-icons/Ionicons": path.resolve(__dirname, "./mocks/react-native-vector-icons.jsx"),
      "react-native-vector-icons": path.resolve(__dirname, "./mocks/react-native-vector-icons.jsx"),
      "../components/engagement/components/mockup/original-6b0784cb19d1d688a7a939d8d3dd637f.jpg": path.resolve(__dirname, "./mocks/dummy-badge.js"),
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
