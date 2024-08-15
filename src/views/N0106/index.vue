<template>
  <div class="page-col2-content">
    <el-row :gutter="20">
      <el-col :span="3">
        <div>12321312</div>
      </el-col>
      <el-col :span="18">
        柱状统计图
      </el-col>
      <el-col :span="3">
        饼状统计图
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-table-v2 :columns="columns" :data="data" :height="400" fixed ></el-table-v2>
      </el-col>
      <el-col :span="24">
        <el-table-v2 :columns="columns" :data="data" :height="400" fixed ></el-table-v2>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const generateColumns = (length = 10, prefix = 'column-', props) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150,
  }))

const generateData = (
  columns,
  length = 200,
  prefix = 'row-'
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    )
  })

const columns = generateColumns(10)
const data = generateData(columns, 1000)
</script>

<style scoped lang="scss">
.page-col2-content {
  margin: 8px 0;
  max-height: calc(100% - 72px);
  overflow-y: auto;
  height: auto;
}
:deep(.el-table-v2){
  .el-table-v2__main,
  .el-table-v2__header-cell{
    background: transparent;
  }
}
</style>