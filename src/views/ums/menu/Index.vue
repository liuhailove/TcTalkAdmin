<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <el-icon>
        <Tickets style="margin-top: 5px"/>
      </el-icon>
      <span style="margin-top: 5px">数据列表</span>
      <el-button
          class="btn-add"
          @click="handleAddMenu"
          size="small">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="menuTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template #default="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="菜单名称" align="center">
          <template #default="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column label="菜单级数" width="100" align="center">
          <template #default="scope">{{ levelFilter(scope.row.level) }}</template>
        </el-table-column>
        <el-table-column label="前端名称" align="center">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="前端图标" width="100" align="center">
          <template #default="scope">
            <svg-icon :icon-class="scope.row.icon"></svg-icon>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template #default="scope">
            <el-switch
                @change="handleHiddenChange(scope.row)"
                :active-value="0"
                :inactive-value="1"
                v-model="scope.row.hidden">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template #default="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="设置" width="120" align="center">
          <template #default="scope">
            <el-button
                size="small"
                type="text"
                :disabled="disableNextLevel(scope.row.level) "
                @click="handleShowNextLevel(scope.row)">查看下级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template #default="scope">
            <el-button
                size="small"
                type="text"
                @click="handleUpdate(scope.row)">编辑
            </el-button>
            <el-button
                size="small"
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
          :page-size="listQuery.pageSize"
          :page-sizes="[10,20,50]"
          :current-page.sync="listQuery.pageNum"
          :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script setup lang="ts">
import {Tickets} from "@element-plus/icons-vue";
import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useDeleteMenu, useFetchList, useUpdateHidden} from "@/api/menu.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import SvgIcon from "@/components/SvgIcon/Index.vue";

const route = useRoute();
const router = useRouter();
const list = ref(null);
const total = ref(null);
const listLoading = ref(true);
const listQuery = {
  pageNum: 1,
  pageSize: 10
};
const parentId = ref("0");

onMounted(() => {
  resetParentId();
  getList();
})

const resetParentId = () => {
  listQuery.pageNum = 1;
  if (route.query.parentId != null) {
    parentId.value = <string>route.query.parentId;
  } else {
    parentId.value = "0";
  }
}

const handleAddMenu = () => {
  router.push('/ums/addMenu');
}

const getList = () => {
  listLoading.value = true;
  useFetchList(parentId.value, listQuery).then(response => {
    listLoading.value = false;
    list.value = response.data.list;
    total.value = Number(response.data.total);
  })
}

const handleSizeChange = (val: number) => {
  listQuery.pageNum = 1;
  listQuery.pageSize = val;
  getList();
}

const handleCurrentChange = (val: number) => {
  listQuery.pageNum = val;
  getList();
}

const handleHiddenChange = (row) => {
  useUpdateHidden(row.id, row.hidden).then(() => {
    ElMessage({
      type: 'success',
      message: '修改成功!',
      duration: 1000,
    });
  })
}

const handleShowNextLevel = (row) => {
  router.push({path: '/ums/menu', query: {parentId: row.id}});
}

const handleUpdate = (row) => {
  router.push({path: '/ums/updateMenu', query: {id: row.id}});
}

const handleDelete = (row) => {
  ElMessageBox.confirm('是否要删除该菜单?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    useDeleteMenu(row.id).then(() => {
      ElMessage({
        message: '删除成功！',
        type: 'success',
        duration: 1000
      });
      getList();
    })
  });
}

const levelFilter = (value) => {
  if (value === 0) {
    return '一级';
  } else if (value === 1) {
    return '二级';
  }
}

const disableNextLevel = (value) => {
  return (value !== 0);
}

// 监听路由的变化，当查询参数发生变化时重新加载数据
watch(
    () => route.query.parentId,  // 监听 parentId 的变化
    (newParentId, oldParentId) => {
      if (newParentId !== oldParentId) {
        // 查询参数改变时，重新加载数据
        resetParentId();
        getList();
      }
    }
);
</script>