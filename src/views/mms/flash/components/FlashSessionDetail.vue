<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="flashSession"
             :rules="rules"
             ref="flashSessionForm"
             label-width="150px"
             size="small">
      <el-form-item label="秒杀活动时间段名称：" prop="name">
        <el-input v-model="flashSession.name" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="每日开始时间：" prop="startTime">
        <el-time-picker
            type="datetime"
            placeholder="请选择时间"
            v-model="flashSession.startTime"
            format="HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
        ></el-time-picker>
      </el-form-item>
      <el-form-item label="每日到期时间：" prop="endTime">
        <el-time-picker
            type="datetime"
            placeholder="请选择时间"
            v-model="flashSession.endTime"
            format="HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
        ></el-time-picker>
      </el-form-item>
      <el-form-item label="上线/下线：">
        <el-radio-group v-model="flashSession.status">
          <el-radio :label="0">下线</el-radio>
          <el-radio :label="1">上线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
            class="input-width"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="flashSession.note">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";
import {
  useCreateFlashPromotionSession,
  useGetFlashPromotionSession,
  useUpdateFlashPromotionSession,
} from "@/api/marketing_api.ts";

const route = useRoute();
const router = useRouter();
const props = defineProps<{
  isEdit: Boolean
}>();
const flashSessionForm = ref(null);
const rules = ref({
  name: [
    {required: true, message: '请输入活动名称', trigger: 'blur'},
    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
  ],
  startTime: [
    {required: true, message: '请选择开始时间', trigger: 'blur'}
  ],
  endTime: [
    {required: true, message: '请选择到期时间', trigger: 'blur'}
  ],
});
const defaultFlashSession = {
  name: null,
  startTime: null,
  endTime: null,
  status: 0,
  note: null,
};
const flashSession = ref(Object.assign({}, defaultFlashSession));

onMounted(() => {
  if (props.isEdit) {
    useGetFlashPromotionSession(route.query.id as string).then(res => {
      flashSession.value = res.data;
    })
  }
})

const onSubmit = () => {
  flashSessionForm.value.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('是否提交数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        if (props.isEdit) {
          useUpdateFlashPromotionSession(route.query.id as string, flashSession.value).then(() => {
            ElMessage({
              type: 'success',
              message: '修改成功!',
              duration: 1000
            });
          });
          router.back();
        } else {
          useCreateFlashPromotionSession(flashSession.value).then(() => {
            flashSessionForm.value.resetFields();
            flashSession.value = Object.assign({}, defaultFlashSession);
            ElMessage({
              type: 'success',
              message: '提交成功!',
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
  flashSessionForm.value.resetFields();
  flashSession.value = Object.assign({}, defaultFlashSession);
}
</script>