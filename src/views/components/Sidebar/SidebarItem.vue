<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden && item.children">

    </template>
  </div>


</template>


<script setup lang="ts">
const props = withDefaults(defineProps<{
  routes: Array<any>,
  isNest: boolean,
}>(), {
  isNest: false,
});

const hasOneShowingChildren = (children) => {
  const showingChildren = children.filter(item => {
    return !item.hidden;
  })
  return showingChildren.length > 0;
}
</script>