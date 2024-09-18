import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "element-plus/theme-chalk/index.css";
import Components from '@/components/components.js'
import './permission'
const app = createApp(App);
const initApp = async () => {
  app.use(router);
  app.use(Components);
  app.mount("#app");
};
initApp();
