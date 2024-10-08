<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
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
            <el-input v-model="listQuery.adsNameKeyword" class="input-width" placeholder="槽位名称"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="广告主名称：">
            <el-input v-model="listQuery.advertiser" class="input-width" placeholder="频道名称"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="启用：">
            <el-radio-group v-model="listQuery.enabled">
              <el-radio :label="''">全部</el-radio>
              <el-radio :label="'1'">是</el-radio>
              <el-radio :label="'0'">否</el-radio>
            </el-radio-group>
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
      <el-table ref="resourceTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="80" align="center" fixed="left">
          <template #default="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="广告名称" align="center" fixed="left" width="200" show-overflow-tooltip>
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="广告主" align="center" width="200">
          <template #default="scope">{{ scope.row.advertiser }}</template>
        </el-table-column>
        <el-table-column label="尺寸类型" align="center" width="100">
          <template #default="scope">{{ scope.row.sizeTypeName }}</template>
        </el-table-column>
        <el-table-column label="点击链接" align="center">
          <template #default="scope">{{ scope.row.clickUrl }}</template>
        </el-table-column>
        <el-table-column label="启用" align="center" width="80">
          <template #default="scope">
            {{ scope.row.enabled === 1 ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template #default="scope">{{ scope.row.createBy }}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template #default="scope">{{ formatDateTime(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center" fixed="right">
          <template #default="scope">
            <el-button size="small"
                       type="text"
                       @click="handleUpdate(scope.row)">
              编辑
            </el-button>
            <el-button size="small"
                       type="text"
                       @click="handleDelete(scope.row)">删除
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
          :current-page.sync="listQuery.pageNum"
          :page-size="listQuery.pageSize"
          :page-sizes="[10,15,20]"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script setup lang="ts">
import {Search} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import {formatDate} from "@/utils/date.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import {
  useDeleteAd,
  useFetchAdList,
} from "@/api/ads_api.ts";
import {useRouter} from "vue-router";

const router = useRouter();

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  adsNameKeyword: '',
  advertiser: '',
  enabled: '',
};

const listQuery = ref(Object.assign({}, defaultListQuery));
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
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
}

const handleResetSearch = () => {
  listQuery.value = Object.assign({}, defaultListQuery);
}

const handleSearchList = () => {
  listQuery.value.pageNum = 1;
  getList();
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

const handleAdd = () => {
  router.push({path: '/advertise/addAds', query: {isEdit: 'false'}});
}

const handleDelete = (row) => {
  ElMessageBox.confirm('是否要删除该广告?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    useDeleteAd(row.id).then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功!'
      });
      getList();
    })
  });
}

const handleUpdate = (row) => {
  router.push({path: '/advertise/editAds', query: {id: row.id, isEdit: 'true'}});
}

const getList = () => {
  listLoading.value = true;
  useFetchAdList(listQuery.value.adsNameKeyword, listQuery.value.pageSize, listQuery.value.pageNum).then(res => {
    listLoading.value = false;
    list.value = res.data.list;
    total.value = Number(res.data.total);
  })
}


</script>
<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto; /* 启用水平滚动 */
}
</style>