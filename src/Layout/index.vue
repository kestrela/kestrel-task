<template>
  <el-container class="page">
    <!-- <Navbar/> -->
    <el-container class="page-one">
      <el-aside width="56px" class="aside">
        <el-popover trigger="click" placement="right" :width="120">
          <template #reference>
            <div class="logo-box">
              <img v-if="imageUrl" class="logo-img" :src="imageUrl" alt="" />
              <svg v-else class="logo-img logo-img1" viewBox="0,0,257,344" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                  <clipPath id="user-clip1">
                    <rect x="382" y="195" width="257" height="344"></rect>
                  </clipPath>
                  <linearGradient x1="351.462" y1="233.56" x2="669.496" y2="500.422" gradientUnits="userSpaceOnUse"
                    spreadMethod="reflect" id="user-fill3">
                    <stop offset="0" stop-color="#A964C8"></stop>
                    <stop offset="0.35" stop-color="#A964C8"></stop>
                    <stop offset="0.87" stop-color="#2D8AD5"></stop>
                    <stop offset="1" stop-color="#2D8AD5"></stop>
                  </linearGradient>
                  <linearGradient x1="351.462" y1="233.56" x2="669.496" y2="500.422" gradientUnits="userSpaceOnUse"
                    spreadMethod="reflect" id="user-fill4">
                    <stop offset="0" stop-color="#A964C8"></stop>
                    <stop offset="0.35" stop-color="#A964C8"></stop>
                    <stop offset="0.87" stop-color="#2D8AD5"></stop>
                    <stop offset="1" stop-color="#2D8AD5"></stop>
                  </linearGradient>
                </defs>
                <g clip-path="url(#user-clip1)" transform="translate(-382 -195)">
                  <path
                    d="M637.755 433.872C642.215 515.221 579.577 537.983 508.011 537.983 436.444 537.983 376.676 507.833 383.513 437.11 383.109 425.234 389.59 414.133 398.634 409.891 413.82 402.768 444.753 402.936 507.484 402.997 570.214 403.058 609.164 402.279 621.521 407.947 633.878 413.614 638.011 424.609 637.755 433.872Z"
                    fill="url(#user-fill3)" fill-rule="evenodd"></path>
                  <path
                    d="M422 285C422 235.847 461.623 196 510.5 196 559.377 196 599 235.847 599 285 599 334.153 559.377 374 510.5 374 461.623 374 422 334.153 422 285Z"
                    fill="url(#user-fill4)" fill-rule="evenodd"></path>
                </g>
              </svg>
            </div>
          </template>
          <div class="page-menu">
            <span @click="baseClick"> 基本信息 </span>
            <!-- <span @click="circlefClick"> 头像效果 </span> -->
            <span @click="setConfClick"> 设置 </span>
            <span @click="setClick"> 外观 </span>
            <span @click="logout">退出登录 </span>
          </div>
        </el-popover>
        <Aside />

        <div class="question" @click="questionClick">
          <el-popover trigger="click" placement="right" :width="120">
            <template #reference>
              <div class="logo-box1">
                <svg t="1703176378014" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="9196" width="200" height="200">
                  <path d="M0 0h1024v1024H0z" fill="#D8D8D8" fill-opacity="0" p-id="9197"></path>
                  <path
                    d="M512 0a512 512 0 1 1 0 1024A512 512 0 0 1 512 0z m67.456 703.872H448.832V832h130.624v-128.128z m-66.24-492.8c-30.464 0-58.048 5.12-82.752 15.36a183.68 183.68 0 0 0-63.232 42.88A195.392 195.392 0 0 0 326.4 334.208c-9.728 24.96-14.848 52.48-15.36 82.368h122.24c0-14.976 1.664-28.992 4.992-41.984a101.12 101.12 0 0 1 15.36-34.112c7.04-9.728 15.872-17.472 26.688-23.296 10.816-5.824 23.68-8.768 38.656-8.768 22.208 0 39.552 6.08 52.032 18.304 12.48 12.16 18.688 31.04 18.688 56.576 0.576 14.976-2.048 27.52-7.872 37.44-5.824 9.984-13.44 19.2-22.912 27.52-9.408 8.32-19.648 16.64-30.72 24.96-11.136 8.32-21.696 18.112-31.68 29.44a171.904 171.904 0 0 0-26.24 41.216c-7.424 16.064-12.032 36.032-13.696 59.904v37.44H568.96v-31.616c2.24-16.64 7.68-30.528 16.256-41.6 8.576-11.072 18.432-20.928 29.504-29.504 11.136-8.64 22.912-17.216 35.392-25.792a162.048 162.048 0 0 0 59.904-75.264c6.912-17.28 10.368-39.168 10.368-65.792a149.312 149.312 0 0 0-44.928-104c-16.064-16.064-37.248-29.504-63.616-40.32-26.368-10.88-59.2-16.256-98.56-16.256z"
                    fill="#f8ab06" p-id="9198"></path>
                </svg>
              </div>
            </template>
            <div class="page-menu">
              <span @click="qsClick"> 建议 </span>
              <span @click="vsClick">检查更新</span>
              <span @click="planClick">开发计划</span>
              <span @click="authorClick" class="wx">
                <svg t="1719035172637" class="icon icon-wx" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="12037" width="200" height="200">
                  <path
                    d="M683.058 364.695c11 0 22 1.016 32.943 1.976C686.564 230.064 538.896 128 370.681 128c-188.104 0.66-342.237 127.793-342.237 289.226 0 93.068 51.379 169.827 136.725 229.256L130.72 748.43l119.796-59.368c42.918 8.395 77.37 16.79 119.742 16.79 11 0 21.46-0.48 31.914-1.442a259.168 259.168 0 0 1-10.455-71.358c0.485-148.002 128.744-268.297 291.403-268.297l-0.06-0.06z m-184.113-91.992c25.99 0 42.913 16.79 42.913 42.575 0 25.188-16.923 42.579-42.913 42.579-25.45 0-51.38-16.85-51.38-42.58 0-25.784 25.93-42.574 51.38-42.574z m-239.544 85.154c-25.384 0-51.374-16.85-51.374-42.58 0-25.784 25.99-42.574 51.374-42.574 25.45 0 42.918 16.79 42.918 42.575 0 25.188-16.924 42.579-42.918 42.579z m736.155 271.655c0-135.647-136.725-246.527-290.983-246.527-162.655 0-290.918 110.88-290.918 246.527 0 136.128 128.263 246.587 290.918 246.587 33.972 0 68.423-8.395 102.818-16.85l93.809 50.973-25.93-84.677c68.907-51.93 120.286-119.815 120.286-196.033z m-385.275-42.58c-16.923 0-34.452-16.79-34.452-34.179 0-16.79 17.529-34.18 34.452-34.18 25.99 0 42.918 16.85 42.918 34.18 0 17.39-16.928 34.18-42.918 34.18z m188.165 0c-16.984 0-33.972-16.79-33.972-34.179 0-16.79 16.927-34.18 33.972-34.18 25.93 0 42.913 16.85 42.913 34.18 0 17.39-16.983 34.18-42.913 34.18z"
                    fill="#09BB07" p-id="12038"></path>
                </svg>加入交流群</span>
              <span @click="navTo" class="v2"><svg t="1718670641563" class="icon icon-v2" viewBox="0 0 1024 1024"
                  version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11206" width="200" height="200">
                  <path
                    d="M268.73344 94.63808h486.81472a97.21344 97.21344 0 0 1 78.75072 40.22272l166.60992 230.22592c28.00128 38.6816 23.74656 91.97568-10.03008 125.72672l-410.25536 410.08128c-37.89824 37.888-99.31776 37.95456-137.29792 0.14336L33.28 492.89728C-0.5376 459.24352-4.92032 406.016 22.92736 367.27808l166.88128-232.17664a97.19808 97.19808 0 0 1 78.9248-40.46336z"
                    fill="#FFB800" p-id="11207"></path>
                  <path
                    d="M855.08608 165.15072l-19.712-28.46208c-18.16064-26.14272-46.99136-41.61536-78.83264-41.61536H266.54208c-31.95392 0-61.23008 18.59072-79.39072 44.89728L17.43872 375.37792C1.16736 399.42656 1.536 434.06336 13.056 462.43328c6.31808 15.54944 16.48128 27.24864 27.91936 38.86592l362.43456 359.15264 451.67616-695.30112z"
                    fill="#F9C85D" p-id="11208"></path>
                  <path
                    d="M322.26816 266.62912h50.64704l43.51488 265.82528 111.81056-265.51808h103.39328L467.75296 656.128h-31.09376l-73.53856 0.0512-54.63552-333.89568H253.6192v-55.6544h68.64896zM595.68128 487.07072v-51.0208a397.11232 397.11232 0 0 0 65.60256-37.90336h52.48v258.02752h-56.85248V453.54496c-18.47808 13.62432-38.8864 24.7808-61.23008 33.52576z"
                    fill="#FFFFFF" p-id="11209"></path>
                </svg>待办管理系统</span>
            </div>
          </el-popover>
        </div>
      </el-aside>
      <div class="Main">
        <Main />
      </div>
    </el-container>

    <Theme v-model="isSettings" dialogTitle="主题设置" />

    <Settings v-model="isConfigures" dialogTitle="系统设置" />

    <UserInfo v-model="isBaseVisible" @upUser="getUserAvater" />

    <Suggestion v-model="issgVisible" />

    <Versions v-model="isVersionVisible" />

    <Plan v-model="isPlanVisible" />

    <WeiXin v-model="isAuthorVisible" />

    <!-- <Message v-model="isMesVisible"/> -->

    <Circle v-model="isCircleVisible" />
  </el-container>
