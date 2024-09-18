<template>
  <Dialog v-model="visible" @closed="closed" height="200px" width="300px">
    <div class="page-row">
      <el-upload
        ref="uploadRef"
        accept="image/*"
        :http-request="httpRequest"
        class="avatar-uploader"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <svg
          v-else
          class="avatar"
          viewBox="0,0,257,344"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <clipPath id="user-clip1">
              <rect x="382" y="195" width="257" height="344"></rect>
            </clipPath>
            <linearGradient
              x1="351.462"
              y1="233.56"
              x2="669.496"
              y2="500.422"
              gradientUnits="userSpaceOnUse"
              spreadMethod="reflect"
              id="user-fill3"
            >
              <stop offset="0" stop-color="#A964C8"></stop>
              <stop offset="0.35" stop-color="#A964C8"></stop>
              <stop offset="0.87" stop-color="#2D8AD5"></stop>
              <stop offset="1" stop-color="#2D8AD5"></stop>
            </linearGradient>
            <linearGradient
              x1="351.462"
              y1="233.56"
              x2="669.496"
              y2="500.422"
              gradientUnits="userSpaceOnUse"
              spreadMethod="reflect"
              id="user-fill4"
            >
              <stop offset="0" stop-color="#A964C8"></stop>
              <stop offset="0.35" stop-color="#A964C8"></stop>
              <stop offset="0.87" stop-color="#2D8AD5"></stop>
              <stop offset="1" stop-color="#2D8AD5"></stop>
            </linearGradient>
          </defs>
          <g clip-path="url(#user-clip1)" transform="translate(-382 -195)">
            <path
              d="M637.755 433.872C642.215 515.221 579.577 537.983 508.011 537.983 436.444 537.983 376.676 507.833 383.513 437.11 383.109 425.234 389.59 414.133 398.634 409.891 413.82 402.768 444.753 402.936 507.484 402.997 570.214 403.058 609.164 402.279 621.521 407.947 633.878 413.614 638.011 424.609 637.755 433.872Z"
              fill="url(#user-fill3)"
              fill-rule="evenodd"
            ></path>
            <path
              d="M422 285C422 235.847 461.623 196 510.5 196 559.377 196 599 235.847 599 285 599 334.153 559.377 374 510.5 374 461.623 374 422 334.153 422 285Z"
              fill="url(#user-fill4)"
              fill-rule="evenodd"
            ></path>
          </g>
        </svg>
      </el-upload>
    </div>
    <!-- <el-input class="names" v-model="userName" placeholder="姓名" /> -->
    <el-col :span="24" class="n-col n-footer">
      <el-button type="primary" style="width: 140px" @click="saveUserInfo"
        >修改</el-button
      >
    </el-col>
  </Dialog>
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue";
import { onMounted, reactive, ref, nextTick, computed } from "vue";
import { getVersion } from "@tauri-apps/api/app";
import { ElMessage } from "element-plus";
import { updateUser, getUser } from "@/api/index.js";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "设置头像",
  },
});
const haveFile = ref(null);
const visible = computed(() => props.modelValue);
const emit = defineEmits(["update:modelValue", "upUser"]);
const closed = () => {
  haveFile.value = null;
  emit("update:modelValue", false);
};
const fileName = ref("");
const userName = ref("微芒计划");
const imageUrl = ref("");

const getUserInfoId = () => {
  let userInfo = localStorage.getItem("userInfo");
  let id = "";
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
  }
  if (userInfo.value) {
    return JSON.parse(userInfo.value);
  }
  return {};
};
const setItem = (key, value, expires = 2592000000) => {
  let count = new Date().getTime() + expires;
  const obj = {
    value, // 需要缓存的数据
    expires: count, // 缓存有效期，毫秒为单位
  };
  localStorage.setItem(key, JSON.stringify(obj));
};

const updateImgUrl = (userInfo) => {
  setItem("userInfo", JSON.stringify(userInfo));
};

