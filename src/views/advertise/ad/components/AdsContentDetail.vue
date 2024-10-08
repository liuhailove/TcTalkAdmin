<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="adsContentForm" label-width="120px" class="form-inner-container"
             size="small">
      <el-form-item label="广告模版：" prop="productCategoryId">
        <el-cascader
            v-model="value.templateId"
            :options="templateOptions"
            @change="handleTemplateChange"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="模版code：">
        <el-input
            class="input-width"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            readonly
            v-model="code">
        </el-input>
      </el-form-item>
      <el-form-item label="广告内容：">
        <el-input
            class="input-width"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="value.content">
        </el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="small" @click="handlePrev">上一步，填写广告信息</el-button>
        <el-button type="primary" size="small" @click="handleNext()">下一步，填写广告投放信息
        </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>


<script setup lang="ts">
import {AdsAdParam} from "@/model/ads_ad.ts";
import {onMounted, ref} from "vue";
import {useFetchTemplateList} from "@/api/ads_api.ts";
import {ElMessage} from "element-plus";

const props = defineProps<{
  isEdit: boolean,
  value: AdsAdParam,
}>();
// 定义父组件的事件
const emit = defineEmits(['nextStep', 'prevStep']);
const adsContentForm = ref(null);
// 广告模版类型
const templateOptions = ref([]);
// 广告编码
const code = ref("");
onMounted(() => {
  useFetchTemplateList("", 1024, 1).then(res => {
    let list = res.data.list;
    for (let i = 0; i < list.length; i++) {
      templateOptions.value.push({
        label: list[i].name,
        value: list[i].id,
        code: list[i].code,
        placeholders: list[i].placeholders
      });
    }
  })
});

const handleTemplateChange = (val: string) => {
  let templateContent = ""
  for (let i = 0; i < templateOptions.value.length; i++) {
    if (String(templateOptions.value[i].value) === String(val)) {
      templateContent = templateOptions.value[i].placeholders;
      code.value = templateOptions.value[i].code;
      break;
    }
  }
  props.value.content = templateContent;
}


const handleNext = () => {
  // 访问 adsContentForm 并调用 validate 方法
  adsContentForm.value.validate((valid) => {
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

const handlePrev = () => {
  emit('prevStep');
}
</script>