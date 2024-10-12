<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="flashPromotion"
             :rules="rules"
             ref="flashPromotionForm"
             label-width="150px"
             size="small">
      <el-form-item label="活动名称：" prop="name">
        <el-input v-model="flashPromotion.name" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="开始时间：" prop="startTime">
        <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="flashPromotion.startTime"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="到期时间：" prop="endTime">
        <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="flashPromotion.endTime"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="上线/下线：">
        <el-radio-group v-model="flashPromotion.status">
          <el-radio :label="0">下线</el-radio>
          <el-radio :label="1">上线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动备注：">
        <el-input
            class="input-width"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="flashPromotion.note">
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
  useCreateFlashPromotion,
  useGetFlashPromotion, useUpdateFlashPromotion,
} from "@/api/marketing_api.ts";

const route = useRoute();
const router = useRouter();
const props = defineProps<{
  isEdit: Boolean
}>();
const flashPromotionForm = ref(null);
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
const defaultFlashPromotion = {
  name: null,
  startTime: null,
  endTime: null,
  status: 0,
  note: null,
};
const flashPromotion = ref(Object.assign({}, defaultFlashPromotion));

onMounted(() => {
  if (props.isEdit) {
    useGetFlashPromotion(route.query.id as string).then(res => {
      flashPromotion.value = res.data;
    })
  }
})

const onSubmit = () => {
  flashPromotionForm.value.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('是否提交数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        if (props.isEdit) {
          useUpdateFlashPromotion(route.query.id as string, flashPromotion.value).then(() => {
            ElMessage({
              type: 'success',
              message: '修改成功!',
              duration: 1000
            });
          });
          router.back();
        } else {
          useCreateFlashPromotion(flashPromotion.value).then(() => {
            flashPromotionForm.value.resetFields();
            flashPromotion.value = Object.assign({}, defaultFlashPromotion);
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
  flashPromotionForm.value.resetFields();
  flashPromotion.value = Object.assign({}, defaultFlashPromotion);
}
</script>