const updateUserInfo = (params1) => {
  params1.avater = imageUrl.value;
  params1.name = params1.userName;
  params1.type = "1";
  updateUser(params1).then((res) => {
    ElMessage.success("更新成功");
    updateImgUrl(params1);
    closed();
    let timer = setTimeout(() => {
      emit("upUser");
      clearTimeout(timer);
    }, 500);
  });
};

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

const uploadRef = ref(null);
const saveUserInfo = () => {
  let params1 = getUserInfoId();
  params1.name = userName.value;
  // updateUserInfo(params1);
};

const httpRequest = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const name = new Date().getTime();
  const params = {
    name,
    file: file.file,
  };
};

const handleAvatarSuccess = async (file) => {
  haveFile.value = file;
  // imageUrl.value = URL.createObjectURL(file);
  const reader = new FileReader();
  reader.onload = (e) => {
    const base64 = e.target.result;
    let params = {}
    params.avater = base64;
    params.name = "";
    params.type = "1";
    ElMessage.success("更新成功");
    updateImgUrl(params);
    closed();
    let timer = setTimeout(() => {
      emit("upUser");
      clearTimeout(timer);
    }, 500);
  };
  reader.readAsDataURL(file.raw);
};

const beforeAvatarUpload = (rawFile) => {
  fileName.value = rawFile.name;
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("文件大小超过2MB限制!");
    return false;
  }
  return true;
};

const appVersion = ref("0.0.0");
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
  await getUserAvater();
  appVersion.value = await getVersion();
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 45vh;
  overflow-y: auto;
  flex-wrap: wrap;
  overflow-x: hidden;

  .cards {
    width: 100%;
    height: 60px;
    border: 1px dotted transparent;
    box-shadow: 1px 1px 1px #bbb;
    border-radius: 5px;
    margin: 8px 0;
    cursor: pointer;

    .item {
      display: flex;
      align-items: center;
    }
  }

  .blocks {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    display: inline-block;
  }
}

.page-row {
  width: 100%;
  display: flex;
  justify-content: center;

  :deep(.el-avatar) {
    cursor: pointer;
  }
}

.page-col1 {
  width: 120px;
  padding-left: 8px;
  border-right: 1px solid #eeeeee65;
  padding-right: 8px;
}

.page-col2 {
  width: calc(100% - 120px);
  height: 100%;
  flex: 1;
  padding: 6px 10px;
}

.page-item {
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  line-height: 40px;
  color: #313d44;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 5px;
  padding-left: 18px;
  transition: 0.4s all;
  position: relative;
  font-weight: 408;
  overflow: hidden;

  &:hover {
    background: #e3f0f980;

    .more {
      opacity: 1;
    }
  }

  &::before {
    content: "";
    height: 6px;
    width: 6px;
    border-radius: 6px;
    background-color: #d252946a;
    position: absolute;
    left: 5px;
  }
}

.page-item-title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    height: 40px;
  }

  flex: 1;
  width: 100%;
}

.more {
  height: 20px;
  cursor: pointer;
  padding-right: 6px;
  border-radius: 4px;
  transition: 0.4s all;
  margin-right: 4px;
  opacity: 0;
  transition: 0.3s all;
  line-height: 40px;

  &:hover {
    background: #e3f0f9;
    opacity: 1;
  }
}

.date {
  height: 20px;
  cursor: pointer;
  padding-right: 12px;
  padding: 4px;
  border-radius: 4px;
  transition: 0.4s all;
  margin-right: 4px;
  padding-top: 2px;
}

.more-content {
  padding-bottom: 7px;
  cursor: pointer;
  width: 100%;
  transition: 0.3s all;
  padding: 4px;

  &:hover {
    background: #e3f0f9;
  }
}

