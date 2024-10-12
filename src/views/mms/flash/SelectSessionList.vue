<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="80" align="center">
          <template #default="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="秒杀时间段名称" align="center">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="每日开始时间" width="230" align="center">
          <template #default="scope">
            {{ formatDateTime(scope.row.startTime) }}
          </template>
        </el-table-column>
        <el-table-column label="每日结束时间" width="230" align="center">
          <template #default="scope">
            {{ formatDateTime(scope.row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column label="商品数量" align="center">
          <template #default="scope">
            {{ scope.row.productCount }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template #default="scope">
            <el-button size="small"
                       type="text"
                       @click="handleShowRelation(scope.row)">商品列表
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>
<script setup lang="ts">
import {formatDate} from "@/utils/date.ts";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {
  useFetchFlashPromotionSessionList
} from "@/api/marketing_api.ts";

const route = useRoute();
const router = useRouter();

const list = ref(null);
const total = ref(0);
const listLoading = ref(false);
onMounted(() => {
  getList();
})
const formatDateTime = (time: string) => {
  if (time == null || time === '') {
    return 'N/A';
  }
  let date = new Date(time);
  return formatDate(date, 'hh:mm:ss')
}

const getList = () => {
  listLoading.value = true;
  useFetchFlashPromotionSessionList(route.query.id as string).then(response => {
    listLoading.value = false;
    list.value = response.data.list;
    total.value = Number(response.data.total);
  });
}
</script>

<style scoped>
</style>