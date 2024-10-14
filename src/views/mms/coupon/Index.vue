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
          <el-form-item label="优惠券名称：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="优惠券名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="优惠券类型：">
            <el-select v-model="listQuery.type" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in typeOptions"
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
      <el-button size="small" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加优惠券</el-button>
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
        <el-table-column label="优惠券名称" align="center">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="优惠券类型" align="center">
          <template #default="scope">{{ formatType(scope.row.type) }}</template>
        </el-table-column>
        <el-table-column label="可使用商品" align="center">
          <template #default="scope">{{ formatUseType(scope.row.type) }}</template>
        </el-table-column>
        <el-table-column label="面值" width="100" align="center">
          <template #default="scope">{{ scope.row.amount }}</template>
        </el-table-column>
        <el-table-column label="适用平台" align="center">
          <template #default="scope">{{ formatPlatform(scope.row.platform) }}</template>
        </el-table-column>
        <el-table-column label="可使用商品" align="center">
          <template #default="scope">{{ formatUseType(scope.row.type) }}</template>
        </el-table-column>
        <el-table-column label="有效期" width="230" align="center">
          <template #default="scope">
            <p>开始时间：{{ formatDateTime(scope.row.startTime) }}</p>
            <p>到期时间：{{ formatDateTime(scope.row.endTime) }}</p>
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
        <el-table-column label="状态" width="100" align="center">
          <template #default="scope">
            {{ formatStatus(scope.row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button size="small"
                       type="text"
                       @click="handleView(scope.row)" class="compact-button">查看
            </el-button>
            <el-button size="small"
                       type="text"
                       @click="handleUpdate(scope.row)" class="compact-button">编辑
            </el-button>
            <el-button size="small"
                       type="text"
                       @click="handleDelete(scope.row)" class="compact-button">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
  useDeleteCoupon,
  useFetchCouponList,
  useUpdateFlashPromotionStatus
} from "@/api/marketing_api.ts";

const router = useRouter();

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  name: null,
  type: null,
  endTime: null,
  status: null,
};
const defaultTypeOptions = [
  {
    label: '全场赠券',
    value: 0
  },
  {
    label: '会员赠券',
    value: 1
  },
  {
    label: '购物赠券',
    value: 2
  },
  {
    label: '注册赠券',
    value: 3
  }
];
const typeOptions = ref(Object.assign({}, defaultTypeOptions));

const formatType = (type: number) => {
  for (let i = 0; i < defaultTypeOptions.length; i++) {
    if (type === defaultTypeOptions[i].value) {
      return defaultTypeOptions[i].label;
    }
  }
  return '';
}

const formatUseType = (useType: number) => {
  if (useType === 0) {
    return "全场通用";
  } else if (useType === 1) {
    return "指定品类";
  } else {
    return "指定商品";
  }
}

const formatPlatform = (platform: number) => {
  if (platform === 1) {
    return '移动平台';
  } else if (platform === 2) {
    return 'PC平台';
  } else {
    return '全平台';
  }
}

const formatStatus = (endTime: string) => {
  let now = new Date().getTime();
  let endDate = new Date(endTime).getTime();
  if (endDate > now) {
    return '未过期'
  } else {
    return '已过期';
  }
}
const listQuery = ref(Object.assign({}, defaultListQuery));
const list = ref(null);
const total = ref(0);
const listLoading = ref(false);
const multipleSelection = ref([]);
onMounted(() => {
  getList();
})
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
    useUpdateFlashPromotionStatus(row.id, row.status).then(() => {
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
const getList = () => {
  listLoading.value = true;
  useFetchCouponList(listQuery.value).then(response => {
    listLoading.value = false;
    list.value = response.data.list;
    total.value = Number(response.data.total);
  });
}
const handleAdd = () => {
  router.push({path: '/mms/coupon/add'})
}

const handleUpdate = (row) => {
  router.push({path: '/mms/coupon/update', query: {id: row.id}})
}

const handleDelete = (row) => {
  ElMessageBox.confirm('是否要删除该优惠券?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    useDeleteCoupon(row.id).then(() => {
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

.compact-button {
  padding: 2px 5px; /* Reduces padding to make the button smaller */
  margin: 0 2px; /* Adjusts margin between buttons */
  font-size: 12px; /* Optional: make the text smaller */
}
</style>