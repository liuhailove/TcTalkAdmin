<template>
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写广告信息"></el-step>
      <el-step title="填写广告内容"></el-step>
      <el-step title="填写广告投放"></el-step>
    </el-steps>
    <ads-info-detail
        v-show="showStatus[0]"
        v-model="adsParam"
        :is-edit="isEdit"
        :value="adsParam"
        @nextStep="nextStep"
    />
    <ads-content-detail
        v-show="showStatus[1]"
        v-model="adsParam"
        :is-edit="isEdit"
        :value="adsParam"
        @nextStep="nextStep"
        @prevStep="prevStep"
    />
    <ads-put-detail
        v-show="showStatus[2]"
        v-model="adsParam"
        :is-edit="isEdit"
        :value="adsParam"
        @prevStep="prevStep"
        @finishCommit="finishCommit"
    />
  </el-card>
</template>
<script setup lang="ts">
import {ref} from "vue";
import AdsInfoDetail from "@/views/advertise/ad/components/AdsInfoDetail.vue";
import AdsContentDetail from "@/views/advertise/ad/components/AdsContentDetail.vue";
import AdsPutDetail from "@/views/advertise/ad/components/AdsPutDetail.vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {useAllocMenu} from "@/api/role.ts";

const active = ref(0);
defineProps<{
  isEdit: boolean
}>();

const showStatus = ref([true, false, false])
const defaultAdsParam = {
  name: '',
  advertiserId: '',
  advertiser: '',
  clickUrl: '',
  targetWindow: '_blank',
  sizeType: 0,
  sizeTypeName: '',
  remark: '',
  fileSourceType: 0,
  templateId: '',
  content: '',
  contentExt: '',
  version: 0,
  style: '',
  enabled: 1,
  remark: '',
};

const adsParam = ref(Object.assign({}, defaultAdsParam));

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


const finishCommit = (isEdit) => {
  ElMessageBox.confirm('是否提交该广告？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    if (isEdit) {

    } else {

    }
  });
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
