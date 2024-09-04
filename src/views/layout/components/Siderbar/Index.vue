<template>
  <scroll-bar class="sidebar-container">
    <el-menu
        mode="vertical"
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse()"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF">
      <sidebar-item :routes="routers" is-nest></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script setup lang="ts">
import ScrollBar from '@/components/ScrollBar/Index.vue'
import {toRefs} from "vue";
import {usePermissionStore} from "@/store/permission_store.ts";
import {useAppStore} from "@/store/app_store.ts";
import SidebarItem from "@/views/layout/components/Siderbar/SidebarItem.vue";

const {routers} = toRefs(usePermissionStore());
const {isCollapse} = useAppStore();


</script>
