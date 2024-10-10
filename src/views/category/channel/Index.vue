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
          <el-form-item label="渠道名称：">
            <el-input v-model="listQuery.nameKeyword" class="input-width" placeholder="渠道名称" clearable></el-input>
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
        <el-table-column label="渠道名称" align="center">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="渠道路径" align="center">
          <template #default="scope">{{ scope.row.urlPath }}</template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template #default="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="隐藏" align="center">
          <template #default="scope">
            {{ scope.row.hidden === true ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column label="启用" align="center">
          <template #default="scope">
            {{ scope.row.enabled === true ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template #default="scope">{{ scope.row.createBy }}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template #default="scope">{{ formatDateTime(scope.row.createTime) }}</template>
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
          :page-sizes="[10,20,50,100]"
          :total="total">
      </el-pagination>
    </div>
    <el-dialog
        :title="isEdit?'编辑频道':'添加频道'"
        v-model="dialogVisible"
        width="40%">
      <el-form :model="ctChannel"
               ref="resourceForm"
               label-width="150px" size="small">
        <el-form-item label="频道名称：">
          <el-input v-model="ctChannel.name"></el-input>
        </el-form-item>
        <el-form-item label="跳转路径：">
          <el-input v-model="ctChannel.urlPath"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="ctChannel.sort"></el-input>
        </el-form-item>
        <el-form-item label="隐藏：" prop="mediaType">
          <el-radio-group v-model="ctChannel.hidden">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="启用：" prop="mediaType">
          <el-radio-group v-model="ctChannel.enabled">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="ctChannel.remark"
                    type="textarea"
                    :rows="5"></el-input>
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
import {Search} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import {formatDate} from "@/utils/date.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import {useCreateChannel, useDeleteChannel, useFetchChannelList, useUpdateChannel} from "@/api/category_api.ts";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  nameKeyword: '',
};

const defaultCtChannel = {
  id: '',
  name: '',
  urlPath: '',
  hidden: false,
  enabled: false,
  sort: 0,
  remark: '',
};

const listQuery = ref(Object.assign({}, defaultListQuery));
const ctChannel = ref(Object.assign({}, defaultCtChannel));
const list = ref(null);
const total = ref(0);
const listLoading = ref(false);
const dialogVisible = ref(false);
const isEdit = ref(false);

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
  dialogVisible.value = true;
  isEdit.value = false;
  ctChannel.value = Object.assign({}, defaultCtChannel);
}

const handleDelete = (row) => {
  ElMessageBox.confirm('是否要删除该资源?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    useDeleteChannel(row.id).then(() => {
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
  dialogVisible.value = true;
  isEdit.value = true;
  ctChannel.value = Object.assign({}, row);
}

const handleDialogConfirm = () => {
  ElMessageBox.confirm('是否要确认?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (isEdit.value) {
      useUpdateChannel(ctChannel.value.id, ctChannel.value).then(() => {
        ElMessage({
          type: 'success',
          message: '修改成功!'
        });
        dialogVisible.value = false;
        getList();
      });
    } else {
      useCreateChannel(ctChannel.value).then(() => {
        ElMessage({
          type: 'success',
          message: '添加成功!'
        });
        dialogVisible.value = false;
        getList();
      });
    }
  });
}

const getList = () => {
  listLoading.value = true;
  useFetchChannelList(listQuery.value.nameKeyword, listQuery.value.pageSize, listQuery.value.pageNum).then(res => {
    listLoading.value = false;
    list.value = res.data.list;
    total.value = Number(res.data.total);
  })
}


</script>