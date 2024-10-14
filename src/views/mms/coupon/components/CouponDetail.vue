<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="channelHomeAdvertise"
             :rules="rules"
             ref="channelHomeAdvertiseForm"
             label-width="150px"
             size="small">
      <el-form-item label="广告名称：" prop="name">
        <el-input v-model="channelHomeAdvertise.name" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="广告位置：">
        <el-select v-model="channelHomeAdvertise.type">
          <el-option
              v-for="type in typeOptions"
              :key="type.value"
              :label="type.label"
              :value="type.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投放频道：">
        <el-select v-model="channelType" @change="handleChannelChange">
          <el-option
              v-for="type in channelOptions"
              :key="type.value"
              :label="type.label"
              :value="type">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间：" prop="startTime">
        <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="channelHomeAdvertise.startTime"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="到期时间：" prop="endTime">
        <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="channelHomeAdvertise.endTime"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="最大展示次数：">
        <el-input v-model="channelHomeAdvertise.showMax" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="日最大展示次数：">
        <el-input v-model="channelHomeAdvertise.dayTimes" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="上线/下线：">
        <el-radio-group v-model="channelHomeAdvertise.status">
          <el-radio :label="0">下线</el-radio>
          <el-radio :label="1">上线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告图片：">
        <single-upload v-model:value="channelHomeAdvertise.pic"></single-upload>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="channelHomeAdvertise.sort" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="广告链接：" prop="url">
        <el-input v-model="channelHomeAdvertise.clickUrl" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="广告备注：">
        <el-input
            class="input-width"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="channelHomeAdvertise.note">
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
import SingleUpload from "@/components/Upload/SingleUpload.vue";
import {useFetchChannelAll} from "@/api/category_api.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import {
  useCreateChannelHomeAdvertise,
  useGetChannelHomeAdvertise, useGetCoupon,
  useUpdateChannelHomeAdvertise
} from "@/api/marketing_api.ts";

const route = useRoute();
const router = useRouter();
const props = defineProps<{
  isEdit: Boolean
}>();
const couponForm = ref(null);
const defaultCoupon = {
  type: 0,
  name: null,
  platform: 0,
  amount: null,
  perLimit: 1,
  minPoint: null,
  startTime: null,
  endTime: null,
  useType: 0,
  note: null,
  publishCount: null,
  productRelationList: [],
  productCategoryRelationList: []
};
const defaultTypeOptions = [
  {
    label: '全场赠券',
    value: 0
  },
  {
    label: '会员赠券',
    value: 1
  },
  {
    label: '购物赠券',
    value: 2
  },
  {
    label: '注册赠券',
    value: 3
  }
];
const defaultPlatformOptions = [
  {
    label: '全平台',
    value: 0
  },
  {
    label: '移动平台',
    value: 1
  },
  {
    label: 'PC平台',
    value: 2
  }
];
const coupon = ref(Object.assign({}, defaultCoupon));
const typeOptions = ref(Object.assign({}, defaultTypeOptions));
const platformOptions = ref(Object.assign({}, defaultPlatformOptions));
const rules = ref({
  name: [
    {required: true, message: '请输入优惠券名称', trigger: 'blur'},
    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
  ],
  publishCount: [
    {type: 'number', required: true, message: '只能输入正整数', trigger: 'blur'}
  ],
  amount: [
    {type: 'number', required: true, message: '面值只能是数值，0.01-10000，限2位小数', trigger: 'blur'}
  ],
  minPoint: [
    {type: 'number', required: true, message: '只能输入正整数', trigger: 'blur'}
  ]
});
const selectProduct = ref(null);
const selectProductLoading = ref(false);
const selectProductOptions = ref([]);
const selectProductCate = ref(null);
const productCateOptions = ref([]);

const getProductCateList = () => {
  listLoading.value = true;
  useFetchChannelAll().then(response => {
    listLoading.value = false;
    channelOptions.value = [];
    let channelList = response.data;
    for (let i = 0; i < channelList.length; i++) {
      channelOptions.value.push({label: channelList[i].name, value: channelList[i].id});
    }
  });
}

onMounted(() => {
  if (props.isEdit) {
    useGetCoupon(route.query.id as string).then(res => {
      coupon.value = res.data;
    })
  }
})

const onSubmit = () => {
  channelHomeAdvertiseForm.value.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('是否提交数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        if (props.isEdit) {
          useUpdateChannelHomeAdvertise(route.query.id as string, channelHomeAdvertise.value).then(() => {
            ElMessage({
              type: 'success',
              message: '修改成功!',
              duration: 1000
            });
          });
          router.back();
        } else {
          useCreateChannelHomeAdvertise(channelHomeAdvertise.value).then(() => {
            channelHomeAdvertiseForm.value.resetFields();
            channelHomeAdvertise.value = Object.assign({}, defaultChannelHomeAdvertise);
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
  channelHomeAdvertiseForm.value.resetFields();
  channelHomeAdvertise.value = Object.assign({}, defaultChannelHomeAdvertise);
}

const handleChannelChange = (selectedChannelType) => {
  channelType.value = {
    value: selectedChannelType.value,
    label: selectedChannelType.label,
  };
  channelHomeAdvertise.value.channelId = selectedChannelType.value;
  channelHomeAdvertise.value.channelName = selectedChannelType.label;
}

</script>