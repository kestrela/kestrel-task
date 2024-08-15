<template>
  <Dialog v-if="isRead" v-model="visible" :dialogTitle="dialogTitle" @closed="closed" width="500px" height="160px">
    <div class="wrappers">
      <el-col :span="24" class="n-col1">
        <span class="n-content">
          <span v-for="(item, index) in versions" :key="index">{{ index + 1 + '.' + item.content }}</span>
        </span>
      </el-col>
    </div>
  </Dialog>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { getVersion } from '@tauri-apps/api/app'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: '系统通知',
  },
})
const state = reactive({
  name: '',
})
const visible = computed(() => props.modelValue)
const emit = defineEmits(['update:modelValue', 'change'])
const getUserInfoId = () => {
  let userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    userInfo = JSON.parse(userInfo)
  }
  if (userInfo.value) {
    return JSON.parse(userInfo.value)
  }
  return {}
}
const closed = () => {
  state.name = ''
  updateUserInfo()
  emit('update:modelValue', false)
}
const appVersion = ref('')
const appNewVersion = ref('')
let versions = ref([])
const url = ref('')
const getNewVersions = () => {
  // getObject('Messages', {}, {}, false).then((res) => {
  //   versions.value = res.map((v, w) => {
  //     return {
  //       index: w + 1,
  //       ...v,
  //       ...v.attributes,
  //     }
  //   })
  // })
}
const setItem = (key, value, expires = 2592000000) => {
  let count = new Date().getTime() + expires
  const obj = {
    value, // 需要缓存的数据
    expires: count, // 缓存有效期，毫秒为单位
  }
  localStorage.setItem(key, JSON.stringify(obj))
}

const isRead = computed(() => {
  let params = getUserInfoId()
  return !params || !params.isRead || params.isRead && params.isRead !== '1'
})
const updateUserInfo = () => {
  let params = getUserInfoId()
  if (!params || !params.isRead || params.isRead !== '1') {
    updateObject('_User', { ...params, isRead: '1' }).then((res) => {
      setItem('userInfo', JSON.stringify({ ...params, isRead: '1' }))
    })
  }
}
onMounted(async () => {
  appVersion.value = await getVersion()
  getNewVersions()
})
</script>

<style lang="scss" scoped>
.n-col1 {
  height: 100% !important;

  .btn {
    width: 80px;
    margin: 0 6px;
  }

  span {
    text-align: left;
  }

  .del {
    color: #f56c6c;
    cursor: pointer;
  }
}

.wrapper {
  height: 100% !important;
  position: relative;

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

.n-col {
  display: flex;
  justify-content: space-between;
  height: 100% !important;
  line-height: 30px;
  margin: 12px 0;
}

.n-footer {
  position: absolute;
  bottom: 10px;
  width: auto;
  display: flex;
  justify-content: flex-end;
  right: 15px;
}

.adds {
  cursor: pointer;
}

.tips {
  cursor: pointer;
}

.wrappers {
  padding: 0;
  display: block;
  height: 100% !important;
  width: 99%;
}

.n-title {
  display: flex;
  align-content: center;
  width: 100%;

  .news {
    margin-left: 30px;
  }
}

.n-content {
  height: 100% !important;
  overflow-y: auto;
  display: block;

  span {
    display: block;
  }
}
</style>