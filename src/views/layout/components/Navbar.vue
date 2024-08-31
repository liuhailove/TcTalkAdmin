<template>
  <el-menu class="navbar" mode="horizontal">
<!--    <hamburger class="hamburger-container" :toggle-click="toggleSidebar" :is-active="sidebar.opened"></hamburger>-->
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display: block">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>


<script setup lang="ts">
import Hamburger from "@/components/Hamburger/Index.vue";
import Breadcrumb from "@/components/Breadcrumb/Index.vue";
import {useAppStore} from "@/store/app_store.ts";
import {toRefs} from "vue";
import {useUserStore} from "@/store/user_store.ts";
//  toggle状态设置
const {toggleSideBar} = useAppStore();
const {sidebar} = toRefs(useAppStore());
const {logOut} = useUserStore();
const {avatar} = toRefs(useUserStore());

const toggleSidebar = () => {
  toggleSideBar();
}

const logout = () => {
  logOut().then(() => {
    // 为了重新实例化vue-router对象 避免bug
    location.reload();
  });
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }

  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;

    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>