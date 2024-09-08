<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <el-icon>
        <Tickets style="margin-top: 5px"/>
      </el-icon>
      <span>数据列表</span>
      <el-button size="small" class="btn-add" @click="handleAdd()">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="resourceCategoryTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template #default="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template #default="scope">{{ formatDateTime(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template #default="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
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
    <el-dialog
        title="添加分类"
        v-model="dialogVisible"
        width="40%">
      <el-form :model="resourceCategory"
               ref="resourceCategoryForm"
               label-width="150px" size="small">
        <el-form-item label="名称：">
          <el-input v-model="resourceCategory.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="resourceCategory.sort" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {Tickets} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import {formatDate} from "@/utils/date.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import {
  useCreateResourceCategory,
  useDeleteResourceCategory, useListAllCate,
  useUpdateResourceCategory
} from "@/api/resouce_category.ts";
import {UmsResourceCategory} from "@/model/ums_resource_category.ts";

const defaultResourceCategory = {
  id: "",
  name: null,
  sort: 0,
};

const list = ref(null);
const listLoading = ref(false);
const dialogVisible = ref(false);
const isEdit = ref(false);
const resourceCategory = ref(Object.assign({}, defaultResourceCategory));
onMounted(() => {
  getList();
});

const formatDateTime = (time: string) => {
  if (time == null || time === '') {
    return 'N/A';
  }
  let date = new Date(time);
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
}

const handleAdd = () => {
  dialogVisible.value = true;
  isEdit.value = false;
  resourceCategory.value = Object.assign({}, defaultResourceCategory);
}

const handleUpdate = (row) => {
  dialogVisible.value = true;
  isEdit.value = true;
  resourceCategory.value = Object.assign({}, row);
}

const handleDelete = (row) => {
  ElMessageBox.confirm('是否要删除该分类?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    useDeleteResourceCategory(row.id).then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功!',
      });
    });
    getList();
  });
}

const handleDialogConfirm = () => {
  ElMessageBox.confirm('是否要确认?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    if (isEdit.value) {
      useUpdateResourceCategory(resourceCategory.value.id, resourceCategory.value as UmsResourceCategory).then(() => {
        ElMessage({
          type: 'success',
          message: '修改成功!',
        });
      });
      dialogVisible.value = false;
      getList();
    } else {
      useCreateResourceCategory(resourceCategory.value as UmsResourceCategory).then(() => {
        ElMessage({
          type: 'success',
          message: '添加成功!',
        });
        dialogVisible.value = false;
        getList();
      });
    }
  });
}

const getList = () => {
  listLoading.value = true;
  useListAllCate().then(response => {
    listLoading.value = false;
    list.value = response.data;
  })
}
</script>