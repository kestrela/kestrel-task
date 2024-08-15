<template>
  <div class="section-container login-container un-select">
    <div class="body fix-width">
      <div class="top">
        <!-- <logo class="logos" /> -->
        <div class="top-title">
          <img :src="logo1"/>
          微芒计划</div>
      </div>
      <div class="sub-title">微芒计划，点亮你的待办清单，简单高效，管理从心开始。</div>
      <div class="main">
        <login-pwd />
      </div>
    </div>
    <!-- 背景 -->
    <LoginBg />
    <Copyright />
  </div>
</template>

<script setup>
import LoginBg from './loginBg.vue'
import Copyright from './components/Copyright.vue'
import Logo from './components/logo.vue'
import LoginPwd from './loginPwd.vue'
import { ref, onBeforeMount, onUnmounted, onMounted } from 'vue'
import { appWindow } from '@tauri-apps/api/window';
const logo1 = new URL(`@/assets/logo2.png`, import.meta.url).href


const isShowWX = ref(true)

const resizeCb = () => {
  isShowWX.value = false
}
onBeforeMount(() => {
  isShowWX.value = false
})

onMounted(async() => {
  window.addEventListener('resize', resizeCb)
  await appWindow.setMaximizable(false);
})

onUnmounted(async() => {
  window.removeEventListener('resize', resizeCb)
})

defineOptions({
  name: 'Login',
})
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  width: 100%;
  min-height: 100vh;
  padding: 20px 0 100px;
  position: relative;
}

.body {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  vertical-align: middle;
  width: 43.3rem;
  background-color: #ffffffed;
  top: 43%;
  right: 8.4%;
  width: 21.4%;
  height: 40.4%;
  min-width: 250px;
  min-height: 280px;
  position: absolute;
  border-radius: 8px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  padding: 3rem;
  z-index: 99;
}

.logos {
  margin: 0 auto 20px;
}

.top-title {
  font-size: 24px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-weight: 400;
  color: #008d8e;
  letter-spacing: 3px;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: 'oldSong';
  display: flex;
  align-items: center;
  img{
    width:20px;
    height:20px;
    margin-right: 6px;
    margin-top:6px;
  }
}

.main {
  margin-top: 20px;

  .foot-link {
    text-align: center;
    margin-top: 1px;

    .link-item {
      margin: 0;
      font-size: 12px;
      line-height: 18px;
      color: #1890ff;
    }
  }
}

.foot-link {
  .el-button {
    font-size: 12px;
  }
}

// 适配移动端
@media screen and (max-width: 768px) {
  .body {
    padding: 0 30px;
    box-shadow: none;
    border: 0;
    background: transparent;
    border-radius: 0;
  }

  .w380 {
    margin: 0 auto;
    width: 100vw;
    min-width: 100vw;
  }
}

.sub-title {
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
  color: #646464;
}
</style>
