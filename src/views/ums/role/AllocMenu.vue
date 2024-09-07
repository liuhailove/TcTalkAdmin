<template>
  <el-card class="form-container" shadow="never">
    <el-tree
        :data="menuTreeList"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
    </el-tree>
    <div style="margin-top: 20px" align="center">
      <el-button type="primary" @click="handleSave()">保存</el-button>
      <el-button @click="handleClear()">清空</el-button>
    </div>

  </el-card>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useFetchTreeList} from "@/api/menu.ts";
import { useAllocMenu, useListMenuByRole} from "@/api/role.ts";
import {ElMessage, ElMessageBox} from "element-plus";

const route = useRoute();
const router = useRouter();
const menuTreeList = ref([]);
const defaultProps = ref({
  children: 'children',
  label: 'title'
});
const roleId = ref();
const tree = ref(null);

const treeList = () => {
  useFetchTreeList().then(response => {
    menuTreeList.value = response.data;
  });
}

const getRoleMenu = (roleId: string) => {
  useListMenuByRole(roleId).then(response => {
    let menuList = response.data;
    let checkedMenuIds = [];
    if (menuList != null && menuList.length > 0) {
      for (let i = 0; i < menuList.length; i++) {
        let menu = menuList[i];
        if (menu.parentId !== '0') {
          checkedMenuIds.push(menu.id);
        }
      }
    }
    tree.value.setCheckedKeys(checkedMenuIds);
  });
}

const handleSave = () => {
  const checkedNodes = tree.value.getCheckedNodes();
  const checkedMenuIds = new Set<string>();

  if (checkedNodes && checkedNodes.length > 0) {
    checkedNodes.forEach((checkedNode) => {
      checkedMenuIds.add(checkedNode.id);
      if (checkedNode.parentId !== 0) {
        checkedMenuIds.add(checkedNode.parentId);
      }
    });
  }

  ElMessageBox.confirm('是否分配菜单？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    useAllocMenu(roleId.value, Array.from(checkedMenuIds)).then(() => {
      ElMessage({
        message: '分配成功',
        type: 'success',
        duration: 1000,
      });
      router.back();
    });
  });
};

const handleClear = () => {
  tree.value.setCheckedKeys([]);
};

onMounted(() => {
  roleId.value = route.query.roleId;
  treeList();
  getRoleMenu(roleId.value);
});

</script>