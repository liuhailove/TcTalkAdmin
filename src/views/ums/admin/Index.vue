<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <!-- 使用 el-icon 和 i 标签来引入图标 -->
        <el-icon>
          <Search/>
        </el-icon>
        <span>筛选搜索</span>
        <el-button
            style="float: right"
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
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="账号/姓名" clearable></el-input>
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
      <el-table ref="adminTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading"
                border
                stripe
                table-layout="fixed"
                :header-cell-style="{
                  background: '#f5f7fa',
                  color: '#606266',
                  fontSize: '12px',
                }"
      >
        <el-table-column label="编号" width="80" align="center">
          <template #default="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="帐号" align="center">
          <template #default="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template #default="scope">{{ scope.row.nickName }}</template>
        </el-table-column>
        <el-table-column label="邮箱" align="center">
          <template #default="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template #default="scope">{{ formatDateTime(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column label="最后登录" width="160" align="center">
          <template #default="scope">{{ formatDateTime(scope.row.loginTime) }}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="80" align="center">
          <template #default="scope">
            <el-switch
                @change="handleStatusChange(scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button size="default"
                       type="text"
                       @click="handleSelectRole(scope.row)">分配角色
            </el-button>
            <el-button size="default"
                       type="text"
                       @click="handleUpdate(scope.row)">
              编辑
            </el-button>
            <el-button size="default"
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
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :current-page.sync="listQuery.pageNum"
          :page-size="listQuery.pageSize"
          :page-sizes="[10,15,20]"
          :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
        :title="isEdit?'编辑用户':'添加用户'"
        v-model="dialogVisible"
        width="40%">
      <el-form :model="admin"
               ref="adminForm"
               label-width="150px" size="small">
        <el-form-item label="帐号：">
          <el-input v-model="admin.username" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="admin.nickName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="admin.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="admin.password" type="password" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="admin.note"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="admin.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </template>
    </el-dialog>
    <el-dialog
        title="分配角色"
        v-model="allocDialogVisible"
        width="30%">
      <el-select v-model="allocRoleIds" multiple placeholder="请选择" size="small" style="width: 80%">
        <el-option
            v-for="item in allRoleList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      <template #footer class="dialog-footer">
        <el-button @click="allocDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleAllocDialogConfirm()" size="small">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {
  useAllocRole, useCreateAdmin,
  useDeleteAdmin,
  useFetchList,
  useGetRoleByAdminId,
  useUpdateAdmin,
  useUpdateStatus
} from "@/api/login.ts";
import {formatDate} from "@/utils/date.ts";
import {ElMessageBox, ElMessage} from 'element-plus';
import {useFetchAllRoleList} from "@/api/role.ts";
import {UsmAdmin} from "@/model/ums_admin.ts";
import {Search} from "@element-plus/icons-vue";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null,
};
const defaultAdmin = {
  id: null,
  username: null,
  password: null,
  nickName: null,
  status: 1,
  note: '',
  email: '',
};

const listQuery = ref(Object.assign({}, defaultListQuery));
const list = ref(null);
const total = ref(0); // 将 total 的初始值设置为 0
const listLoading = ref(false);
const dialogVisible = ref(false);
const admin = ref(Object.assign({}, defaultAdmin));
const isEdit = ref(false);
const allocDialogVisible = ref(false);
const allocRoleIds = ref([]);
const allRoleList = ref([]);
const allocAdminId = ref(null);

const handleAdd = () => {
  dialogVisible.value = true;
  isEdit.value = false;
  admin.value = Object.assign({}, defaultAdmin);
}

const getList = () => {
  listLoading.value = true;
  useFetchList(listQuery.value).then(response => {
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
    useUpdateStatus(row.id, {status: row.status}).then(() => {
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

const handleAllocDialogConfirm = () => {
  ElMessageBox.confirm('是否要确认?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    useAllocRole(allocAdminId.value,
        allocRoleIds.value,
    ).then(() => {
      ElMessage({
        message: '分配成功！',
        type: 'success'
      });
      allocDialogVisible.value = false;
    });
  });
}

const handleSelectRole = (row) => {
  allocAdminId.value = row.id;
  allocDialogVisible.value = true;
  useGetRoleByAdminId(row.id);
}

const getAllRoleList = () => {
  useFetchAllRoleList().then(response => {
    allRoleList.value = response.data;
  });
}

const handleUpdate = (row) => {
  dialogVisible.value = true;
  isEdit.value = true;
  admin.value = Object.assign({}, row);
}

const handleDialogConfirm = () => {
  ElMessageBox.confirm('是否要确认?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (isEdit.value) {
      useUpdateAdmin(admin.value.id, admin.value as UsmAdmin).then(() => {
        ElMessage({
          message: '修改成功！',
          type: 'success'
        });
        dialogVisible.value = false;
        getList();
      })
    } else {
      useCreateAdmin(admin.value as UsmAdmin).then(() => {
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
  ElMessageBox.confirm('是否要删除该用户?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    useDeleteAdmin(row.id).then(() => {
      ElMessage({
        message: '删除成功！',
        type: 'success'
      });
      dialogVisible.value = false;
      getList();
    })
  });
}

const handleResetSearch = () => {
  listQuery.value = Object.assign({}, defaultListQuery);
}

onMounted(() => {
  getList();
  getAllRoleList();
});

</script>

<style scoped>
.app-container {
  padding: 20px;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}


</style>