<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="homeAdvertise"
             :rules="rules"
             ref="homeAdvertiseFrom"
             label-width="150px"
             size="small">
      <el-form-item label="广告名称：" prop="name">
        <el-input v-model="homeAdvertise.name" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="广告位置：">
        <el-select v-model="homeAdvertise.type" class="input-width">>
          <el-option
              v-for="type in typeOptions"
              :key="type.value"
              :label="type.label"
              :value="type.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间：" prop="startTime">
        <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="homeAdvertise.startTime"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到期时间：" prop="endTime">
        <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="homeAdvertise.endTime"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="上线/下线：">
        <el-radio-group v-model="homeAdvertise.status">
          <el-radio value="0">下线</el-radio>
          <el-radio value="1">上线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告图片：">
        <single-upload v-model:value="homeAdvertise.pic"></single-upload>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="homeAdvertise.sort" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="广告链接：" prop="url">
        <el-input v-model="homeAdvertise.url" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="广告备注：">
        <el-input
            class="input-width"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="homeAdvertise.note">
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
import SingleUpload from "@/components/Upload/SingleUpload.vue";
import {onMounted, ref} from "vue";
import {useCreateHomeAdvertise, useGetHomeAdvertise, useUpdateHomeAdvertise} from "@/api/home_advertise.ts";
import {useRoute, useRouter} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";

const route = useRoute();
const router = useRouter();
const homeAdvertiseFrom = ref(null);
const defaultTypeOptions = [
  {
    label: 'PC首页轮播',
    value: 0
  },
  {
    label: 'APP首页轮播',
    value: 1
  }
];
const defaultHomeAdvertise = {
  name: '',
  type: 1,
  pic: '',
  startTime: null,
  endTime: null,
  status: 0,
  url: null,
  note: null,
  sort: 0
};

const props = defineProps<{
  isEdit: Boolean
}>();

const homeAdvertise = ref(Object.assign({}, defaultHomeAdvertise));

const rules = ref({
  name: [
    {required: true, message: '请输入广告名称', trigger: 'blur'},
    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
  ],
  url: [
    {required: true, message: '请输入广告链接', trigger: 'blur'}
  ],
  startTime: [
    {required: true, message: '请选择开始时间', trigger: 'blur'}
  ],
  endTime: [
    {required: true, message: '请选择到期时间', trigger: 'blur'}
  ],
  pic: [
    {required: true, message: '请选择广告图片', trigger: 'blur'}
  ]
});

const typeOptions = ref(Object.assign({}, defaultTypeOptions));

const onSubmit = () => {
  homeAdvertiseFrom.value.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('是否提交数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        if (props.isEdit) {
          useUpdateHomeAdvertise(route.query.id as string, homeAdvertise.value).then(() => {
            ElMessage({
              type: 'success',
              message: '修改成功!',
              duration: 1000
            });
          });
          router.back();
        } else {
          useCreateHomeAdvertise(homeAdvertise.value).then(() => {
            homeAdvertiseFrom.value.resetFields();
            homeAdvertise.value = Object.assign({}, defaultHomeAdvertise);
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
  homeAdvertiseFrom.value.resetFields();
  homeAdvertise.value = Object.assign({}, defaultHomeAdvertise);
}


onMounted(() => {
  if (props.isEdit) {
    useGetHomeAdvertise(route.query.id as string).then(response => {
      homeAdvertise.value = response.data;
    });
  }
});
</script>

<style scoped>
.input-width {
  width: 70%;
}
</style>