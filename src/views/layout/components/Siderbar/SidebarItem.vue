<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" :key="item.name">
      <!-- 检查 item 是否需要隐藏 -->
      <template v-if="!item.hidden && item.children">
        <!-- 只有一个子项且没有嵌套子项时直接渲染该子项 -->
        <template v-if="hasOneShowingChild(item) && !item.alwaysShow">
          <router-link
              :to="resolvePath(item, item.children[0])"
              :key="resolvePath(item, item.children[0])"
          >
            <el-menu-item
                :index="resolvePath(item, item.children[0])"
                :class="{'submenu-title-noDropdown': !isNest}"
            >
              <svg-icon
                  v-if="item.children[0].meta && item.children[0].meta.icon"
                  :icon-class="item.children[0].meta.icon"
              />
              <span v-if="item.children[0].meta && item.children[0].meta.title">
                {{ item.children[0].meta.title }}
              </span>
            </el-menu-item>
          </router-link>
        </template>

        <!-- 处理多个子项或 item.alwaysShow 为 true 时，渲染 el-sub-menu -->
        <el-sub-menu v-else :index="item.name || item.path" :key="item.name">
          <template #title>
            <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon" />
            <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
          </template>

          <!-- 遍历子项 -->
          <template v-for="child in item.children" :key="resolvePath(item, child)">
            <template v-if="!child.hidden">
              <sidebar-item
                  v-if="child.children && child.children.length > 0"
                  :routes="[child]"
                  :is-nest="true"
                  class="nest-menu"
              />
              <!-- 支持外链功能 -->
              <a v-else-if="child.path.startsWith('http')" :href="child.path" target="_blank">
                <el-menu-item :index="resolvePath(item, child)">
                  <svg-icon v-if="child.meta && child.meta.icon" :icon-class="child.meta.icon" />
                  <span v-if="child.meta && child.meta.title">
                    {{ child.meta.title }}
                  </span>
                </el-menu-item>
              </a>
              <!-- 渲染子路由 -->
              <router-link v-else :to="resolvePath(item, child)">
                <el-menu-item :index="resolvePath(item, child)">
                  <svg-icon v-if="child.meta && child.meta.icon" :icon-class="child.meta.icon" />
                  <span v-if="child.meta && child.meta.title">{{ child.meta.title }}</span>
                </el-menu-item>
              </router-link>
            </template>
          </template>
        </el-sub-menu>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/Index.vue";

defineProps<{
  routes: Array<any>;
  isNest: boolean;
}>();

// 判断是否只有一个可见的子项
const hasOneShowingChild = (item: any) => {
  const showingChildren = item.children.filter((child: any) => !child.hidden);
  return showingChildren.length === 1;
};

// 生成正确的路由路径
const resolvePath = (parent: any, child: any) => {
  if (!parent.path.endsWith("/") && !child.path.startsWith("/")) {
    return `${parent.path}/${child.path}`;
  }
  return `${parent.path}${child.path}`;
};
</script>
