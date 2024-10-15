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
          <el-form-item label="分类名称：">
            <el-input v-model="listQuery.nameKeyword" class="input-width" placeholder="分类名称" clearable></el-input>
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
        <el-table-column label="编号" width="180" align="center">
          <template #default="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="分类名称" align="center">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="频道名称" align="center">
          <template #default="scope">{{ scope.row.channelName }}</template>
        </el-table-column>
        <el-table-column label="级别" width="100" align="center">
          <template #default="scope">{{ levelFilter(scope.row.level) }}</template>
        </el-table-column>
        <el-table-column label="作品数量" width="100" align="center">
          <template #default="scope">{{ scope.row.workCount }}</template>
        </el-table-column>
        <el-table-column label="导航栏" width="100" align="center">
          <template #default="scope">
            <el-switch
                @change="handleNavStatusChange(scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.navStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template #default="scope">
            <el-switch
                @change="handleShowStatusChange(scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.showStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template #default="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="设置" width="200" align="center">
          <template #default="scope">
            <el-button
                size="small"
                :disabled="disableNextLevel(scope.row.level)"
                @click="handleShowNextLevel(scope.row)">查看下级
            </el-button>
            <el-button
                size="small"
                @click="handleTransferProduct(scope.row)">转移作品
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
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
import {useDeleteCategory, useFetchCategoryList} from "@/api/category_api.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter();
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  nameKeyword: '',
  parentId: 0,
};
const listQuery = ref(Object.assign({}, defaultListQuery));
const list = ref(null);
const total = ref(0);
const listLoading = ref(false);
const dialogVisible = ref(false);
const isEdit = ref(false);

onMounted(() => {
  getList();
})

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
  router.push({path: '/ct/ctCategory/add'})
}

const handleDelete = (row) => {
  ElMessageBox.confirm('是否要删除该品类?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    useDeleteCategory(row.id).then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功!'
      });
      dialogVisible.value = false;
      getList();
    })
  });
}

const handleUpdate = (row) => {
}

const levelFilter = (value) => {
  if (value === 0) {
    return '一级';
  } else if (value === 1) {
    return '二级';
  }
}

const disableNextLevel = (value) => {
  return value !== 0;
}
const getList = () => {
  listLoading.value = true;
  useFetchCategoryList(listQuery.value.parentId, listQuery.value.nameKeyword, listQuery.value.pageSize, listQuery.value.pageNum).then(res => {
    listLoading.value = false;
    list.value = res.data.list;
    total.value = Number(res.data.total);
  })
}


</script>