.page-col2-title {
  font-weight: 400;
  margin-bottom: 8px;
  display: block;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.page-col2-content {
  margin: 8px 0;
  max-height: calc(100% - 92px);
  overflow-y: auto;
  height: auto;
}

.page-col2-item {
  height: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 13px;
  transition: 0.4s all;
  box-shadow: 1px 1px 1px #eeeeee65;

  &:hover {
    background: #e3f0f9;
  }
}

.actives {
  background: #e3f0f9;
}

.page-col2-input {
  height: 32px;
  line-height: 32px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  overflow: hidden;

  :deep(.el-input-group__prepend) {
    font-size: 20px;
    box-shadow: none;
    background-color: #f3f4f7;
    width: 32px;
    padding: 0;
    position: absolute;
    left: 0;
    z-index: 999;
  }

  :deep(.el-input__wrapper) {
    background-color: #f3f4f7;
    padding-left: 0;
    padding-left: 32px;
  }

  :deep(.is-focus) {
    box-shadow: 0 0 0 1px #409eff !important;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  :deep(.el-input-group__prepend) {
    font-size: 20px;
    background-color: #f3f4f7;
    width: 32px;
    padding: 0;
  }
}

.page-col2-item-name {
  margin-left: 8px;
  display: flex;
  justify-content: space-between;
  width: 100%;

  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px #eeeeee65;
    background-color: transparent;
  }
}

.active2 {
  background: #d4eaf7;
}

.closes {
  height: 20px;
  cursor: pointer;
  padding-right: 6px;
  border-radius: 4px;
  transition: 0.4s all;
  margin-right: 4px;
  transition: 0.3s all;
  line-height: 40px;
  padding: 3px 4px;

  &:hover {
    background: #e3f0f9;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  width: 0;
}

.totals {
  padding-right: 6px;
  color: #ccc;

  &:hover {
    color: #999;
  }
}

.ml-2 {
  margin-right: 8px;
}

.page-select {
  max-width: 85px;
  min-width: 60px;
  margin-right: 8px;
}

.page-item-priority-important-urgent {
  background: #e4564cb9;
}

.page-item-priority-important {
  background: rgb(214, 135, 17) 74;
}

.page-item-priority-urgent {
  background: #e8b567;
}

.page-item-priority-not-urgent {
  background: rgba(45, 174, 50, 0.599);
}

.main-title {
  flex: 1;
  margin-right: 8px;
  cursor: text;

  .tils-edit {
    :deep(.el-input) {
      box-shadow: none;
      border: none;
    }

    :deep(.el-input__wrapper) {
      border: none;
      box-shadow: none;
      background-color: transparent;

      &:focus {
        background-color: #f3f4f7;
      }
    }
  }

  .tils {
  }
}

.names {
  text-align: center;
  font-weight: 400;
  font-size: 22px;
  margin: 0 auto;
  margin-top: 20px;
  letter-spacing: 2px;
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;

  :deep(.el-input__wrapper) {
    width: 130px;
    border: none !important;
    box-shadow: none;
    background: transparent !important;
    color: #666;
    border: 1px solid #ddd !important;
    transition: 1s all;

    &:hover {
      border: 1px solid #ddd !important;
    }
  }

  :deep(.el-input__inner) {
    text-align: center;
    width: 200px;
    display: inline-block;
  }

  :deep(.el-input__inner) {
    color: #666;
    border: none;
    box-shadow: none;
  }
}

.n-footer {
  position: absolute;
  bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  right: 0;
  left: 0;
}

.avatar-uploader {
  cursor: pointer;

  .avatar {
    height: 120px;
    width: 120px;
    border-radius: 18px;
    background: #1111110f;
    object-fit: cover;
    z-index: 1;
    border: 1px solid #ddd;
  }

  svg {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    padding: 12px;
    background: #1111110f;
    border: none;
  }
}

.logos {
  position: absolute;
  top: -1px;
  height: 162px !important;
  width: 162px !important;
  transition: 0.5s all;
  z-index: 2;

  &:hover {
    z-index: 0;
  }
}

.reset {
  background: #ccc;
}
</style>
