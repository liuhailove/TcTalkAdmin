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
          <el-form-item label="槽位名称：">
            <el-input v-model="listQuery.slotNameKeyword" class="input-width" placeholder="槽位名称"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="频道名称：">
            <el-input v-model="listQuery.channelNameKeyword" class="input-width" placeholder="频道名称"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="媒体类型：">
            <el-input v-model="listQuery.channelNameKeyword" class="input-width" placeholder="频道名称"
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
        <el-table-column label="槽位名称" align="center" fixed="left" width="200" show-overflow-tooltip>
          <template #default="scope">{{ scope.row.slotName }}</template>
        </el-table-column>
        <el-table-column label="频道名称" align="center" width="200">
          <template #default="scope">{{ scope.row.channelName }}</template>
        </el-table-column>
        <el-table-column label="媒体类型" align="center" width="100">
          <template #default="scope">{{ scope.row.mediaType }}</template>
        </el-table-column>
        <el-table-column label="停留时间(s)" align="center" width="100">
          <template #default="scope">{{ scope.row.stayTime }}</template>
        </el-table-column>
        <el-table-column label="跟随滚动" align="center" width="100">
          <template #default="scope">{{ scope.row.scrolled }}</template>
        </el-table-column>
        <el-table-column label="可关闭" align="center" width="80">
          <template #default="scope">{{ scope.row.closable }}</template>
        </el-table-column>
        <el-table-column label="调度方式" align="center" width="100">
          <template #default="scope">{{ scope.row.scheduleMode }}</template>
        </el-table-column>
        <el-table-column label="展示广告数" align="center" width="100">
          <template #default="scope">{{ scope.row.adCount }}</template>
        </el-table-column>
        <el-table-column label="轮换间隔(s)" align="center" width="100">
          <template #default="scope">{{ scope.row.adCount }}</template>
        </el-table-column>
        <el-table-column label="日展示次数" align="center" width="100">
          <template #default="scope">{{ scope.row.dayTimes }}</template>
        </el-table-column>
        <el-table-column label="启用" align="center" width="80">
          <template #default="scope">{{ scope.row.enabled }}</template>
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
    <el-dialog
        :title="isEdit?'编辑':'添加'"
        v-model="dialogVisible"
        width="40%">
      <el-form :model="adsSizeType"
               ref="resourceForm"
               label-width="150px" size="small">
        <el-form-item label="类型名称：">
          <el-input v-model="adsSizeType.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="宽：">
          <el-input v-model="adsSizeType.width" placeholder="只能输入正整数" style="width: 250px">
            <template v-slot:append>px</template>
          </el-input>
        </el-form-item>
        <el-form-item label="高：">
          <el-input v-model="adsSizeType.height" placeholder="只能输入正整数" style="width: 250px">
            <template v-slot:append>px</template>
          </el-input>
        </el-form-item>
        <el-form-item label="文件类型：">
          <el-select v-model="adsSizeType.fileTypesArray" multiple placeholder="请选择" style="width: 250px">
            <el-option
                v-for="item in fileTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文件最大：">
          <el-input v-model="adsSizeType.fileMax" placeholder="只能输入正整数" style="width: 250px">
            <template v-slot:append>KB</template>
          </el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="adsSizeType.remark"
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
import {
  useCreateSizeType,
  useDeleteSizeType,
  useFetchSizeTypeList, useFetchSlotList,
  useUpdateSizeType
} from "@/api/ads_api.ts";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  nameKeyword: '',
};

const defaultAdsSizeType = {
  id: '',
  name: '',
  width: null,
  height: null,
  fileTypes: '',
  fileTypesArray: [],
  fileMax: null,
  remark: '',
};

const listQuery = ref(Object.assign({}, defaultListQuery));
const adsSizeType = ref(Object.assign({}, defaultAdsSizeType));
const list = ref(null);
const total = ref(0);
const listLoading = ref(false);
const dialogVisible = ref(false);
const isEdit = ref(false);

// gif、jpg、swf
const fileTypes = ref([
  {value: 'gif', label: 'gif'},
  {value: 'jpg', label: 'jpg'},
  {value: 'swf', label: 'swf'},
  {value: 'png', label: 'png'},
]);

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
  adsSizeType.value = Object.assign({}, defaultAdsSizeType);
}

const handleDelete = (row) => {
  ElMessageBox.confirm('是否要删除该广告类型?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    useDeleteSizeType(row.id).then(() => {
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
  if (row.fileTypes !== null && row.fileTypes !== '') {
    row.fileTypesArray = row.fileTypes.split(',');
  }
  adsSizeType.value = Object.assign({}, row);
}

const handleDialogConfirm = () => {
  ElMessageBox.confirm('是否要确认?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (adsSizeType.value.fileTypesArray.length > 0) {
      adsSizeType.value.fileTypes = adsSizeType.value.fileTypesArray.join(",");
    }
    if (isEdit.value) {
      useUpdateSizeType(adsSizeType.value.id, adsSizeType.value).then(() => {
        ElMessage({
          type: 'success',
          message: '修改成功!'
        });
        dialogVisible.value = false;
        getList();
      });
    } else {
      useCreateSizeType(adsSizeType.value).then(() => {
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
  useFetchSlotList(listQuery.value.nameKeyword, listQuery.value.pageSize, listQuery.value.pageNum).then(res => {
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