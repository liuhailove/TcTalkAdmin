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
          :page-sizes="[10,15,20]"
          :total="total">
      </el-pagination>
    </div>
    <el-dialog
        :title="isEdit?'编辑渠道':'添加渠道'"
        v-model="dialogVisible"
        width="40%">
      <el-form :model="adsChannel"
               ref="resourceForm"
               label-width="150px" size="small">
        <el-form-item label="渠道名称：">
          <el-input v-model="adsChannel.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="adsChannel.remark"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
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
import {useDeleteResource} from "@/api/resource.ts";
import {useCreateChannel, useDeleteChannel, useFetchChannelList, useUpdateChannel} from "@/api/ads_api.ts";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  nameKeyword: '',
};

const defaultAdsChannel = {
  id: '',
  name: '',
  remark: '',
};

const listQuery = ref(Object.assign({}, defaultListQuery));
const adsChannel = ref(Object.assign({}, defaultAdsChannel));
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
  adsChannel.value = Object.assign({}, defaultAdsChannel);
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
  adsChannel.value = Object.assign({}, row);
}

const handleDialogConfirm = () => {
  ElMessageBox.confirm('是否要确认?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (isEdit.value) {
      useUpdateChannel(adsChannel.value.id, adsChannel.value).then(() => {
        ElMessage({
          type: 'success',
          message: '修改成功!'
        });
        dialogVisible.value = false;
        getList();
      });
    } else {
      useCreateChannel(adsChannel.value).then(() => {
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