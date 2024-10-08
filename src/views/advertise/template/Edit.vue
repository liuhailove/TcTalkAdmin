<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="adsTemplates"
             :rules="rules"
             ref="adsTemplatesFormRef"
             label-width="150px">
      <el-form-item label="模版名称：" prop="name">
        <el-input v-model="adsTemplates.name"></el-input>
      </el-form-item>
      <el-form-item label="模版Code：" prop="code">
        <el-input
            type="textarea"
            v-model="adsTemplates.code"
            placeholder="输入模版code"
            rows="5"
            maxlength="1024"
            show-word-limit
        />
      </el-form-item>
      <el-form-item label="element：" prop="element">
        <el-input v-model="adsTemplates.element"></el-input>
      </el-form-item>
      <el-form-item label="占位符：" prop="placeholders">
        <el-input
            type="textarea"
            v-model="adsTemplates.placeholders"
            placeholder="占位符描述"
            rows="5"
            maxlength="1024"
            show-word-limit
        />
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="adsTemplates.remark"></el-input>
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
import {ElMessage, ElMessageBox} from "element-plus";
import {
  useCreateTemplate,
  useGetTemplate,
  useUpdateTemplate
} from "@/api/ads_api.ts"; // 只保留基础的 ckeditor 样式

const route = useRoute();
const router = useRouter();

const defaultAdsTemplate = {
  code: '',
  name: '',
  element: '',
  placeholders: '',
  remark: '',
};
// 将 query 参数转换为布尔值并传递给 props
const isEdit = route.query.isEdit === 'true';

const rules = ref({
  name: [
    {required: true, message: '请输入模版名称', trigger: 'blur'},
    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
  ],
});

const adsTemplatesFormRef = ref(null);
const adsTemplates = ref(Object.assign({}, defaultAdsTemplate));

onMounted(() => {
  if (isEdit) {
    useGetTemplate(route.query.id as string).then(res => {
      adsTemplates.value = res.data;
    })
  } else {
    adsTemplates.value = Object.assign({}, defaultAdsTemplate);
  }
});

const onSubmit = () => {
  adsTemplatesFormRef.value.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('是否提交数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        if (isEdit) {
          useUpdateTemplate(route.query.id as string, adsTemplates.value).then(() => {
            ElMessage({
              type: 'success',
              message: '修改成功!',
              duration: 1000
            });
          });
          router.back();
        } else {
          useCreateTemplate(adsTemplates.value).then(() => {
            adsTemplatesFormRef.value.resetFields();
            adsTemplates.value = Object.assign({}, defaultAdsTemplate);
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
  adsTemplatesFormRef.value.resetFields();
  adsTemplates.value = Object.assign({}, defaultAdsTemplate);
}
</script>

<style scoped>
.form-container {
  position: absolute;
  left: 0;
  right: 0;
  width: 1400px;
  padding: 35px 35px 15px 35px;
  margin: 20px auto;
}
</style>