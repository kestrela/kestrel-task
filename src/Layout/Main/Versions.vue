<template>
  <Dialog v-model="visible" @closed="closed" width="520px" height="140px">
    <div class="wrappers">
      <el-col :span="24" class="n-col1">
        <span class="n-title h36">
          <span>应用名称： {{ appName }}</span>
        </span>
        <span class="n-title h36">
          <span>当前版本：<span class="versp">V{{ appVersion }}</span></span>
          <span class="news">最新版本：<span class="versp">V{{ appNewVersion || appVersion }}</span></span>
        </span>
        <span class="n-title h36">
          <span>更新地址：<a :href="hrefSrc">点击下载</a></span>
        </span>
        <span class="n-title h36">
          <span >更新时间：<span class="color999">{{ pubDate }}</span></span>
        </span>
        <span class="n-content">
          <span v-for="(item, index) in versions" :key="index">{{ index + 1 + '.' + item.content }}</span>
        </span>
      </el-col>
      <el-col :span="24" class="n-footer">
        <el-button type="primary" @click="downloadFile" :loading="loading" :disabled="isDiff">{{ isDiff ? '已经是最新版本' :
          '立即更新' }}</el-button>
      </el-col>
    </div>
  </Dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { getVersion } from '@tauri-apps/api/app'
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { getUpdateVersion } from '@/api/index.js'
import dayjs from 'dayjs'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: '版本更新',
  },
})
const state = reactive({
  name: '',
})
const visible = computed(() => props.modelValue)
const emit = defineEmits(['update:modelValue', 'change'])
const closed = () => {
  state.name = ''
  emit('update:modelValue', false)
}
const appVersion = ref('')
const appNewVersion = ref('')
let versions = ref([])
const url = ref('')
const loading = ref(false)
const isDiff = ref(true) //最新版本
watch(
  () => visible.value,
  (v) => {
    if (v) {
      checkUpdate().then((res) => {
        const { shouldUpdate } = res
        isDiff.value = !shouldUpdate
        if (shouldUpdate) {
        }
      })
    }
  }
)

function downloadFile() {
  loading.value = true
  installUpdate()
    .then(async (res) => {
      ElMessage.success('更新成功')
      relaunch()
        .then((res) => {
          loading.value = false
        })
        .finally(() => {
          loading.value = false
        })
    })
    .catch(() => {
      loading.value = false
    })
}
const appName = ref('')
const hrefSrc = ref('')
const pubDate = ref('')
const getNewVersions = () => {
  getUpdateVersion().then(res => {
    appName.value = res.notes
    appNewVersion.value = res.version
    hrefSrc.value = res.platforms['windows-x86_64'].url.replace('.zip', '')
    pubDate.value = dayjs(res.pub_date).format('YYYY-MM-DD HH:mm:ss')
    isDiff.value = appVersion.value === res.version
  })
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
  height: calc(100% - 60px) !important;
  overflow-y: auto;
  display: block;
  margin-top: 6px;

  span {
    display: block;
    line-height: 32px;
  }
}

.versp{
  background: #f9c75d9e;
  border-radius: 6px;
  padding: 3px 8px!important;
  font-size:12px;
}

.h36{
  line-height: 30px;
}
a{
  color:rgba(0, 0, 255, 0.533);
  transition: all 0.5s;
  &:hover{
    color:blue;
  }
}

.color999{
  color:#999;
  font-size:13px;
}
</style>