import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import registerDirective from "@/directive";
import Components from '@/components/components.js'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './permission'
const app = createApp(App);
const initApp = async () => {
  app.use(ElementPlus,{
    locale: zhCn,
  });
  app.use(router);
  app.use(Components);
  app.use(registerDirective);
  app.mount("#app");
};
initApp();
