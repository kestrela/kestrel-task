import router from "./router";
const getItem = (key) => {
  const value = localStorage.getItem(key);
  if (!value) return;
  const obj = JSON.parse(value);
  if (obj["expires"] && new Date().getTime() > obj["expires"]) {
    // 如果设置了有效期，且已过期，直接清楚
    localStorage.removeItem(key);
    return;
  }
  // 未设置有效期或设置了有效期但没有过期，直接将存储的数据返回
  return obj.value;
};

function getPageTitle(pageTitle) {
  if (pageTitle) {
    // 如果有传入页面标题，则返回页面标题和默认标题的组合
    return `${pageTitle}-微芒计划`;
  }
  // 如果没有传入页面标题，则返回默认标题
  return `微芒计划`;
}
import NProgress from "@/utils/progress";
const whiteList = ["/login"];
router.beforeEach(async (to, from, next) => {
  const hasToken = !!getItem("itoken");
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  if (hasToken && hasToken !== "undefined") {
    if (to.path === "/login") {
      next('/');
      NProgress.done();
    } else {
      next();
      NProgress.done();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
