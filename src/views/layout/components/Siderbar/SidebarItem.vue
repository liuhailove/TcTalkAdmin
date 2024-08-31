<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" :key="item.name">
      <!-- 先检查 item 是否需要隐藏 -->
      <template v-if="!item.hidden && item.children">
        <!-- 只有一个子项时，直接渲染子项 -->
        <router-link
            v-if="hasOneShowingChildren(item.children) && !item.children[0].children && !item.alwaysShow"
            :to="item.path + '/' + item.children[0].path"
            :key="item.path + '/' + item.children[0].name"
        >
          <el-menu-item
              :index="item.path + '/' + item.children[0].path"
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

        <!-- 处理多个子项时，渲染 el-sub-menu -->
        <el-sub-menu :index="item.name || item.path" :key="item.name">
          <template #title>
            <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon" />
            <span v-if="item.meta && item.meta.title">
              {{ item.meta.title }}
            </span>
          </template>

          <!-- 遍历子项 -->
          <template v-for="child in item.children" :key="item.path + '/' + child.name">
            <template v-if="!child.hidden">
              <sidebar-item
                  v-if="child.children && child.children.length > 0"
                  :routes="[child]"
                  :is-nest="true"
                  class="nest-menu"
              />
              <!-- 支持外链功能 -->
              <a v-else-if="child.path.startsWith('http')" :href="child.path" target="_blank">
                <el-menu-item :index="item.path + '/' + child.path">
                  <svg-icon v-if="child.meta && child.meta.icon" :icon-class="child.meta.icon" />
                  <span v-if="child.meta && child.meta.title">
                    {{ child.meta.title }}
                  </span>
                </el-menu-item>
              </a>
              <!-- 渲染子路由 -->
              <router-link v-else :to="item.path + '/' + child.path">
                <el-menu-item :index="item.path + '/' + child.path">
                  <svg-icon v-if="child.meta && child.meta.icon" :icon-class="child.meta.icon" />
                  <span v-if="child.meta && child.meta.title">
                    {{ child.meta.title }}
                  </span>
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

const hasOneShowingChildren = (children: Array<any>) => {
  return children.filter((item) => !item.hidden).length === 1;
};
</script>
