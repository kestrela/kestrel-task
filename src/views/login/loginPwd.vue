<template>
  <el-form label-position="top" ref="ruleForm" :model="formState" :rules="rules" label-width="0" status-icon class="login-ruleForm">
    <el-form-item prop="account">
      <el-input class="input-s" ref="account" v-model="formState.account" name="account" placeholder="请输入账号" :clearable="true" tabindex="1" type="text" maxlength="100" autocomplete="off" />
    </el-form-item>

    <el-form-item prop="password">
      <el-input class="input-s" ref="password" v-model="formState.password" show-password name="password" placeholder="请输入密码" :clearable="true" tabindex="2" maxlength="16" type="password" autocomplete="off" @keyup.enter="loginHandle" />
    </el-form-item>

    <el-form-item v-if="showCaptcha" prop="captcha">
      <div style="position: relative">
        <div class="code-inp">
          <el-input ref="captcha" v-model="formState.captcha" type="text" name="captcha" placeholder="请输入校验码" :clearable="true" tabindex="3" maxlength="6" autocomplete="off" @keyup.enter="loginHandle" />
        </div>
        <div class="code">
          <div v-html="captchaImg" ref="captchaImage" alt="" @click="updateImage" />
        </div>
      </div>
    </el-form-item>
    <el-form-item style="margin-bottom: 0">
      <el-button v-if="isLogin" class="h80 login-btn" :loading="loading" type="primary" size="large" style="width: 100%" @click.prevent="loginHandle">
        快速登录
      </el-button>
      <el-button v-else class="h80 login-btn" :loading="loading" type="primary" size="large" style="width: 100%" @click.prevent="loginHandle">
        快速注册
      </el-button>
      <div class="register" v-if="isLogin" @click="goRegister" ref="sendSms"><span class="color-999">还没有账号？</span>去注册
      </div>
      <div class="register" v-else @click="goLogin" id="verify" ref="sendSms"><span class="color-999">已有账号,</span>去登录
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { login, register, insertLoginLogs ,publicConfig} from '@/api/index.js'
import { getCaptcha } from '@/api/index.js'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref, onBeforeMount, reactive, onMounted, computed } from 'vue'
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/api/notification'
import { appWindow } from '@tauri-apps/api/window'
const router = useRouter()
const route = useRoute()

const ruleForm = ref()
const trigger = ['blur', 'change']
const formState = reactive({
  country: '86',
  captcha: '',
  account: '',
  password: '',
})
const rules = {
  account: [{ required: true, message: '请输入账号', trigger }],
  password: [{ required: true, message: '请输入密码', trigger }],
  captcha: [{ required: true, message: '请输入校验码', trigger }],
}
const bindToken = ref('')
const showCaptcha = ref(true)
const captchaImg = ref('')
const captchaId = ref('')
const loading = ref(false)

const disabledLogin = computed(() => {
  const { captcha, account, password } = formState
  if (showCaptcha.value) {
    return !captcha || !account || !password
  } else {
    return !account || !password
  }
})

const reset = () => {
  formState.account = ''
  formState.password = ''
}

const isLogin = ref(true)
const goRegister = () => {
  isLogin.value = false
  reset()
}

const goLogin = () => {
  isLogin.value = true
  reset()
}

const captcha = ref(null)
const captchaImage = ref(null)
const sendSms = ref(null)

onBeforeMount(() => {
  getQueryParams()
  updateImage()
})

function getQueryParams() {
  const query = route.query
  bindToken.value = query.bindToken || ''
}
// 图片验证码
async function updateImage() {
  getCaptcha().then((res) => {
    captchaImg.value = res.data
    captchaId.value = res.text
  })
}

//一个月
const setItem = (key, value, expires = 2592000000) => {
  let count = new Date().getTime() + expires
  const obj = {
    value, // 需要缓存的数据
    expires: count, // 缓存有效期，毫秒为单位
  }
  localStorage.setItem(key, JSON.stringify(obj))
}

