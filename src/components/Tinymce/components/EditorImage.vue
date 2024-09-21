<template>
  <div class="upload-container">
    <el-button icon="el-icon-upload" size="small" :style="{background:color,borderColor:color}"
               @click="dialogVisible=true" type="primary">上传图片
    </el-button>
    <el-dialog append-to-body v-model="dialogVisible">
      <el-upload class="editor-slide-upload"
                 :action="useOss?ossUploadUrl:minioUploadUrl"
                 :data="useOss?dataObj:null"
                 :multiple="true"
                 :file-list="fileList"
                 :show-file-list="true"
                 list-type="picture-card"
                 :on-remove="handleRemove"
                 :on-success="handleSuccess"
                 :before-upload="beforeUpload">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </el-dialog>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container .editor-slide-upload {
  margin-bottom: 20px;
}
</style>
<script setup lang="ts">
import {ref} from "vue";
import {ElMessage} from "element-plus";
import {usePolicy} from "@/api/oss.ts";

withDefaults(defineProps<{
  color: string;
}>(), {
  color: '#1890ff',
});
const dialogVisible = ref(false);
const listObj = ref({});
const fileList = ref([]);
const dataObj = ref({
  policy: '',
  signature: '',
  key: '',
  ossaccessKeyId: '',
  dir: '',
  host: '',
});
// 使用oss->true;使用MinIO->false
const useOss = ref(false);
const ossUploadUrl = ref('http://macro-oss.oss-cn-shenzhen.aliyuncs.com');
const minioUploadUrl = ref('/admin_api/minio/upload');
const checkAllSuccess = () => {
  return Object.keys(listObj.value).every(item => listObj.value[item].hasSuccess);
}
const handleSubmit = () => {
  const arr = Object.keys(listObj.value).map(v => listObj.value[v]);
  if (!checkAllSuccess()) {
    ElMessage({
      type: 'success',
      message: '请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！!',
      duration: 1000,
    });
    return;
  }
  // TODO
  listObj.value = {};
  fileList.value = [];
  dialogVisible.value = false;
}
const handleSuccess = (response, file) => {
  const uid = file.uid;
  const objKeyArr = Object.keys(listObj.value);
  for (let i = 0; i < objKeyArr.length; i++) {
    if (listObj.value[objKeyArr[i]].uid === uid) {
      listObj.value[objKeyArr[i]].uid = dataObj.value.host + "/" + dataObj.value.dir + "/" + file.name;
      if (!useOss.value) {
        // 不使用oss直接获取图片路径
        listObj.value[objKeyArr[i]].url = response.data.url;
      }
      listObj.value[objKeyArr[i]].hasSuccess = true;
      return;
    }
  }
}

const handleRemove = (file) => {
  const uid = file.uid;
  const objKeyArr = Object.keys(listObj.value);
  for (let i = 0; i < objKeyArr.length; i++) {
    if (listObj.value[objKeyArr[i]].uid === uid) {
      delete listObj.value[objKeyArr[i]];
      return;
    }
  }
}
const beforeUpload = async () => {
  if (!useOss.value) {
    // 不使用oss不需要获取策略
    return true;
  }
  try {
    const response = await usePolicy();
    dataObj.value.policy = response.data.policy;
    dataObj.value.signature = response.data.signature;
    dataObj.value.ossaccessKeyId = response.data.accessKeyId;
    dataObj.value.key = `${response.data.dir}/\${filename}`;
    dataObj.value.dir = response.data.dir;
    dataObj.value.host = response.data.host;
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
</script>