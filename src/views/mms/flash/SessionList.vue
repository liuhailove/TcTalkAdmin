<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-icon>
          <Search/>
        </el-icon>
        <span>筛选搜索</span>
        <el-button
            style="float:right"
            type="primary"
            @click="handleSearchList()"
            size="small">
          查询搜索
        </el-button>
        <el-button
            style="float:right;margin-right: 15px"
            @click="handleResetSearch()"
            size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="时间段名称：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="时间段名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="上线状态：">
            <el-select v-model="listQuery.status" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="small" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="40" align="center"></el-table-column>
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
        <el-table-column label="上线/下线" width="100" align="center">
          <template #default="scope">
            <el-switch
                @change="handleUpdateStatus(scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template #default="scope">
            <el-button size="small"
                       type="text"
                       @click="handleUpdate(scope.row)">编辑
            </el-button>
            <el-button size="small"
                       type="text"
                       @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
          size="small"
          style="width: 100px;"
          v-model="operateType" placeholder="批量操作">
        <el-option
            v-for="item in operates"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button
          style="margin-left: 20px"
          class="search-button"
          @click="handleBatchOperate()"
          type="primary"
          size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :page-size="listQuery.pageSize"
          :page-sizes="[10,20,50]"
          :current-page.sync="listQuery.pageNum"
          :total="total">
      </el-pagination>
    </div>
  </div>

</template>
<script setup lang="ts">
import {Search} from "@element-plus/icons-vue";
import {formatDate} from "@/utils/date.ts";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {
  useDeleteFlashPromotionSession,
  useFetchFlashPromotionSessionList, useUpdateFlashPromotionSessionStatus,
} from "@/api/marketing_api.ts";

const router = useRouter();

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  name: null,
  endTime: null,
  channelId: null,
  status: null,
};
const defaultStatusOptions = [
  {
    label: '上线',
    value: 1
  },
  {
    label: '下线',
    value: 0
  }
];
const listQuery = ref(Object.assign({}, defaultListQuery));
const statusOptions = ref(Object.assign({}, defaultStatusOptions));
const list = ref(null);
const total = ref(0);
const listLoading = ref(false);
const multipleSelection = ref([]);
const operates = ref([{
  label: "删除",
  value: 0
}]);
const operateType = ref(null);
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

const handleResetSearch = () => {
  listQuery.value = Object.assign({}, defaultListQuery);
}

const handleSearchList = () => {
  listQuery.value.pageNum = 1;
  getList();
}

const handleSelectionChange = (val) => {
  multipleSelection.value = val;
}

const handleSizeChange = (val: number) => {
  listQuery.value.pageNum = 1;
  listQuery.value.pageSize = val;
  getList();
}

const handleCurrentChange = (val: number) => {
  listQuery.value.pageNum = val;
  getList();
}

const handleUpdateStatus = (row) => {
  ElMessageBox.confirm('是否要修改上线/下线状态?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    useUpdateFlashPromotionSessionStatus(row.id, row.status).then(() => {
      ElMessage({
        type: 'success',
        message: '修改成功!',
      });
      getList();
    });

  }).catch(() => {
    ElMessage({
      type: 'success',
      message: '已取消操作!'
    });
    getList();
  });
}

const handleDelete = (row) => {
  deleteFlashPromotionSession(row.id);
}
const handleBatchOperate = () => {
  if (multipleSelection.value.length < 1) {
    ElMessage({
      type: 'warning',
      message: '请选择一条记录!',
      duration: 1000,
    });
    return;
  }
  let ids = [];
  for (let i = 0; i < multipleSelection.value.length; i++) {
    ids.push(multipleSelection.value[i].id);
  }
  if (operateType.value === 0) {
    // 删除
    deleteFlashPromotionSession(ids);
  } else {
    ElMessage({
      type: 'warning',
      message: '请选择批量操作类型',
      duration: 1000,
    });
  }
}

const getList = () => {
  listLoading.value = true;
  useFetchFlashPromotionSessionList(listQuery.value).then(response => {
    listLoading.value = false;
    list.value = response.data.list;
    total.value = Number(response.data.total);
  });
}
const handleAdd = () => {
  router.push({path: '/marketing/flashSession/add'})
}

const handleUpdate = (row) => {
  router.push({path: '/marketing/flashSession/update', query: {id: row.id}})
}


const deleteFlashPromotionSession = (ids: Array<string>) => {
  ElMessageBox.confirm('是否要删除该秒杀活动?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    useDeleteFlashPromotionSession(ids).then(() => {
      getList();
      ElMessage({
        type: 'success',
        message: '删除成功',
        duration: 1000,
      });
    });
  })
}
</script>

<style scoped>
.input-width {
  width: 203px;
}

</style>