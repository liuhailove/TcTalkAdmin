<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
          v-for="(item, index) in filteredLevelList"
          :key="item.path">
        <span
            v-if="item.redirect === 'noredirect' || index === levelList.length - 1"
            class="no-redirect">
          {{ item.meta.title }}
        </span>
        <router-link v-else :to="item.redirect || item.path">
          {{ item.meta.title }}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {RouteLocationMatched, useRoute} from 'vue-router';

const route = useRoute();
// 获取面包屑路径
const getBreadcrumb = (): Array<RouteLocationMatched> => {
  // 复制 matched 路由
  let matched = [...route.matched];

  // 如果第一个路由不是 home，则手动添加 home 路由
  if (matched.length && matched[0].name !== 'home') {
    matched.unshift({path: '/home', meta: {title: '首页'}} as unknown as RouteLocationMatched);
  }

  return matched;
};
// 原来的 computed，用来获取面包屑数据
const levelList = computed(() => getBreadcrumb());

// 新增计算属性，过滤掉没有 title 的项
const filteredLevelList = computed(() => {
  return levelList.value.filter((item) => item.meta && item.meta.title);
});

</script>

<style scoped lang="scss">
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
