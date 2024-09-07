<template>
  <div>
    <el-upload
        :action="useOss ? ossUploadUrl : minioUploadUrl"
        :data="useOss ? dataObj : null"
        list-type="picture"
        :multiple="false"
        :show-file-list="showFileList"
        :file-list="fileList"
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
        :on-success="handleUploadSuccess"
        :on-preview="handlePreview"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <template #tip>
        <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 10MB</div>
      </template>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img width="100%" :src="fileList[0].url" alt="">
    </el-dialog>
  </div>

</template>
<script setup lang="ts">
import {computed, ref} from "vue";
import {usePolicy} from "@/api/oss.ts";

const props = defineProps<{
  value: string
}>();

const imageUrl = computed(() => props.value);

const imageName = computed(() => {
  return props.value ? props.value.substring(props.value.lastIndexOf('/') + 1) : null;
});

const fileList = computed(() => {
  return imageUrl.value ? [{name: imageName.value, url: imageUrl.value}] : [];
});

const showFileList = computed(() => {
  return !!props.value;
});


const dataObj = ref({
  policy: '',
  signature: '',
  key: '',
  ossaccessKeyId: '',
  dir: '',
  host: '',
});

const dialogVisible = ref(false);
// 使用oss->true;使用MinIO->false
const useOss = ref(false);
const ossUploadUrl = ref('http://macro-oss.oss-cn-shenzhen.aliyuncs.com');
const minioUploadUrl = ref('/admin_api/minio/upload');

// 事件触发
const emit = defineEmits(['update:value']);

const emitInput = (val) => {
  emit('update:value', val);
};

const handleRemove = () => {
  emitInput("");
}

const handlePreview = () => {
  dialogVisible.value = true;
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

const handleUploadSuccess = (res, file) => {
  const url = useOss.value
      ? `${dataObj.value.host}/${dataObj.value.dir}/${file.name}`
      : res.data.url;
  emitInput(url);
}
</script>