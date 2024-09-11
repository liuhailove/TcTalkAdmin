<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="slot"
             :rules="rules"
             ref="slotFormRef"
             label-width="150px">
      <el-form-item label="槽位名称：" prop="slotName">
        <el-input v-model="slot.slotName"></el-input>
      </el-form-item>
      <el-form-item label="频道列表：">
        <el-select v-model="slot.channelId"
                   placeholder="请选择菜单">
          <el-option
              v-for="item in selectChannelList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="尺寸列表：">
        <el-select v-model="slot.sizeType"
                   placeholder="请选择尺寸"
                   @change="handleSizeChange"
        >
          <el-option
              v-for="item in selectSizeTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
        <div class="table-layout">
          <el-row>
            <el-col :span="6" class="table-cell-title">宽（px）</el-col>
            <el-col :span="6" class="table-cell-title">高（px）</el-col>
            <el-col :span="6" class="table-cell-title">文件类型</el-col>
            <el-col :span="6" class="table-cell-title">文件最大KB</el-col>
          </el-row>
          <el-row>
            <!-- 根据选中的 item 展示信息 -->
            <el-col :span="6" class="table-cell">{{ selectedSizeType?.width || '-' }}</el-col>
            <el-col :span="6" class="table-cell">{{ selectedSizeType?.height || '-' }}</el-col>
            <el-col :span="6" class="table-cell">{{ selectedSizeType?.fileTypes || '-' }}</el-col>
            <el-col :span="6" class="table-cell">{{ selectedSizeType?.fileMax || '-' }}</el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item label="媒体类型：">
        <el-radio-group v-model="slot.mediaType">
          <el-radio :label="'app'">APP</el-radio>
          <el-radio :label="'pc'">PC</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否启用：">
        <el-radio-group v-model="slot.enabled">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="'pc'">PC</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useCreateMenu, useUpdateMenu} from "@/api/menu.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import {UmsMenu} from "@/model/ums_menu.ts";
import {useFetchChannelList, useFetchSizeTypeList, useGetSlot} from "@/api/ads_api.ts";

const route = useRoute();
const router = useRouter();

const defaultSlot = {
  id: '',
  slotName: '',
  channelId: '',
  channelName: '',
  mediaType: 'app',
  sizeType: '',
  sizeTypeName: '',
  width: null,
  height: null,
  fileTypes: '',
  fileMax: null,
  positionDesc: '',
  alignH: null,
  alignV: '',
  marginV: null,
  stayTime: null,
  scrolled: 0,
  closable: 0,
  scheduleMode: null,
  adCount: null,
  rotateInterval: null,
  dayTimes: null,
  enabled: 1,
  remark: '',
};

const props = defineProps<{
  isEdit: boolean
}>();

// 将 query 参数转换为布尔值并传递给 props
const isEdit = route.query.isEdit === 'true';

const slot = ref(Object.assign({}, defaultSlot));

const selectChannelList = ref([]);

const selectSizeTypeList = ref([]);

const slotFormRef = ref(null);

const rules = ref({
  slotName: [
    {required: true, message: '请输入槽位名称', trigger: 'blur'},
    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
  ],
});

// 保存选中的尺寸类型的详细信息
const selectedSizeType = ref(null);

// 当用户选择了尺寸时，更新 selectedSizeType
const handleSizeChange = (id) => {
  selectedSizeType.value = selectSizeTypeList.value.find(item => item.id === id) || null;
};

onMounted(() => {
  if (props.isEdit) {
    useGetSlot(route.query.id as string).then(res => {
      slot.value = res.data;
    })
  } else {
    slot.value = Object.assign({}, defaultSlot);
  }
  getSelectChannelList();
  getSelectSizeTypeList();
});

const getSelectChannelList = () => {
  useFetchChannelList("", 100, 1).then((res) => {
    selectChannelList.value = res.data.list;
  });
}

const getSelectSizeTypeList = () => {
  useFetchSizeTypeList("", 100, 1).then((res) => {
    selectSizeTypeList.value = res.data.list;
  });
}

const onSubmit = () => {
  slotFormRef.value.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('是否提交数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        if (props.isEdit) {
          useUpdateMenu(route.query.id as string, menu.value as UmsMenu).then(() => {
            ElMessage({
              type: 'success',
              message: '修改成功!',
              duration: 1000
            });
          });
          router.back();
        } else {
          useCreateMenu(menu.value as UmsMenu).then(() => {
            menuFromRef.value.resetFields();
            menu.value = Object.assign({}, defaultMenu);
            getSelectMenuList();
            ElMessage({
              type: 'success',
              message: '修改成功!',
              duration: 1000
            });
            router.back();
          });
        }
      });
    } else {
      ElMessage({
        type: 'error',
        message: '验证失败!',
        duration: 1000
      });
    }
  });
}

const resetForm = () => {

}
</script>
<style scoped>
.table-layout {
  margin-top: 20px;
  border-left: 1px solid #DCDFE6;
  border-top: 1px solid #DCDFE6;
  width: 100%;
}

.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}

.table-cell-title {
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
  padding: 10px;
  background: #F2F6FC;
  text-align: center;
  font-size: 14px;
  color: #303133;
}

</style>