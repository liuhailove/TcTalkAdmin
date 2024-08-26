<template>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>TcTalk</title>
  </head>
  <div id="app">
    <RouterView/>
  </div>
</template>

<script setup lang="ts">
window.onload = function () {
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, {passive: false});
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
  });
};
</script>