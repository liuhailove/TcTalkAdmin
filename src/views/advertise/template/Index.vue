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
          <el-form-item label="模版名称：">
            <el-input v-model="listQuery.templateNameKeyword" class="input-width" placeholder="模版名称"
                      clearable></el-input>
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
        <el-table-column label="模版名称" align="center" fixed="left" width="200" show-overflow-tooltip>
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="元素" align="center" width="200">
          <template #default="scope">{{ scope.row.element }}</template>
        </el-table-column>
        <el-table-column label="占位符说明" align="center">
          <template #default="scope">{{ scope.row.placeholders }}</template>
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
  useDeleteTemplate,
  useFetchTemplateList,
} from "@/api/ads_api.ts";
import {useRouter} from "vue-router";

const router = useRouter();

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  templateNameKeyword: '',
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
  router.push({path: '/advertise/addTemplate', query: {isEdit: 'false'}});
}

const handleDelete = (row) => {
  ElMessageBox.confirm('是否要删除该广告模版?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    useDeleteTemplate(row.id).then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功!'
      });
      getList();
    })
  });
}

const handleUpdate = (row) => {
  router.push({path: '/advertise/editTemplate', query: {id: row.id, isEdit: 'true'}});
}

const getList = () => {
  listLoading.value = true;
  useFetchTemplateList(listQuery.value.templateNameKeyword, listQuery.value.pageSize, listQuery.value.pageNum).then(res => {
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