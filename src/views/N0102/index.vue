<template>
  <el-row class="N1012" :gutter="10">
    <el-col :span="24" class="n-col" @click="addClick({})">
      <el-card :body-style="{ padding: '0px' }" class="page-card" shadow="none">
        <div style="padding: 6px">
          <span class="adds">添加Objective</span>
        </div>
      </el-card>
    </el-col>
    <el-col v-for="(item, index) in state.okrList" :key="index" :span="24" class="n-col" @click="addClick(item)">
      <el-card :body-style="{ padding: '0px', 'background-color': colors[index % 7] }" class="page-card" shadow="none">
        <div style="padding: 6px">
          <div v-for="(itemd, idx) in item.okrList" class="okr-item" :key="idx">
            <span :class="[okrTags(index), 'tags']" v-if="idx === 0">O{{ index+1 +' '+tagFn(item.okrType)}} </span>
            <span class="o1 o111" v-if="idx === 0">{{ itemd.name }} <el-tag :type="isFinished(item).type" class="finish"
                effect="dark" round size="mini">{{ isFinished(item).name }}</el-tag><span class="dels"
                @click.stop="deleteClick(item)">删除</span></span>
            <span class="o1" v-else><span :class="[okrTags1(index), 'o11']">KR{{ index + 1 }}.{{ idx }}</span> {{
              itemd.name }}</span>
            <span class="o2 o33">{{ itemd.weight }}%</span>
            <span class="o3" v-if="!itemd.process"> <el-tag size="mini" effect="light"
                @click.stop="saveClick(item, itemd)" type="info">未开始</el-tag></span>
            <span class="o3" v-else-if="itemd.process === 1"> <el-tag size="mini" effect="light"
                @click.stop="saveClick(item, itemd)" type="warning">进行中</el-tag></span>
            <span class="o3" v-else-if="itemd.process >= 2"> <el-tag size="mini" effect="light"
                @click.stop="saveClick(item, itemd)" type="success">完成</el-tag></span>
            <span class="o3" v-else-if="itemd.process === 3"> <el-tag size="mini" effect="light"
                @click.stop="saveClick(item, itemd)" type="danger">超时</el-tag></span>
          </div>
        </div>
      </el-card>
    </el-col>
    <AddDialog v-model="isAddVisible" @search="search" :detail="detail" @add="add" />
  </el-row>
</template>
<script setup>
import AddDialog from './AddDialog.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, reactive, ref, toRefs, nextTick } from 'vue'
import { getOkrs,deleteOkrs,updateOkrs } from "@/api/index.js"
const state = reactive({
  okrList: [],
  isAddVisible: false,
})
const { isAddVisible } = toRefs(state)
const detail = ref({})
const addClick = (row) => {
  detail.value = { ...row }
  state.isAddVisible = true
}

const deleteClick = (row) => {
  ElMessageBox.confirm('确认删除该条数据吗？', '', {
    confirmButtonText: '确认',
    type: 'warning',
  }).then((res) => {
    deleteOkrs({id:row.id}).then((res) => {
      ElMessage.success('删除成功')
      search()
    })
  })
}

const isFinished = (item) => {
  let flag = item.okrList && item.okrList.every((item) => item.process >= 2)
  if (flag) {
    return {
      type: 'success',
      name: '已完成',
    }
  }
  let flag1 = item.okrList && item.okrList.some((item) => item.process >= 1)
  if (flag1) {
    return {
      type: 'warning',
      name: '进行中',
    }
  }
  return {
    type: 'info',
    name: '未开始',
  }
}
const change = (item) => {
  state.tableData.push(item)
}

const add = (obj) => {
  obj.okrList = JSON.parse(obj.okrList)
  state.okrList.push(obj)
}
const search = () => {
  getOkrs({ pageSize: 1000, pageNum: 1 }).then(res => {
    state.okrList = res.data.map(item => {
      return {
        ...item,
        okrList: item.okrList ? JSON.parse(item.okrList) : []
      }
    })
  })
}

