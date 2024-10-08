<template>
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写广告信息"></el-step>
      <el-step title="填写广告尺寸类型"></el-step>
      <el-step title="填写广告模版"></el-step>
      <el-step title="投放"></el-step>
    </el-steps>
    <ads-info-detail
        v-show="showStatus[0]"
        v-model="productParam"
        :is-edit="isEdit"
        @nextStep="nextStep"
    />
  </el-card>
</template>
<script setup lang="ts">
import {ref} from "vue";
import AdsInfoDetail from "@/views/advertise/ad/components/AdsInfoDetail.vue";

const active = ref(0);
defineProps<{
  isEdit: boolean
}>();

const showStatus = ref([true, false, false, false])
const defaultAdsParam = {};
const productParam = ref(Object.assign({}, defaultAdsParam));

const nextStep = () => {
  if (active.value < showStatus.value.length - 1) {
    active.value++;
    hideAll();
    showStatus.value[active.value] = true;
  }
}

const prevStep = () => {
  if (active.value > 0 && active.value < showStatus.value.length) {
    active.value--;
    hideAll();
    showStatus.value[active.value] = true;
  }
}


const hideAll = () => {
  for (let i = 0; i < showStatus.value.length; i++) {
    showStatus.value[i] = false;
  }
}
</script>
<style>
.form-container {
  width: 960px;
}

.form-inner-container {
  width: 800px;
}
</style>