function loginHandle() {
  ruleForm.value &&
    ruleForm.value.validate(async (valid) => {
      if (valid) {
        try {
          const params = {
            username: formState.account,
            password: formState.password,
          }
          if (showCaptcha.value) {
            params.captchaId = captchaId.value
            params.captchaValue = formState.captcha
          }
          const nickname = formState.account
          const password = formState.password
          const params1 = {
            nickname,
            password,
          }
          if (
            captchaId.value.toLowerCase() !== formState.captcha.toLowerCase()
          ) {
            return ElMessage.error('验证码错误')
          }
          loading.value = true
          if (isLogin.value) {
            params1.loginType = 'windows'
            login(params1)
              .then(async (res) => {
                console.log('++',res)
                ElMessage.success('成功')
                const { token } = res
                const userInfo = res
                userInfo.id = res.token
                setItem('userInfo', JSON.stringify(userInfo))
                setItem('itoken', token)
                const result = await publicConfig();
                await insertLoginLogs({ ...result, loginType: 'windows' })
                router.push('/')
                await appWindow.setMaximizable(true)
                let permissionGranted = await isPermissionGranted()
                if (!permissionGranted) {
                  const permission = await requestPermission()
                  permissionGranted = permission === 'granted'
                }
                if (permissionGranted) {
                  sendNotification('欢迎使用微芒计划')
                }
                window.location.reload()
              })
              .catch(() => {
                ElMessage.error('账号或密码错误，请重新输入！')
              })
          } else {
            register(params1)
              .then((res) => {
                ElMessage.success('注册成功')
                isLogin.value = true
              })
              .catch(() => {
                ElMessage.error('注册失败！')
              })
          }
        } catch (e) {
          handleError(e)
        } finally {
          loading.value = false
          if (showCaptcha.value) {
            await updateImage()
          }
        }
      }
    })
}

function handleError(err) {
  switch (err.code) {
    case 211:
      ElMessage.error('未找到该用户，请先去注册！')
      break
    case 210:
      ElMessage.error('账号或密码错误，请重新输入！')
      break
    case 219:
      ElMessage.error(
        '登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码!'
      )
      break
  }
}

defineOptions({
  name: 'LoginPwd',
})
</script>

<style lang="scss" scoped>
.code-inp {
  width: calc(100% - 125px);
  display: inline-block;
  vertical-align: middle;
  margin-right: 15px;
  height: 44px;
  line-height: 44px;
}

.code {
  display: inline-block;
  height: 40px;
  width: 110px;
  border-radius: 5px;
  cursor: pointer;
  vertical-align: middle;
  overflow: hidden;

  img {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }

  &:hover {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }
}

.login-ruleForm {
  :deep(.el-form-item__label) {
    color: #999;
    padding: 0 0 12px;
    font-size: 16px;
  }

  .h80 {
    letter-spacing: 2px;
    font-size: 16px;
  }
}

.input-s {
  height: 40px;
  line-height: 40px;
}

.input-s :deep(.el-input__wrapper) {
  box-shadow: none;
  background: #edf8f9;
}

.input-s :deep(svg) {
  color: #2db9f9;
}

.input-s :deep(i) {
  font-size: 18px;
}

.login-btn {
  background-color: #008d8e !important;
  border-radius: 5px;
  line-height: 40px;
  height: 40px;
  font-size: 15px;
  font-weight: 400;
  border-radius: 30px;
  color: #fff;
  width: 100%;
}

.register {
  color: #32a3ff;
  cursor: pointer;
  width: 100%;
  text-align: right;
  transition: 0.5s all;

  &:hover {
    color: #058bf9;
  }
}

.color-999 {
  color: #999;

  &:hover {
    text-decoration: inherit !important;
  }
}

:deep(.el-input__inner) {
  font-size: 14px;
  color: #333;
}

:deep(.el-input__wrapper) {
  border-color: #ccc !important;
}

:deep(.el-form-item) {
  margin-bottom: 18px !important;
}
</style>
