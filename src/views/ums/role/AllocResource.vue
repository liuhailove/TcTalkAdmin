<template>
  <el-card class="form-container" shadow="never">
    <div v-for="(cate,index) in allResourceCate" :class="index===0?'top-line':null" :key="'cate'+cate.id">
      <el-row class="table-layout" style="background: #F2F6FC;">
        <el-checkbox v-model="cate.checked"
                     :indeterminate="isIndeterminate(cate.id)"
                     @change="handleCheckAllChange(cate)">
          {{ cate.name }}
        </el-checkbox>
      </el-row>
      <el-row class="table-layout">
        <el-col :span="8" v-for="resource in getResourceByCate(cate.id)" :key="resource.id" style="padding: 4px 0">
          <el-checkbox v-model="resource.checked" @change="handleCheckChange(resource)">
            {{ resource.name }}
          </el-checkbox>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 20px" align="center">
      <el-button type="primary" @click="handleSave()">保存</el-button>
      <el-button @click="handleClear()">清空</el-button>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useListAllCate} from "@/api/resouce_category.ts";
import {useAllocResource, useListResourceByRole} from "@/api/role.ts";
import {UmsResource} from "@/model/ums_resource.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import {useFetchAllResourceList} from "@/api/resource.ts";

const roleId = ref(null);
const allResource = ref(null);
const allResourceCate = ref(null);
const route = useRoute();
const router = useRouter();

onMounted(() => {
  roleId.value = route.query.roleId;
  getAllResourceCateList();
});

const getAllResourceCateList = () => {
  useListAllCate().then(response => {
    allResourceCate.value = response.data;
    for (let i = 0; i < allResourceCate.value.length; i++) {
      allResourceCate.value[i].checked = true;
    }
    getAllResourceList();
  });
}

const getAllResourceList = () => {
  useFetchAllResourceList().then(response => {
    allResource.value = response.data;
    for (let i = 0; i < allResource.value.length; i++) {
      allResource.value[i].checked = true;
    }
    getResourceByRole(roleId.value);
  })
}

const getResourceByCate = (categoryId: string) => {
  let cateResource = [];
  if (allResource.value == null) {
    return null;
  }
  for (let i = 0; i < allResource.value.length; i++) {
    let resource = allResource.value[i];
    if (resource.categoryId === categoryId) {
      cateResource.push(resource);
    }
  }
  return cateResource;
}

const getResourceByRole = (roleId: string) => {
  useListResourceByRole(roleId).then(response => {
    let allocResource = response.data;
    allResource.value.forEach((item) => {
      item.checked = getResourceChecked(item.id, allocResource);
    });
    allResourceCate.value.forEach((item) => {
      item.checked = isAllChecked(item.id);
    });
  });
}

const getResourceChecked = (resourceId: string, allocResource: Array<UmsResource>) => {
  if (allocResource === undefined || allocResource.length === 0) {
    return false;
  }
  for (let i = 0; i < allocResource.length; i++) {
    if (allocResource[i].id === resourceId) {
      return true;
    }
  }
  return false;
}

const isIndeterminate = (categoryId: string) => {
  let cateResources = getResourceByCate(categoryId);
  if (cateResources == null) {
    return false;
  }
  let checkedCount = 0;
  for (let i = 0; i < cateResources.length; i++) {
    if (cateResources[i].checked) {
      checkedCount++;
    }
  }
  return !(checkedCount === 0 || checkedCount === cateResources.length);
}

const isAllChecked = (categoryId: string) => {
  let cateResources = getResourceByCate(categoryId);
  if (cateResources == null) {
    return false;
  }
  let checkedCount = 0;
  for (let i = 0; i < cateResources.length; i++) {
    if (cateResources[i].checked) {
      checkedCount++;
    }
  }
  if (checkedCount === 0) {
    return false;
  }
  return checkedCount === cateResources.length;
}

const handleSave = () => {
  ElMessageBox.confirm('是否分配资源？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    let checkedResourceIds = new Set<string>();
    if (allResource.value !== null && allResource.value.length > 0) {
      allResource.value.forEach((item) => {
        if (item.checked) {
          checkedResourceIds.add(item.id);
        }
      });
    }
    useAllocResource(roleId.value, Array.from(checkedResourceIds)).then(() => {
      ElMessage({
        message: '分配成功',
        type: 'success',
        duration: 1000,
      });
      router.back();
    });
  });
}

const handleClear = () => {
  allResourceCate.value.forEach((item) => {
    item.checked = false;
  });
  allResource.value.forEach((item) => {
    item.checked = false;
  })
}

const handleCheckAllChange = (resource) => {
  allResourceCate.value.forEach((item) => {
    if (item.id === resource.categoryId) {
      item.checked = isAllChecked(resource.categoryId);
    }
  })
}

const handleCheckChange = (resource) => {
  allResourceCate.value.forEach((item) => {
    if (item.id === resource.categoryId) {
      item.checked = isAllChecked(resource.categoryId);
    }
  })
}


</script>

<style scoped>
.table-layout {
  padding: 20px;
  border-left: 1px solid #DCDFE6;
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
}

.top-line {
  border-top: 1px solid #DCDFE6;
}
</style>