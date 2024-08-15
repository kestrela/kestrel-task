<template>
  <Dialog
    v-model="visible"
    :dialogTitle="dialogTitle"
    @closed="closed"
    width="50vw"
  >
    <div class="f-form">
      <span
        v-for="(item, index) in detail"
        :key="index"
        class="details"
        @click="copyClick(item)"
      >
        <span v-html="formatStr(`${index + 1}.${ item.name }`)"> </span>
        <el-tag
          class="thga"
          effect="light"
          :type="getTags1(item.tags)"
          size="mini"
          v-if="item.tags"
          >{{ item.tags }}</el-tag
        >
        <el-tag
          class="thga"
          effect="Plain"
          :type="getTag(item.priority)"
          size="mini"
          v-if="item.priority"
          >{{ item.priority }}</el-tag
        >
      </span>
    </div>
    <el-col :span="24" class="n-col n-footer">
      <el-button type="primary" @click="onSubmit" :disabled="!isCanSave"
        >确定</el-button
      >
    </el-col>
  </Dialog>
</template>

<script setup>
import { writeText } from "@tauri-apps/api/clipboard";
import { computed, onMounted, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: "任务明细",
  },
  detail: {
    type: Array,
    default: () => [],
  },
});
function formatStr(input) {
  const regex = /(\d{13})/;
  const nameRegex = /[-\s]*[\u4e00-\u9fa5]{2,3}$/;

  return input
    .replace(regex, '<span style="color:#409eff;">$1</span>')
    .replace(nameRegex, (match) => {
      if (match.trim().length > 0 && input.trim().endsWith(match.trim())) {
        return '<span style="color: #f56c6c;">' + match + "</span>";
      } else {
        return match;
      }
    });
}
const state = reactive({
  dataForm: {
    name: "",
    priority: "",
    status: "1",
    endTime: "",
    memo: "",
    tags: "",
    types: "",
  },
  options: [
    { label: "重要且紧急", value: "重要且紧急" },
    { label: "紧急但不重要", value: "紧急但不重要" },
    { label: "重要且不紧急", value: "重要且不紧急" },
    { label: "不重要不紧急", value: "不重要不紧急" },
  ],
  options1: [
    { label: "未完成", value: "1" },
    { label: "已完成", value: "7" },
  ],
  options2: [
    { label: "未完成", value: "1" },
    { label: "已完成", value: "7" },
  ],
  options3: [],
});

const setForm = (obj = {}) => {
  state.dataForm.name = obj.name || "";
  state.dataForm.priority = obj.priority || "";
  state.dataForm.status = obj.status || "";
  state.dataForm.endTime = obj.endTime || "";
  state.dataForm.memo = obj.memo || "";
};

const getTags1 = (key) => {
  let len1 = key.length || 1;
  let hash = {
    0: "info",
    1: "danger",
    2: "warning",
    3: "info",
    4: "success",
  };
  return hash[len1 % 4];
};

const getTag = (key) => {
  let hash = {
    重要且紧急: "danger",
    紧急但不重要: "warning",
    重要且不紧急: "info",
    不重要不紧急: "success",
  };
  return hash[key];
};

onMounted(() => {
  getTagsOptions();
  getTypesOptions();
});

const getTagsOptions = () => {
  // getObject("Tags", {}).then((res) => {
  //   state.options2 = res.map((v, w) => {
  //     return {
  //       index: w + 1,
  //       ...v,
  //       ...v.attributes,
  //     };
  //   });
  // });
};

const getTypesOptions = () => {
  // getObject("TYPES", {}).then((res) => {
  //   state.options3 = res.map((v, w) => {
  //     return {
  //       index: w + 1,
  //       ...v,
  //       ...v.attributes,
  //     };
  //   });
  // });
};

watch(
  () => props.modelValue,
  (v) => {
    if (v && props.detail && props.detail.id) {
      setForm(props.detail);
    } else {
      setForm();
    }
  }
);

const copyClick = async (item) => {
  let str = item.name + "\n";
  if (item && item.children && item.children.length) {
    for (let i = 0; i < item.children.length; i++) {
      str += item.children[i].name + "\n";
    }
  }
  await writeText(str);
  ElMessage.success("复制成功！");
};

const visible = computed(() => props.modelValue);
const emit = defineEmits(["update:modelValue", "change"]);
const closed = () => {
  emit("update:modelValue", false);
};

const isCanSave = computed(() => {
  return state.dataForm.name && state.dataForm.name.length;
});

const onSubmit = () => {
  const params = {
    ...state.dataForm,
    status: state.status || "1",
  };
  if (params.endTime) {
    params.endTime = dayjs(params.endTime).format("YYYY-MM-DD HH:mm:ss");
  }

  if (props.detail && props.detail.id) {
    params.id = props.detail.id;
  }

  let saveFn = props.detail && props.detail.id ? updateObject : saveObject;
  saveFn("TASK", params).then((res) => {
    emit("search");
    closed();
  });
};
</script>

<style lang="scss" scoped>
.n-col1 {
  display: flex;
  height: 32px;
  align-items: center;

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
}

.wrapper {
  height: 100%;
  overflow-y: auto;
  flex-wrap: wrap;
  overflow-x: hidden;
  background: #fff;
  padding: 0 12px;

  :deep(.el-select) {
    width: 100%;

    .el-input {
      width: 100%;
    }
  }

  :deep(.el-input) {
    width: 100%;
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

.f-form {
  margin-top: 8px;
  height: calc(55vh - 90px);
  overflow-y: auto;
  overflow-x: hidden;
}

.details {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px 5px;
  margin-bottom: 3px;
  display: block;
  line-height: 1.4;
  cursor: pointer;
  transition: 0.5s all;

  &:hover {
    background: #bfe8fc !important;
  }
}

.thga {
  font-size: 11px !important;
  padding: 0px 3px;
  height: 18px;
  margin-right: 5px;
  margin-left: 3px;
}
</style>
