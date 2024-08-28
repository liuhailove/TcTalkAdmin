<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      return props.className ? `svg-icon ${props.className}` : 'svg-icon';
    });

    return {
      iconName,
      svgClass,
    };
  },
});
</script>

<style scoped>
.svg-icon {
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.18em;
  fill: currentColor;
  overflow: hidden;
}
</style>
