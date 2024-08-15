<template>
  <Dialog v-model="visible" :dialogTitle="dialogTitle" @closed="closed" width="500px" height="200px">
    <div class="wrappers">
      <el-col :span="24" class="n-col1">
        <el-input type="textarea" maxlength="600" v-model="state.name" :rows="8" resize="none" placeholder="意见或者建议" />
      </el-col>
      <el-col :span="24" class="n-col n-footer">
        <el-button type="primary" @click="onSubmit" :disabled="!isCanSave">保存</el-button>
      </el-col>
    </div>
  </Dialog>
</template>

<script setup>
import { insertSuggestions } from "@/api/index.js";
import { ElMessage } from "element-plus";
import { computed, reactive } from "vue";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: "感谢您的建议",
  },
});
const state = reactive({
  name: "",
});
const visible = computed(() => props.modelValue);
const emit = defineEmits(["update:modelValue", "change"]);
const closed = () => {
  state.name = "";
  emit("update:modelValue", false);
};

const isCanSave = computed(() => {
  return !!state.name;
});

const onSubmit = () => {
  const params = {
    content: state.name,
  };
  insertSuggestions(params).then(res => {
    emit("search");
    ElMessage.success("提交成功");
    closed();
  })

};
</script>

<style lang="scss" scoped>
.n-col1 {
  .btn {
    width: 80px;
    margin: 0 6px;
  }

  span {
    display: inline-block;
    width: 60px;
    text-align: center;
  }

  .del {
    color: #f56c6c;
    cursor: pointer;
  }

  :deep(.el-textarea) {
    &:focus {
      border: 1px solid #ddd !important;
    }

    textarea {
      border: 1px solid #ddd !important;

      &:focus {
        border: 1px solid #ddd !important;
        box-shadow: none;
      }
    }
  }
}

.wrapper {
  height: 100%;

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
  height: 30px;
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

.wrappers,
:deep(.el-textarea) {
  padding-right: 6px;
  display: block;
  height: 160px;
  width: 99%;

  textarea {
    height: 100%;
    background: transparent;
    border-color: #eeeeee55;

    &:active,
    &:focus {
      border-color: #eeeeee65;
    }
  }
}
</style>