const okrTags = (idx) => {
  const count = idx % 4
  switch (count) {
    case 0:
      return 'n-tag-blue'
    case 1:
      return 'n-tag-green'
    case 2:
      return 'n-tag-yellow'
    case 3:
      return 'n-tag-red'
    default:
      return ''
  }
}

const okrTags1 = (idx) => {
  const count = idx % 4
  switch (count) {
    case 0:
      return 'n-tag-blue1'
    case 1:
      return 'n-tag-green1'
    case 2:
      return 'n-tag-yellow1'
    case 3:
      return 'n-tag-red1'
    default:
      return ''
  }
}

const tagFn = (idx) => {
  switch (idx) {
    case 1:
      return ' 业务目标'
    case 2:
      return ' 管理目标'
    case 3:
      return ' 个人发展目标'
    default:
      return '目标'
  }
}

const colors = ref([
  '#ffeca869',
  '#ffcdd869',
  '#c7e5c969',
  '#fedcc369',
  '#c4c9e769',
  '#e2bde969',
  '#fed69969',
])

const saveClick = (row, itemd) => {
  if (!itemd.process) {
    itemd.process = 0
  }
  if (itemd.process && itemd.process > 3) {
    return
  }
  itemd.process++
  const params = {
    okrType: row.okrType,
    okrList: JSON.stringify(row.okrList.filter((v) => !!v.name)),
    id: row.id,
  }
  updateOkrs(params).then((res) => {
    search()
  })
}

onMounted(() => {
  search()
})
</script>

<style scoped>
.N1012 {
  padding: 6px 10px 0 10px;
  overflow-y: auto;
  height: 100%;
  padding-right: 0;
  display: inline-block !important;
  width: 100%;
}

.n-img {
  height: 100px;
  object-fit: cover;
  width: 100%;
}

.n-col {
  cursor: pointer;
  width: 100%;
  margin-bottom: 0;
}

.page-card {
  background-color: transparent !important;
  color: #666;
  width: 99%;
  border: none;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 13px;
}

.page-card-image {
  height: 100px;
  object-fit: cover;
  width: 100%;
}

.n-tag-blue {
  background: #25d4d255;
}

.n-tag-green {
  background: #1890ff;
}

.n-tag-yellow {
  background: #8f54de;
}

.n-tag-red {
  background: #ff7875;
}

.n-tag-blue1 {
  color: #25d4d2;
}

.n-tag-green1 {
  color: #1890ff;
}

.n-tag-yellow1 {
  color: #8f54de;
}

.n-tag-red1 {
  color: #ff7875;
}

.o11 {
  font-size: 14px;
}

.tags {
  display: inline-block;
  text-align: center;
  color: #333;
  margin-right: 6px;
  border-radius: 14px;
  font-size: 14px;
  padding: 0 8px;

}

.okr-item {
  margin: 5px 0;
  display: flex;
  align-items: center;
  font-size: 14px;

  border-radius: 8px;
}

.o1 {
  flex: 1;
  display: inline-block;
  text-align: left;
  color: #666;
  font-size: 14px;
}

.o2 {
  width: 100px;
  display: inline-block;
  text-align: center;
  color: #666;
}

.o3 {
  width: 100px;
  display: inline-block;
  text-align: right;
  color: #666;
}

.o111 {
  font-weight: 400;
  font-size: 14px;
  font-weight: 700;
}

.adds {
  font-size: 14px;
  transition: 0.5s all;
  &:hover{
    background: #f8f8f8;
  }
}

.finish {
  line-height: 18px;
  height: 20px;
  margin-top: -4px;
  font-size: 11px;
}

.dels {
  color: #999;
  cursor: pointer;
  border-radius: 12px;
  font-size: 11px;
  margin-left: 3px;
  padding: 2px 6px;
  transition: 0.6s all;

  &:hover {
    background: rgba(255, 0, 0, 0.307);
    color: red;
  }
}

.o33{
  color:#999!important;
}
</style>