</template>
<script setup>
import WeiXin from './Main/WeiXin'
import Navbar from "./Header/Navbar";
import Circle from "./Main/Circle";
import Message from "./Main/Message";
import Plan from "./Main/Plan";
import Versions from "./Main/Versions";
import Suggestion from "./Main/Suggestion";
import UserInfo from "./Main/UserInfo.vue";
import Header from "./Header/index.vue";
import Aside from "./Aside/index.vue";
import Main from "./Main/index.vue";
import Theme from "./Main/Theme.vue";
import Settings from "./Main/Settings.vue";
import { onMounted, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { getUser } from '@/api/index.js'
const total = ref(0);
let versions = ref("3.1.0");
const router = useRouter();
const logout = async () => {
  localStorage.clear("itoken");
  router.push("/login");
  window.location.reload();
  ElMessage.success("注销成功");
};
let isMesVisible = ref(true);
let issgVisible = ref(false);
const qsClick = () => {
  issgVisible.value = true;
};
let isPlanVisible = ref(false);
const planClick = () => {
  isPlanVisible.value = true;
};

const isCircleVisible = ref(false);
const circlefClick = () => {
  isCircleVisible.value = true;
};

const isVersionVisible = ref(false);
const vsClick = () => {
  isVersionVisible.value = true;
};

const isAuthorVisible = ref(false);
const authorClick = () => {
  isAuthorVisible.value = true;
}

//头像
const imageUrl = ref("");
const getUserAvater = () => {
  let userInfo = localStorage.getItem("userInfo");

  if (userInfo) {
    userInfo = JSON.parse(userInfo);
  }
  if (userInfo.value) {
    let users = JSON.parse(userInfo.value);
    imageUrl.value = users.avater;
  }
};

onMounted(async () => {
  await getUserAvater()
});

const state = reactive({
  isSettings: false,
  isConfigures: false,
  isBaseVisible: false,
});
const setClick = () => {
  state.isSettings = true;
};

const setConfClick = () => {
  state.isConfigures = true;
};

const questionClick = () => { };

const baseClick = () => {
  state.isBaseVisible = true;
};

const navTo = () => {
  window.open("https://v1.kestrel-task.cn", "_blank");
};

const { isSettings, isConfigures, isBaseVisible } = toRefs(state);
</script>

<style scoped lang="scss">
.total {
  margin-left: 10px;
}

.page {
  background-color: #eaeaea !important;
  background: #ffffff no-repeat fixed center !important;
  background-size: cover;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  background-color: unset;
  border-radius: 5px;
}

.aside {
  background-color: #eaeaea !important;
  background: #f8f8f8 no-repeat fixed center !important;
  background-size: cover;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  background-color: unset;
  z-index: 999;
}

.logo-img {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  cursor: pointer;
  background-color: #1111110f;
  border-radius: 50%;
  object-fit: cover;

  &:hover {
    transform: rotate(666turn);
    transition-delay: 1s;
    transition-property: all;
    transition-duration: 59s;
    transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
  }
}

.logo-img1 {
  padding: 8px;
  width: 32px;
  height: 32px;
}

.logo-box {
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
  position: relative;
}

.page-menu {
  span {
    display: block;
    width: 100%;
    line-height: 32px;
    height: 32px;
    cursor: pointer;
    padding-left: 5px;
    border-radius: 5px;

    &:hover {
      background: #d6e1f9;
    }
  }
}

.question {
  position: absolute;
  bottom: 14px;
  left: 5px;
  width: 50px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 2px 2px;
  border-radius: 5px;
  transition: all 0.4s;

  svg {
    height: 26px;
    width: 26px;
  }

  &:hover {
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
    color: #4c5353;
  }
}

.logos {
  position: absolute;
  top: 15px;
  height: 162px !important;
  width: 162px !important;
  transition: 0.5s all;
  z-index: 2;

  &:hover {
    z-index: 0;
  }
}

.icon-v2 {
  height: 20px;
  width: 20px;
  margin-right: 4px;
}

.v2 {
  display: flex !important;
  align-items: center;
  color: #f8ab06;
}

.icon-wx {
  height: 16px;
  width: 16px;
  margin-right: 4px;
}

.wx {
  display: flex !important;
  align-items: center;
  color: #0abb07ca;
}
</style>
