<template>
  <div style="margin-top: 50px">
    <el-form :rules="rules" ref="adsSizeTypeForm" label-width="120px" class="form-inner-container" size="small">
      <el-form-item label="尺寸类型：" prop="sizeTypeName">
        <el-input v-model="adsInfo.name"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="small" @click="handleNext('adsSizeTypeForm')">下一步，选择广告尺寸类型</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>


<script setup lang="ts">
import {ref} from "vue";

const active = ref(0);
defineProps<{
  isEdit: boolean
}>();

const rules = ref({
  name: [
    {required: true, message: '请输入槽位名称', trigger: 'blur'},
    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
  ],
});
const defaultAdsInfo = {
  name: '',
  clickUrl: '',
  targetWindow: '_blank',
  remark: '',
  fileSourceType: '',
  enabled: 'false',
};

const adsInfo = ref(Object.assign({}, defaultAdsInfo));

const targetWindowOptions = ref([
  {value: '_blank', label: '_blank'},
]);
</script>