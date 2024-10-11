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
          <el-form-item label="广告名称：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="广告名称"></el-input>
          </el-form-item>
          <el-form-item label="广告位置：">
            <el-select v-model="listQuery.type" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="到期时间：">
            <el-date-picker
                class="input-width"
                v-model="listQuery.endTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="频道名称：">
            <el-select v-model="listQuery.channelId" placeholder="请选择频道" clearable class="input-width">
              <el-option
                  v-for="item in channelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
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
      <el-button size="small" class="btn-add" @click="handleAdd()">添加广告</el-button>
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
        <el-table-column label="广告名称" align="center">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="广告位置" width="120" align="center">
          <template #default="scope">{{ formatType(scope.row.type) }}</template>
        </el-table-column>
        <el-table-column label="广告图片" width="120" align="center">
          <template #default="scope"><img style="height: 80px" :src="scope.row.pic"></template>
        </el-table-column>
        <el-table-column label="时间" width="230" align="center">
          <template #default="scope">
            <p>开始时间：{{ formatDateTime(scope.row.startTime) }}</p>
            <p>到期时间：{{ formatDateTime(scope.row.endTime) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="频道名称" align="center">
          <template #default="scope">{{ scope.row.channelName }}</template>
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
        <el-table-column label="审核状态" width="100" align="center">
          <template #default="scope">
            <p>{{ (scope.row.auditStatus === 1) ? '审核通过' : '未审核' }}</p>
            <p>
              <el-button
                  type="text"
                  @click="handleShowAuditDetail(scope.row)">审核详情
              </el-button>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="点击次数" width="100" align="center">
          <template #default="scope">{{ scope.row.clickCount }}</template>
        </el-table-column>
        <el-table-column label="生成订单" width="100" align="center">
          <template #default="scope">{{ scope.row.orderCount }}</template>
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
          :page-sizes="[5,10,15]"
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
  useDeleteChannelHomeAdvertise,
  useFetchChannelHomeAdvertiseList,
  useUpdateChannelHomeAdvertise
} from "@/api/marketing_api.ts";
import {useFetchChannelAll} from "@/api/category_api.ts";

const router = useRouter();

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  name: null,
  type: null,
  endTime: null,
  channelId: null,
  status: null,
};

const channelOptions = ref([]);
const defaultTypeOptions = [
  {
    label: 'PC首页轮播',
    value: 0
  },
  {
    label: 'APP首页轮播',
    value: 1
  }
];
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
const typeOptions = ref(Object.assign({}, defaultTypeOptions));
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
  getChannelList();
})

const formatType = (type: number) => {
  if (type === 1) {
    return 'APP首页轮播';
  } else {
    return 'PC首页轮播';
  }
}
const formatDateTime = (time: string) => {
  if (time == null || time === '') {
    return 'N/A';
  }
  let date = new Date(time);
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
    useUpdateChannelHomeAdvertise(row.id, row.status).then(() => {
      ElMessage({
        type: 'success',
        message: '修改成功!',
      });
    });
    getList();
  }).catch(() => {
    ElMessage({
      type: 'success',
      message: '已取消操作!'
    });
    getList();
  });
}

const handleDelete = (row) => {
  deleteHomeAdvertise(row.id);
}

const handleShowAuditDetail = (row) => {

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
    deleteHomeAdvertise(ids);
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
  useFetchChannelHomeAdvertiseList(listQuery.value).then(response => {
    listLoading.value = false;
    list.value = response.data.list;
    total.value = Number(response.data.total);
  });
}
const handleAdd = () => {
  router.push({path: '/marketing/home/advertise/add'})
}

const handleUpdate = (row) => {
  router.push({path: '/marketing/updateAdvertise', query: {id: row.id}})
}

const deleteHomeAdvertise = (ids: Array<string>) => {
  ElMessageBox.confirm('是否要删除该广告?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    useDeleteChannelHomeAdvertise(ids).then(() => {
      getList();
      ElMessage({
        type: 'success',
        message: '删除成功',
        duration: 1000,
      });
    });
  })
}

const getChannelList = () => {
  listLoading.value = true;
  useFetchChannelAll().then(response => {
    listLoading.value = false;
    channelOptions.value = [];
    let channelList = response.data;
    for (let i = 0; i < channelList.length; i++) {
      channelOptions.value.push({label: channelList[i].name, value: channelList[i].id});
    }
  });
}
</script>

<style scoped>
.input-width {
  width: 203px;
}

</style>