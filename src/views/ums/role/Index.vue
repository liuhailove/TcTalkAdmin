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
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="角色名称" clearable></el-input>
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
      <el-table ref="roleTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="80" align="center">
          <template #default="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="角色名称" align="center">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template #default="scope">{{ scope.row.description }}</template>
        </el-table-column>
        <el-table-column label="用户数" width="100" align="center">
          <template #default="scope">{{ scope.row.adminCount }}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template #default="scope">{{ formatDateTime(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template #default="scope">
            <el-switch
                @change="handleStatusChange(scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" align="center">
          <template #default="scope">
            <el-button-group>

              <el-button size="small"
                         type="text"
                         @click="handleSelectMenu(scope.row)">分配菜单
              </el-button>
              <el-button size="small"
                         type="text"
                         @click="handleSelectResource(scope.row)">分配资源
              </el-button>
              <el-button size="small"
                         type="text"
                         @click="handleUpdate(scope.row)">
                编辑
              </el-button>
              <el-button size="small"
                         type="text"
                         @click="handleDelete(scope.row)">删除
              </el-button>
            </el-button-group>
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
          :page-sizes="[5,10,15]"
          :total="total">
      </el-pagination>
    </div>
    <el-dialog
        :title="isEdit?'编辑角色':'添加角色'"
        v-model="dialogVisible"
        width="40%">
      <el-form :model="role"
               ref="roleForm"
               label-width="150px" size="small">
        <el-form-item label="角色名称：">
          <el-input v-model="role.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="role.description"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="role.status">
            <el-radio :value="1">是</el-radio>
            <el-radio :value="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </template>
    </el-dialog>


  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {formatDate} from "@/utils/date.ts";
import {ElMessageBox, ElMessage} from 'element-plus';
import {
  useCreateRole,
  useDeleteRole,
  useFetchAllRoleList,
  useFetchList,
  useUpdateRole,
  useUpdateStatus
} from "@/api/role.ts";
import {Search} from "@element-plus/icons-vue";
import {UmsRole} from "@/model/ums_role.ts";
import {useRouter} from "vue-router";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: '',
};
const defaultRole = {
  id: "",
  parentId: "",
  createTime: "",
  title: "",
  level: 0,
  sort: 0,
  name: "",
  icon: "",
  hidden: 0,
  description: "",
  adminCount: 0,
  status: 1,
};

const listQuery = ref(Object.assign({}, defaultListQuery));
const list = ref(null);
const total = ref(0); // 将 total 的初始值设置为 0
const listLoading = ref(false);
const dialogVisible = ref(false);
const role = ref(Object.assign({}, defaultRole));
const isEdit = ref(false);
const allRoleList = ref([]);
const router = useRouter()

const handleAdd = () => {
  dialogVisible.value = true;
  isEdit.value = false;
  role.value = Object.assign({}, defaultRole);
}

const getList = () => {
  listLoading.value = true;
  useFetchList(listQuery.value.keyword, listQuery.value.pageSize, listQuery.value.pageNum).then(response => {
    list.value = response.data.list;
    total.value = Number(response.data.total);
    listLoading.value = false;
  });
}

const formatDateTime = (time: string) => {
  if (time == null || time === '') {
    return 'N/A';
  }
  let date = new Date(time);
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
}

const handleStatusChange = (row) => {
  ElMessageBox.confirm('是否要修改该状态?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    useUpdateStatus(row.id, row.status).then(() => {
      ElMessage({
        type: 'success',
        message: '修改成功!',
      });
    });
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消修改',
    });
    getList();
  });
}

const handleSizeChange = (val: number) => {
  listQuery.value.pageSize = val;
  listQuery.value.pageNum = 1;
  getList();
}

const handleCurrentChange = (val: number) => {
  listQuery.value.pageNum = val;
  getList();
}

const getAllRoleList = () => {
  useFetchAllRoleList().then(response => {
    allRoleList.value = response.data;
  });
}

const handleUpdate = (row) => {
  dialogVisible.value = true;
  isEdit.value = true;
  role.value = Object.assign({}, row);
}

const handleDialogConfirm = () => {
  ElMessageBox.confirm('是否要确认?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (isEdit.value) {
      useUpdateRole(role.value.id, role.value as UmsRole).then(() => {
        ElMessage({
          message: '修改成功！',
          type: 'success'
        });
        dialogVisible.value = false;
        getList();
      })
    } else {
      useCreateRole(role.value as UmsRole).then(() => {
        ElMessage({
          message: '添加成功！',
          type: 'success'
        });
        dialogVisible.value = false;
        getList();
      });
    }
  });
}

const handleSearchList = () => {
  listQuery.value.pageNum = 1;
  getList();
}

const handleDelete = (row) => {
  ElMessageBox.confirm('是否要删除该角色?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    let ids = [];
    ids.push(row.id);
    useDeleteRole(ids).then(() => {
      ElMessage({
        message: '删除成功！',
        type: 'success'
      });
      getList();
    })
  });
}

const handleResetSearch = () => {
  listQuery.value = Object.assign({}, defaultListQuery);
}

const handleSelectMenu = (row) => {
  router.push({path: '/ums/allocMenu', query: {roleId: row.id}})
}

const handleSelectResource = (row) => {
  router.push({path: '/ums/allocResource', query: {roleId: row.id}})
}

onMounted(() => {
  getList();
  getAllRoleList();
});

</script>
