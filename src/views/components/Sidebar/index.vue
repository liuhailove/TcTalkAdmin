<template>

</template>



<script setup lang="ts">
defineProps<{
  picUrl: string
  playCount?: number
  name?: string
  showPlayCount?: boolean
  showCommentCount?: boolean
  onPlay?: () => void,
  video?: boolean,
  live?: boolean,
}>();
</script>