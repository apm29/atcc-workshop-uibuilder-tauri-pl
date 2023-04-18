<template>
  <el-dialog
    title="历史操作记录"
    :visible.sync="show"
    width="90%"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-table
      :data="tableData"
      style="width: 100%"
      class="flex-grow"
      highlight-current-row
      size="mini"
      ref="historyTable"
      v-loading="loadingHistoryData"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column
        prop="type"
        label="操作类型"
        header-align="center"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="operation"
        label="动作事件"
        header-align="left"
        align="left"
        width="400"
      ></el-table-column>
      <el-table-column
        prop="create_time"
        label="操作时间"
        header-align="center"
        align="center"
      ></el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center; margin-top: 10px"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[10, 12]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-dialog>
</template>
<script setup>
import { getOperationRecordPaged } from "~/api/plcDict"
const historyTable = ref();
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
    defalt: () => false,
  },
});
const { show } = toRefs(props);
const handleClose = function () {
  emits("close", false);
};
const emits = defineEmits(["close"]);

watch(
  () => show.value,
  (newVal, oldVal) => {
    if (newVal === true) {
      getRecordsData();
    }
  }
);
const tableData = ref([]);
const loadingHistoryData = ref(false);
const page = ref(1);
const size = ref(10);
const total = ref(0);
//获取操作记录列表
const getRecordsData = async function () {
  loadingHistoryData.value = true;
  let res = await getOperationRecordPaged({page: unref(page),size: unref(size)});
  tableData.value = res.data?.list || [];
  tableData.value = tableData.value.map((item)=>{
    item.create_time = item.create_time?.slice(0,item.create_time?.indexOf("."));
    return item;
  });
  loadingHistoryData.value = false;
  total.value = res.data?.total || 0;
}
const handleSizeChange = function (val) {
  size.value = val;
  getRecordsData();
}
const handleCurrentChange = function (val) {
  page.value = val;
  getRecordsData();
}
</script>
<style lang="scss" scoped></style>
