<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="menu"
             :rules="rules"
             ref="menuFromRef"
             label-width="150px">
      <el-form-item label="菜单名称：" prop="title">
        <el-input v-model="menu.title"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单：">
        <el-select v-model="menu.parentId"
                   placeholder="请选择菜单">
          <el-option
              v-for="item in selectMenuList"
              :key="item.id"
              :label="item.title"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="前端名称：" prop="name">
        <el-input v-model="menu.name"></el-input>
      </el-form-item>
      <el-form-item label="前端图标：" prop="icon">
        <el-input v-model="menu.icon" style="width: 80%"></el-input>
        <svg-icon style="margin-left: 8px" :icon-class="menu.icon"></svg-icon>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="menu.hidden">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="menu.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/Index.vue";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useCreateMenu, useFetchList, useGetMenu, useUpdateMenu} from "@/api/menu.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import {UmsMenu} from "@/model/ums_menu.ts";

const route = useRoute();
const router = useRouter();

const defaultMenu = {
  title: '',
  parentId: '0',
  name: '',
  icon: '',
  hidden: 0,
  sort: 0,
};

const props = defineProps<{
  isEdit: boolean
}>();

const menu = ref(Object.assign({}, defaultMenu));

const selectMenuList = ref([]);

const menuFromRef = ref(null);

const rules = ref({
  title: [
    {required: true, message: '请输入菜单名称', trigger: 'blur'},
    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
  ],
  name: [
    {required: true, message: '请输入前端名称', trigger: 'blur'},
    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
  ],
  icon: [
    {required: true, message: '请输入前端图标', trigger: 'blur'},
    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
  ]
});

onMounted(() => {
  if (props.isEdit) {
    useGetMenu(route.query.id as string).then(res => {
      menu.value = res.data;
    })
  } else {
    menu.value = Object.assign({}, defaultMenu);
  }
  getSelectMenuList();
});

const getSelectMenuList = () => {
  useFetchList("0", {pageSize: 100, pageNum: 1}).then((res) => {
    selectMenuList.value = res.data.list;
    selectMenuList.value.unshift({id: '0', title: '无上级菜单'});
  });
}

const onSubmit = () => {
  menuFromRef.value.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('是否提交数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        if (props.isEdit) {
          useUpdateMenu(route.query.id as string, menu.value as UmsMenu).then(() => {
            ElMessage({
              type: 'success',
              message: '修改成功!',
              duration: 1000
            });
          });
          router.back();
        } else {
          useCreateMenu(menu.value as UmsMenu).then(() => {
            menuFromRef.value.resetFields();
            menu.value = Object.assign({}, defaultMenu);
            getSelectMenuList();
            ElMessage({
              type: 'success',
              message: '修改成功!',
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
  menuFromRef.value.resetFields();
  menu.value = Object.assign({}, defaultMenu);
}
</script>