<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="adsInfoForm" label-width="120px" class="form-inner-container"
             size="small">
      <el-form-item label="广告投放：" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="点击链接：" prop="clickUrl">
        <el-input v-model="value.clickUrl"></el-input>
      </el-form-item>
      <el-form-item label="目标窗口：" prop="targetWindow">
        <el-select v-model="value.targetWindow"
                   placeholder="请选择目标窗口">
          <el-option
              v-for="item in targetWindowOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件来源：" prop="fileSourceType">
        <el-input v-model="value.fileSourceType"></el-input>
      </el-form-item>
      <el-form-item label="尺寸类型：" prop="productCategoryId">
        <el-cascader
            v-model="value.sizeTypeName"
            :options="adsSizeTypeOptions"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="广告备注：">
        <el-input
            class="input-width"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="value.remark">
        </el-input>
      </el-form-item>
      <el-form-item label="启用：">
        <el-radio-group v-model="value.enabled">
          <el-radio :label="'1'">是</el-radio>
          <el-radio :label="'0'">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="small" @click="handleNext()">下一步，填写广告内容
        </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useFetchSizeTypeList} from "@/api/ads_api.ts";
import {ElMessage} from "element-plus";
import {AdsAdParam} from "@/model/ads_ad.ts";

defineProps<{
  isEdit: boolean,
  value: AdsAdParam,
}>();
const adsInfoForm = ref(null);
const rules = ref({
  name: [
    {required: true, message: '请输入广告名称', trigger: 'blur'},
    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
  ],
});
const targetWindowOptions = ref([
  {value: '_blank', label: '_blank'},
]);
// 广告尺寸类型
const adsSizeTypeOptions = ref([]);
// 定义父组件的事件
const emit = defineEmits(['nextStep']);

onMounted(() => {
  useFetchSizeTypeList("", 1024, 1).then(res => {
    let list = res.data.list;
    for (let i = 0; i < list.length; i++) {
      adsSizeTypeOptions.value.push({label: list[i].name, value: list[i].id});
    }
  })
});

const handleNext = () => {
  // 访问 adsInfoForm 并调用 validate 方法
  adsInfoForm.value.validate((valid) => {
    if (valid) {
      // 调用父组件的 nextStep 事件
      emit('nextStep');
    } else {
      ElMessage({
        message: '验证失败',
        type: 'error',
        duration: 1000,
      });
      return false;
    }
  });
}
</script>