<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="category"
             :rules="rules"
             ref="categoryForm"
             label-width="150px"
             size="small">
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="category.name" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="上级分类：">
        <el-select v-model="category.parentCategoryId">
          <el-option
              v-for="item in selectCategoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属频道：">
        <el-select v-model="category.channelId">
          <el-option
              v-for="type in channelOptions"
              :key="type.value"
              :label="type.label"
              :value="type.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="category.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="category.showStatus">
          <el-radio :value="1">是</el-radio>
          <el-radio :value="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示在导航栏：">
        <el-radio-group v-model="category.navStatus">
          <el-radio :value="1">是</el-radio>
          <el-radio :value="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分类图标：">
        <single-upload v-model:value="category.icon"></single-upload>
      </el-form-item>
      <el-form-item v-for="(filterTag, index) in filterTagList"
                    :label="filterLabelFilter(index)"
                    :key="filterTag.key"
      >
        <el-cascader
            clearable
            v-model="filterTag.value"
            :options="filterTags">
        </el-cascader>
        <el-button style="margin-left: 20px" @click.prevent="removeFilterTag(filterTag)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="handleAddFilterTag()">新增</el-button>
      </el-form-item>
      <el-form-item label="关键词：">
        <el-input v-model="category.keywords" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="分类描述：">
        <el-input type="textarea" :autosize="true" v-model="category.remark" :rows="5"></el-input>
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
import {
  useCreateCategory,
  useFetchCategoryList, useFetchChannelAll,
  useFetchTagAll,
  useGetCategory, useGetCategoryTagRelation,
  useUpdateCategory
} from "@/api/category_api.ts";
import {ElMessage, ElMessageBox} from "element-plus";

const route = useRoute();
const router = useRouter();
const props = defineProps<{
  isEdit: Boolean
}>();

const defaultCategory = {
  channelId: null,
  name: '',
  parentCategoryId: null,
  navStatus: 0,
  showStatus: 0,
  sort: 0,
  icon: '',
  ageRegionType: 0,
  recommend: false,
  sexPrefer: 0,
  keywords: '',
  remark: '',
  enabled: false,
  feeType: 0,
  tagIdList: null
}

const filterTagList = ref([{key: 0, value: ''}]);

const filterTags = ref([]);

// 品类
const category = ref(Object.assign({}, defaultCategory));

// 品类Form
const categoryForm = ref(null);

const rules = ref({
  name: [
    {required: true, message: '请输入品牌名称', trigger: 'blur'},
    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
  ]
});

// 可供选择的品类列表
const selectCategoryList = ref([]);

const getSelectCategoryList = () => {
  useFetchCategoryList("0", "", 100, 1).then(response => {
    selectCategoryList.value = response.data.list;
    selectCategoryList.value.unshift({id: 0, name: '无上级分类'});
  });
}

const getSelectTagIdList = () => {
  // 获取选中的筛选标签属性，并将其扁平化
  return filterTagList.value.map(tag => Array.isArray(tag.value) ? tag.value[0] : tag.value);
}

onMounted(() => {
  if (props.isEdit) {
    useGetCategory(route.query.id as string).then(res => {
      category.value = res.data;
    });
    useGetCategoryTagRelation(route.query.id as string).then(res => {
      if (res.data != null && res.data.length > 0) {
        filterTagList.value = [];
        for (let i = 0; i < res.data.length; i++) {
          filterTagList.value.push({
            key: Date.now() + i,
            value: res.data[i].tagId,
          });
        }
      }
    });
  }
  getSelectCategoryList();
  getTagList();
  getChannelList();
})

const filterLabelFilter = (index: number) => {
  if (index === 0) {
    return "筛选属性";
  } else {
    return "";
  }
}

const getTagList = () => {
  useFetchTagAll().then(response => {
    let list = response.data;
    for (let i = 0; i < list.length; i++) {
      let tag = list[i];
      filterTags.value.push({label: tag.name, value: tag.id});
    }
  });
}

const handleAddFilterTag = () => {
  if (filterTagList.value.length >= 3) {
    ElMessage({
      type: 'warning',
      message: '最多添加三个!',
      duration: 1000
    });
    return;
  }
  filterTagList.value.push({key: Date.now(), value: null,});
}

const removeFilterTag = (filterTag) => {
  if (filterTagList.value.length <= 1) {
    ElMessage({
      type: 'warning',
      message: '至少要留一个!',
      duration: 1000
    });
    return;
  }
  var index = filterTagList.value.indexOf(filterTag);
  if (index !== -1) {
    filterTagList.value.splice(index, 1);
  }
}
const listLoading = ref(false);
const channelOptions = ref([]);
const getChannelList = () => {
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
const onSubmit = () => {
  categoryForm.value.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('是否提交数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        category.value.tagIdList = getSelectTagIdList();
        if (props.isEdit) {
          useUpdateCategory(route.query.id as string, category.value).then(() => {
            ElMessage({
              type: 'success',
              message: '修改成功!',
              duration: 1000
            });
          });
          router.back();
        } else {
          useCreateCategory(category.value).then(() => {
            categoryForm.value.resetFields();
            category.value = Object.assign({}, defaultCategory);
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
  categoryForm.value.resetFields();
  category.value = Object.assign({}, defaultCategory);
}

</script>