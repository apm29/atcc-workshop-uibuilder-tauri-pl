import path from "path";
import { defineConfig, loadEnv } from "vite";
import vitePluginVue from "@vitejs/plugin-vue2";
import AutoImport from "unplugin-auto-import/vite";
import UnoCSS from 'unocss/vite'
import { splitVendorChunkPlugin } from "vite";
import requireContext from "rollup-plugin-require-context"; // 处理兼容webpack工具require-context;
import Pages from 'vite-plugin-pages'
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  //环境变量
  const env = loadEnv(mode, process.cwd());
  console.log(env);
  return {
    base: "./",
    resolve: {
      // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
      alias: [
        {
          find: "~/",
          replacement: `${path.resolve(__dirname, "src")}/`,
        },
      ],
    },
    plugins: [
      requireContext(),
      vitePluginVue(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ["vue", "vue/macros", "@vueuse/core"],
        dts: true,
        dirs: ["./src/composables","./src/store"],
        vueTemplate: true,
      }),
      // Components({
      //   resolvers: [ElementUiResolver()]
      // }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      UnoCSS(),
      // legacy({
      //   targets: ["defaults", "not ie < 9"],
      // }),
      splitVendorChunkPlugin(),
      Pages({}),
      createHtmlPlugin({
        inject: {
          data: {
            VITE_APP_NODERED_HOST:env.VITE_APP_NODERED_HOST,
            VITE_APP_NODERED_UIBUILDER_NAMESPACE:env.VITE_APP_NODERED_UIBUILDER_NAMESPACE,
            mode,
          },
        },
      }),
    ],
    server: {
      port: 7146,
      proxy: {
        "/api": {
          // target: "http://atcc-workshoptest.ciih.net",
          target: "http://192.168.1.125:8000",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        //测试时的socket.io代理到本地的NodeRed服务器
        "/uibuilder/vendor/socket.io/" : {
          target: "http://192.168.1.125:1880",
          changeOrigin: true
        }
      },
    },
  }
});
