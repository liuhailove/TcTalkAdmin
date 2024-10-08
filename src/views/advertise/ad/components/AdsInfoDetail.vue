<template>
  <div style="margin-top: 50px">
    <el-form :rules="rules" ref="adsInfoForm" label-width="120px" class="form-inner-container" size="small">
      <!--      <el-form-item label="商品分类：" prop="productCategoryId">-->
      <!--        <el-cascader>-->
      <!--        </el-cascader>-->
      <!--      </el-form-item>-->
      <el-form-item label="广告名称：" prop="name">
        <el-input v-model="adsInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="点击链接：" prop="subTitle">
        <el-input v-model="adsInfo.clickUrl"></el-input>
      </el-form-item>
      <el-form-item label="目标窗口：" prop="targetWindow">
        <el-select v-model="adsInfo.targetWindow"
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
        <el-input v-model="adsInfo.fileSourceType"></el-input>
      </el-form-item>
      <el-form-item label="广告备注：">
        <el-input
            class="input-width"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="adsInfo.remark">
        </el-input>
      </el-form-item>
      <el-form-item label="启用：">
        <el-radio-group v-model="adsInfo.enabled">
          <el-radio :label="'1'">是</el-radio>
          <el-radio :label="'0'">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="small" @click="handleNext('adsSizeTypeForm')">下一步，选择广告尺寸类型
        </el-button>
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