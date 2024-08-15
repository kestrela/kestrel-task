<template>
  <Dialog v-model="visible" @closed="closed" width="600px" height="280px">
    <div class="wrappers">
      <el-col :span="24" class="n-col1">
        <span class="n-content">
          <span v-for="(item, index) in versions" :key="index">{{ index + 1 + '.' + item.content }}</span>
        </span>
      </el-col>
      <el-col :span="24" class="n-footer">
        <el-button @click="closed">关闭</el-button>
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
    default: '开发计划',
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
const getNewVersions = () => {
  // getObject('Plans', {}, {}, false).then((res) => {
  //   versions.value = res.map((v, w) => {
  //     return {
  //       index: w + 1,
  //       ...v,
  //       ...v.attributes,
  //     }
  //   })
  // })

  let res = [
  {
    "content": "开发一个功能完备的待办事项列表，包括任务创建、编辑、删除、优先级设置和状态跟踪（未完成、进行中、已完成）。"
  },
  {
    "content": "实现多主题支持，允许用户根据个人喜好切换应用程序主题，如浅色模式、深色模式或自定义颜色方案。"
  },
  {
    "content": "集成番茄时钟功能，帮助用户提高专注度和生产力，允许用户设置工作和休息时间间隔。"
  },
  {
    "content": "提供日历视图，使用户能够以月视图、周视图或日视图查看任务和事件。"
  },
  {
    "content": "允许用户设置任务之间的依赖关系，例如，某些任务必须在其他任务完成后才能开始。"
  },
  {
    "content": "开发一个智能提醒系统，根据用户的任务设置和习惯自动提醒用户即将到来的截止日期或任务。"
  }
]
  
     versions.value = res.map((v, w) => {
      return {
        index: w + 1,
        content:v.content
      }
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
  padding: 12px;
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
    color:#666!important;
  }
}
</style>