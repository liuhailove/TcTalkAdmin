<template>
  <div class="app-wrapper" :class="classObj">
    <Sidebar class="sidebar-container"></Sidebar>
    <div class="main-container">
      <Navbar/>
      <AppMain/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, toRefs} from 'vue';
import Navbar from "@/views/layout/components/Navbar.vue";
import Sidebar from "@/views/layout/components/Siderbar/Index.vue";
import AppMain from "@/views/layout/components/AppMain.vue";
import {useAppStore} from "@/store/app_store.ts";

const {sidebar, device} = toRefs(useAppStore());
const classObj = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
  mobile: device.value === 'mobile',
}));

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
