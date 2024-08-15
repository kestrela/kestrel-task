<template>
  <Dialog v-model="visible" :dialogTitle="dialogTitle" @closed="closed">
    <div class="wrapper">
      <el-col :span="24" class="n-col n-radio">
        <div class="okr-items">
          <span class="okr-item" :class="[state.okrType === 1 ? 'actives' : '']" @click="okrClick(1)">业务目标</span>
          <span class="okr-item" :class="[state.okrType === 2 ? 'actives' : '']" @click="okrClick(2)">管理目标</span>
          <span class="okr-item" :class="[state.okrType === 3 ? 'actives' : '']" @click="okrClick(3)">个人发展目标</span>
        </div>
      </el-col>
      <el-col :span="24" class="n-col">
        <span>Objective</span>
        <span>权重分配</span>
      </el-col>
      <el-col :span="24" class="n-col n-col1" v-for="(item, index) in state.okrList" :key="index">
        <span v-show="index !== 0">KR{{ index }}</span>
        <el-input v-model="item.name" placeholder="请输入Key Result内容" />
        <el-input v-model="item.weight" placeholder="权重" class="btn" />
        <span v-show="index !== 0" class="del" @click="okrDel(index)">删除</span>
      </el-col>
      <el-col :span="24" class="n-col" v-if="state.okrList.length < 6">
        <span class="adds" @click="okrAdd">+添加Key Result</span>
        <span class="tips">每个目标建议维持3-5个Key Result为最佳</span>
      </el-col>
      <el-col :span="24" class="n-col n-footer">
        <el-button type="primary" @click="onSubmit" :disabled="!isCanSave">确定</el-button>
      </el-col>
    </div>
  </Dialog>
</template>

<script setup>
import { computed, onMounted, reactive, watch } from "vue";
import { ElMessage } from 'element-plus'
import { insertOkrs, updateOkrs } from "@/api/index.js"
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: "添加OKR目标",
  },
  detail: {
    type: Object,
    default: () => { },
  },
});
const state = reactive({
  okrType: 1,
  okrList: [
    { name: "", weight: 100 },
    { name: "", weight: 30 },
    { name: "", weight: 40 },
  ],
});
const visible = computed(() => props.modelValue);
const emit = defineEmits(["update:modelValue", "change"]);
const closed = () => {
  state.okrType = 1;
  state.okrList = [
    { name: "", weight: 100 },
    { name: "", weight: 30 },
    { name: "", weight: 40 },
  ];
  emit("update:modelValue", false);
};

watch(
  () => props.detail,
  (v) => {
    if (v && props.detail && props.detail.id) {
      setForm(props.detail);
    } else {
      setForm();
    }
  }
);

const setForm = (obj = {}) => {
  state.okrType = obj.okrType || 1;
  state.okrList = obj.okrList || [];
};

const okrAdd = () => {
  if (state.okrList.length > 5) {
    return;
  }
  state.okrList.push({ name: "", weight: 0 });
};
const okrDel = (index) => {
  state.okrList.splice(index, 1);
};

const isCanSave = computed(() => {
  return (
    state.okrList &&
    state.okrList.length &&
    state.okrList.filter((v) => !!v.name).length >= 2
  );
});

const okrClick = (okrType) => {
  state.okrType = okrType;
};

onMounted(() => {
  okrClick(1);
});

const onSubmit = () => {
  const params = {
    okrType: state.okrType,
    okrList: JSON.stringify(state.okrList.filter((v) => !!v.name)),
  };

  let saveFn = props && props.detail && props.detail.id ? updateOkrs : insertOkrs
  if (props.detail && props.detail.id) {
    params.id = props.detail.id
  }
  saveFn(params).then(res => {
    ElMessage.success('保存成功')
    emit("search");
    emit("add", params);
    closed();
  })
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

    font-size: 16px;
  }
}

.wrapper {
  height: 100%;
  overflow-y: auto;
  flex-wrap: wrap;
  overflow-x: hidden;
  background: #fff;
  padding: 0 6px;

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
  height: 26px;
  line-height: 26px;
  margin: 12px 0;

  span {}
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

.okr-items {
  display: flex;
  align-items: center;

  .okr-item {
    display: block;
    border: 1px solid #ddd;

    padding: 2px 8px;
    border-radius: 8px;
    margin-right: 8px;
    cursor: pointer;
    transition: 0.5s all;

    &:hover {
      background: #ffffff;
    }
  }

  .actives {
    background: #008c8e !important;
    color:#fff;
  }
}
</style>
